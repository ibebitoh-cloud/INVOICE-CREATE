
import React, { useEffect } from 'react';
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
    
    // Set title to invoice number so the PDF filename is correct in the browser dialog
    const safeCustomer = invoice.customer.replace(/[^a-z0-9]/gi, '_');
    document.title = `${invoice.serialNumber}_${safeCustomer}`;
    
    // Small delay to ensure title update is registered before the print dialog freezes the thread
    setTimeout(() => {
      window.print();
      // Restore title after a short delay (dialog blocks execution, so this runs after close)
      setTimeout(() => {
        document.title = originalTitle;
      }, 500);
    }, 50);
  };

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <>
      {/* SCREEN UI - This entire block is hidden during printing via .no-print */}
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
                className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors flex items-center gap-2 px-4 border border-slate-200"
                title="Print standard copy"
              >
                <Printer className="w-5 h-5" />
                <span className="hidden md:inline font-medium">Print</span>
              </button>
              <button 
                className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2 px-4 shadow-lg shadow-blue-500/20 font-bold"
                onClick={handlePrint}
                title="Save as PDF (Use 'Save as PDF' in the print dialog)"
              >
                <Download className="w-5 h-5" />
                <span className="hidden md:inline text-sm">Download PDF</span>
              </button>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors ml-2"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Scrollable Preview Area for Web */}
          <div className="flex-1 overflow-y-auto bg-slate-100 py-8 px-4 flex justify-center items-start">
             <div className="invoice-preview-scale shadow-2xl mb-12">
                <InvoiceRenderer invoice={invoice} theme={theme} company={company} />
             </div>
          </div>
          
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              A4 Printing Ready
            </div>
            <span>Use "Save as PDF" to download file named: {invoice.serialNumber}.pdf</span>
          </div>
        </div>
      </div>

      {/* PRINT AREA - Visible only when printing via .print-only styles in index.html */}
      <div className="print-only">
        <InvoiceRenderer invoice={invoice} theme={theme} company={company} />
      </div>
    </>
  );
};

export default InvoiceModal;
