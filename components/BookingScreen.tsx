
import React, { useRef, useState, useMemo } from 'react';
import { Eye, Search, Upload, RefreshCcw, FileText, Calendar, ArrowRight, ChevronDown, ChevronUp, Download, Trash2, Filter } from 'lucide-react';
import { Invoice, BookingRow } from '../types.ts';
import { INITIAL_CSV_DATA } from '../constants.tsx';

interface Props {
  invoices: Invoice[];
  onPreview: (invoice: Invoice) => void;
  onImport: (data: BookingRow[]) => void;
  onClearAll: () => void;
  onLoadSample: () => void;
}

const BookingScreen: React.FC<Props> = ({ invoices, onPreview, onImport, onClearAll, onLoadSample }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [usedInvoiceIds, setUsedInvoiceIds] = useState<Set<string>>(new Set());
  const [showStatementTool, setShowStatementTool] = useState(false);
  const [statementForm, setStatementForm] = useState({
    customer: '',
    shipper: '',
    dateFrom: '',
    dateTo: ''
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filtered = invoices.filter(inv => 
    inv.bookingNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const uniqueCustomers = useMemo(() => Array.from(new Set(invoices.map(inv => inv.customer))), [invoices]);

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
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Booking Operations</h2>
            <p className="text-slate-500">View and generate invoices from your logistics operations</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm shadow-blue-500/20"
            >
              <Upload className="w-4 h-4" />
              <span>Import CSV</span>
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept=".csv" 
              onChange={handleFileChange} 
            />

            <button 
              onClick={handleDownloadSample}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-lg transition-colors border border-slate-200"
            >
              <Download className="w-4 h-4" />
              <span>Download Sample CSV</span>
            </button>
            
            <button 
              onClick={() => setShowStatementTool(!showStatementTool)}
              className={`inline-flex items-center space-x-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all border ${showStatementTool ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}`}
            >
              <FileText className="w-4 h-4" />
              <span>Statement of Account</span>
              {showStatementTool ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
            </button>

            <button 
              onClick={onLoadSample}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-lg transition-colors border border-slate-200"
            >
              <RefreshCcw className="w-4 h-4" />
              <span>Reset Sample</span>
            </button>

            <button 
              onClick={onClearAll}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-semibold rounded-lg transition-colors border border-red-200"
            >
              <Trash2 className="w-4 h-4" />
              <span>Remove All</span>
            </button>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search bookings..." 
            className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg w-full md:w-64 focus:ring-2 focus:ring-blue-500 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

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
              <span>Preview</span>
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
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(inv => {
                const isUsed = usedInvoiceIds.has(inv.id);
                const textColorClass = isUsed ? 'text-red-600' : 'text-slate-700';
                
                return (
                  <tr key={inv.id} className={`hover:bg-slate-50 transition-colors ${isUsed ? 'bg-red-50/30' : ''}`}>
                    <td className={`px-6 py-4 font-mono text-sm font-medium ${isUsed ? 'text-red-700' : 'text-blue-600'}`}>
                      {inv.serialNumber}
                    </td>
                    <td className={`px-6 py-4 text-sm ${textColorClass}`}>{inv.bookingNo}</td>
                    <td className={`px-6 py-4 text-sm font-medium ${isUsed ? 'text-red-800' : 'text-slate-900'}`}>{inv.customer}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`${isUsed ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'} px-2 py-0.5 rounded text-xs font-semibold`}>
                        {inv.items.length} Units
                      </span>
                    </td>
                    <td className={`px-6 py-4 text-sm font-bold ${isUsed ? 'text-red-700' : 'text-slate-900'}`}>{inv.total.toLocaleString()} EGP</td>
                    <td className={`px-6 py-4 text-sm ${isUsed ? 'text-red-400' : 'text-slate-500'}`}>{inv.date}</td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => handlePreview(inv)}
                        className={`inline-flex items-center space-x-2 font-medium text-sm transition-colors ${isUsed ? 'text-red-600 hover:text-red-800' : 'text-blue-600 hover:text-blue-800'}`}
                      >
                        <Eye className="w-4 h-4" />
                        <span>{isUsed ? 'Regenerate' : 'Generate'}</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-500 italic">
                    No bookings found. Try importing a CSV or loading sample data.
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
