
import React, { useRef, useState, useMemo, useEffect } from 'react';
import { 
  Eye, 
  Search, 
  Upload, 
  RefreshCcw, 
  FileText, 
  Calendar, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  Download, 
  Trash2, 
  Filter,
  Layers,
  CheckSquare,
  Square,
  Loader2,
  FileCheck
} from 'lucide-react';
import { Invoice, BookingRow, CompanyInfo, InvoiceTheme } from '../types.ts';
import { INITIAL_CSV_DATA } from '../constants.tsx';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import InvoiceRenderer from './InvoiceRenderer.tsx';

interface Props {
  invoices: Invoice[];
  onPreview: (invoice: Invoice) => void;
  onImport: (data: BookingRow[]) => void;
  onClearAll: () => void;
  onLoadSample: () => void;
  // We need company info and current theme for batch rendering
  company: CompanyInfo;
  theme: InvoiceTheme;
}

const BookingScreen: React.FC<Props> = ({ invoices, onPreview, onImport, onClearAll, onLoadSample, company, theme }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [usedInvoiceIds, setUsedInvoiceIds] = useState<Set<string>>(new Set());
  const [showStatementTool, setShowStatementTool] = useState(false);
  const [showBatchTool, setShowBatchTool] = useState(false);
  
  // Batch processing state
  const [batchCustomer, setBatchCustomer] = useState('');
  const [isProcessingBatch, setIsProcessingBatch] = useState(false);
  const [batchProgress, setBatchProgress] = useState({ current: 0, total: 0, name: '' });
  
  const [statementForm, setStatementForm] = useState({
    customer: '',
    shipper: '',
    dateFrom: '',
    dateTo: ''
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const batchRenderRef = useRef<HTMLDivElement>(null);

  const filtered = invoices.filter(inv => 
    inv.bookingNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const uniqueCustomers = useMemo(() => Array.from(new Set(invoices.map(inv => inv.customer))), [invoices]);

  const batchInvoices = useMemo(() => {
    if (!batchCustomer) return [];
    return invoices.filter(inv => inv.customer === batchCustomer);
  }, [invoices, batchCustomer]);

  const uniqueShippersForCustomer = useMemo(() => {
    if (!statementForm.customer) return [];
    const shippers = new Set<string>();
    invoices
      .filter(inv => inv.customer === statementForm.customer)
      .forEach(inv => {
        inv.items.forEach(item => {
          if (item.Shipper) shippers.add(item.Shipper);
        });
      });
    return Array.from(shippers).sort();
  }, [invoices, statementForm.customer]);

  const handlePreview = (inv: Invoice) => {
    setUsedInvoiceIds(prev => new Set(prev).add(inv.id));
    onPreview(inv);
  };

  const handleDownloadSample = () => {
    const blob = new Blob([INITIAL_CSV_DATA], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nile-fleet-sample-operations.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // The Big "Auto Download All" Logic
  const processBatchDownload = async () => {
    if (batchInvoices.length === 0) return;
    if (!confirm(`Confirm: Automatic download of ${batchInvoices.length} invoices for ${batchCustomer}?`)) return;

    setIsProcessingBatch(true);
    setBatchProgress({ current: 0, total: batchInvoices.length, name: '' });

    for (let i = 0; i < batchInvoices.length; i++) {
      const inv = batchInvoices[i];
      setBatchProgress(prev => ({ ...prev, current: i + 1, name: inv.serialNumber }));

      try {
        // We use a small timeout to let the hidden renderer update its props
        await new Promise(resolve => setTimeout(resolve, 400));
        
        const element = batchRenderRef.current;
        if (!element) continue;

        const canvas = await html2canvas(element, {
          scale: 2.5,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
          width: 794,
          height: 1123,
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
        pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
        
        const safeCustomer = inv.customer.replace(/[^a-z0-9]/gi, '_');
        pdf.save(`${inv.serialNumber}_${safeCustomer}.pdf`);
        
        // Mark as "used/printed"
        setUsedInvoiceIds(prev => new Set(prev).add(inv.id));

      } catch (err) {
        console.error(`Failed batch item ${inv.serialNumber}`, err);
      }
    }

    setIsProcessingBatch(false);
    alert(`Successfully processed ${batchInvoices.length} invoices.`);
  };

  const generateStatement = () => {
    if (!statementForm.customer) return;

    const allMatchingBookings: BookingRow[] = [];
    invoices
      .filter(inv => inv.customer === statementForm.customer)
      .forEach(inv => {
        inv.items.forEach(item => {
          const itemDate = new Date(item.Date);
          const from = statementForm.dateFrom ? new Date(statementForm.dateFrom) : null;
          const to = statementForm.dateTo ? new Date(statementForm.dateTo) : null;
          
          const dateMatch = (!from || itemDate >= from) && (!to || itemDate <= to);
          const shipperMatch = !statementForm.shipper || item.Shipper === statementForm.shipper;
          
          if (dateMatch && shipperMatch) {
            allMatchingBookings.push(item);
          }
        });
      });

    if (allMatchingBookings.length === 0) {
      alert("No operations found for the selected criteria.");
      return;
    }

    const datePart = `${statementForm.dateFrom || 'Start'} to ${statementForm.dateTo || 'End'}`;
    const shipperPart = statementForm.shipper ? ` | Shipper: ${statementForm.shipper}` : '';
    const statementPeriod = `${datePart}${shipperPart}`;
    
    const statementInvoice: Invoice = {
      id: `statement-${statementForm.customer}-${Date.now()}`,
      bookingNo: statementForm.shipper || "MULTIPLE",
      customer: statementForm.customer,
      date: new Date().toISOString().split('T')[0],
      dueDate: "On Receipt",
      serialNumber: `SOA-${Date.now().toString().slice(-6)}`,
      items: allMatchingBookings,
      total: allMatchingBookings.reduce((sum, item) => sum + item.Rate, 0),
      isStatement: true,
      period: statementPeriod
    };

    onPreview(statementInvoice);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        const lines = text.split('\n');
        const parsed: BookingRow[] = lines.slice(1).filter(l => l.trim()).map(line => {
          const values = line.split(',');
          return {
            Customer: values[0]?.trim() || '',
            BookingNo: values[1]?.trim() || '',
            UnitNumber: values[2]?.trim() || '',
            PortGo: values[3]?.trim() || '',
            PortGi: values[4]?.trim() || '',
            Trucker: values[5]?.trim() || '',
            Shipper: values[6]?.trim() || '',
            Rate: parseFloat(values[7]) || 0,
            Date: values[8]?.trim() || new Date().toISOString().split('T')[0]
          };
        });
        onImport(parsed);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Batch Processing Overlay */}
      {isProcessingBatch && (
        <div className="fixed inset-0 z-[100] bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center space-y-6">
            <div className="relative w-24 h-24 mx-auto">
               <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
               <div 
                 className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"
                 style={{ animationDuration: '0.8s' }}
               ></div>
               <div className="absolute inset-0 flex items-center justify-center font-black text-blue-600">
                 {Math.round((batchProgress.current / batchProgress.total) * 100)}%
               </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Processing Batch</h3>
              <p className="text-slate-500 font-medium">Generating {batchProgress.name}...</p>
              <div className="text-xs font-bold text-slate-400">Step {batchProgress.current} of {batchProgress.total}</div>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
               <div 
                 className="bg-blue-600 h-full transition-all duration-300" 
                 style={{ width: `${(batchProgress.current / batchProgress.total) * 100}%` }}
               />
            </div>
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-[0.2em]">Please keep window active</p>
          </div>
        </div>
      )}

      {/* Hidden Renderer for Batch PDF capture */}
      <div 
        ref={batchRenderRef} 
        className="bg-white"
        style={{ 
          width: '794px', 
          height: '1123px', 
          position: 'absolute', 
          left: '-9999px', 
          top: 0 
        }}
      >
        {isProcessingBatch && batchInvoices[batchProgress.current - 1] && (
          <InvoiceRenderer 
            invoice={batchInvoices[batchProgress.current - 1]} 
            theme={theme} 
            company={company} 
          />
        )}
      </div>

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Operations Center</h2>
            <p className="text-slate-500">Manage {invoices.length} invoices across {uniqueCustomers.length} customers</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm shadow-blue-500/20"
            >
              <Upload className="w-4 h-4" />
              <span>Import Operations</span>
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept=".csv" 
              onChange={handleFileChange} 
            />

            <button 
              onClick={() => {
                setShowBatchTool(!showBatchTool);
                setShowStatementTool(false);
              }}
              className={`inline-flex items-center space-x-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all border ${showBatchTool ? 'bg-indigo-600 border-indigo-700 text-white' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}`}
            >
              <Layers className="w-4 h-4" />
              <span>Batch Download</span>
              {showBatchTool ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
            </button>
            
            <button 
              onClick={() => {
                setShowStatementTool(!showStatementTool);
                setShowBatchTool(false);
              }}
              className={`inline-flex items-center space-x-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all border ${showStatementTool ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}`}
            >
              <FileText className="w-4 h-4" />
              <span>SOA Statement</span>
              {showStatementTool ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
            </button>

            <button 
              onClick={onLoadSample}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-lg transition-colors border border-slate-200"
            >
              <RefreshCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>

            <button 
              onClick={onClearAll}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-semibold rounded-lg transition-colors border border-red-200"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search bookings..." 
            className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg w-full md:w-64 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Batch Download UI */}
      {showBatchTool && (
        <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-xl animate-in fade-in slide-in-from-top-4 duration-300">
           <div className="flex items-center gap-3 mb-4">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Batch PC Download</h3>
              <p className="text-xs text-slate-500">Auto-download multiple PDFs directly to your computer</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 space-y-1">
              <label className="text-xs font-black text-slate-500 uppercase tracking-wider">Select Target Customer</label>
              <select 
                className="w-full bg-white border border-indigo-200 p-3 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-bold"
                value={batchCustomer}
                onChange={(e) => setBatchCustomer(e.target.value)}
              >
                <option value="">Choose a customer to bulk download...</option>
                {uniqueCustomers.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            
            <div className="bg-white p-3 rounded-lg border border-indigo-100 flex items-center gap-3">
               <div className="text-right">
                 <div className="text-[10px] font-black text-slate-400 uppercase leading-none">Selected</div>
                 <div className="text-xl font-black text-indigo-600 leading-none">{batchInvoices.length}</div>
               </div>
               <div className="h-8 w-px bg-slate-100" />
               <button 
                 onClick={processBatchDownload}
                 disabled={!batchCustomer || batchInvoices.length === 0}
                 className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-black px-6 py-2 rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/20"
               >
                 <Download className="w-4 h-4" />
                 <span>Download All as PDFs</span>
               </button>
            </div>
          </div>
        </div>
      )}

      {showStatementTool && (
        <div className="bg-blue-50 border border-blue-100 p-6 rounded-xl animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Generate Customer Statement</h3>
              <p className="text-xs text-slate-500">Combine all operations for a specific client and shipper into one document</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Select Customer</label>
              <select 
                className="w-full bg-white border border-blue-200 p-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                value={statementForm.customer}
                onChange={(e) => setStatementForm({...statementForm, customer: e.target.value, shipper: ''})}
              >
                <option value="">Choose a customer...</option>
                {uniqueCustomers.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Filter className="w-3 h-3" />
                Shipper Filter
              </label>
              <select 
                className="w-full bg-white border border-blue-200 p-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:bg-slate-50 disabled:text-slate-400"
                value={statementForm.shipper}
                disabled={!statementForm.customer}
                onChange={(e) => setStatementForm({...statementForm, shipper: e.target.value})}
              >
                <option value="">All Shippers</option>
                {uniqueShippersForCustomer.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Date From</label>
              <input 
                type="date"
                className="w-full bg-white border border-blue-200 p-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                value={statementForm.dateFrom}
                onChange={(e) => setStatementForm({...statementForm, dateFrom: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Date To</label>
              <input 
                type="date"
                className="w-full bg-white border border-blue-200 p-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                value={statementForm.dateTo}
                onChange={(e) => setStatementForm({...statementForm, dateTo: e.target.value})}
              />
            </div>
            <button 
              onClick={generateStatement}
              disabled={!statementForm.customer}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <span>Preview SOA</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Invoice No</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Booking Ref</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Customer</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Units</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Total Rate</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Date</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Status</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(inv => {
                const isUsed = usedInvoiceIds.has(inv.id);
                
                return (
                  <tr key={inv.id} className={`hover:bg-slate-50 transition-colors group`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                         {isUsed ? (
                           <FileCheck className="w-4 h-4 text-green-500" />
                         ) : (
                           <div className="w-4 h-4 rounded border border-slate-200" />
                         )}
                         <span className={`font-mono text-sm font-bold ${isUsed ? 'text-green-600' : 'text-blue-600'}`}>
                           {inv.serialNumber}
                         </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{inv.bookingNo}</td>
                    <td className="px-6 py-4 text-sm font-black text-slate-900">{inv.customer}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider">
                        {inv.items.length} Units
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-black text-slate-900">{inv.total.toLocaleString()} EGP</td>
                    <td className="px-6 py-4 text-sm text-slate-400">{inv.date}</td>
                    <td className="px-6 py-4">
                      {isUsed ? (
                        <span className="text-[10px] font-black text-green-600 bg-green-50 px-2 py-1 rounded uppercase tracking-widest">Printed</span>
                      ) : (
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pending</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handlePreview(inv)}
                        className={`inline-flex items-center space-x-2 font-bold text-sm transition-all hover:translate-x-1 ${isUsed ? 'text-green-600 hover:text-green-700' : 'text-blue-600 hover:text-blue-800'}`}
                      >
                        <Eye className="w-4 h-4" />
                        <span>{isUsed ? 'Re-Open' : 'Preview'}</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-slate-500 italic bg-slate-50/50">
                    <div className="flex flex-col items-center gap-2">
                       <Search className="w-8 h-8 text-slate-300" />
                       <p>No operations matching your search.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookingScreen;