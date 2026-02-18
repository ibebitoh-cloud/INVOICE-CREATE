
import React from 'react';
import { X, Printer, Download } from 'lucide-react';
import { Invoice, InvoiceTheme, CompanyInfo } from '../types.ts';
import InvoiceRenderer from './InvoiceRenderer.tsx';

interface Props {
  invoice: Invoice;
  theme: InvoiceTheme;
  company: CompanyInfo;
  onClose: () => void;
}

const InvoiceModal: React.FC<Props> = ({ invoice, theme, company, onClose }) => {
  const handlePrint = () => {
    // Save original title
    const originalTitle = document.title;
    // Set title to invoice number so the PDF filename is correct
    document.title = `${invoice.serialNumber}_${invoice.customer.replace(/[^a-z0-9]/gi, '_')}`;
    
    // Trigger print
    window.print();
    
    // Restore title
    setTimeout(() => {
      document.title = originalTitle;
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm no-print">
      <div className="bg-white w-full max-w-5xl h-[95vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-bold text-slate-800">Preview Invoice</h3>
            <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border border-blue-100">
              A4 Format • {theme}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handlePrint}
              className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors flex items-center gap-2 px-4"
              title="Print standard copy"
            >
              <Printer className="w-5 h-5" />
              <span className="hidden md:inline font-medium">Print</span>
            </button>
            <button 
              className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2 px-4 shadow-lg shadow-blue-500/20"
              onClick={handlePrint}
              title="Save as PDF using system dialog"
            >
              <Download className="w-5 h-5" />
              <span className="hidden md:inline font-medium text-sm">Save to PDF</span>
            </button>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Scrollable Preview Area */}
        <div className="flex-1 overflow-y-auto bg-slate-100 py-8 px-4 flex justify-center items-start">
           <div className="invoice-preview-scale shadow-2xl mb-12">
              <InvoiceRenderer invoice={invoice} theme={theme} company={company} />
           </div>
        </div>
      </div>

      {/* Hidden container for the printer/PDF generator */}
      {/* We don't use the 'hidden' class here because it might conflict with print styles */}
      <div className="print-only" style={{ display: 'none' }}>
        <InvoiceRenderer invoice={invoice} theme={theme} company={company} />
      </div>
    </div>
  );
};

export default InvoiceModal;
