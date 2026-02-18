
import React, { useEffect, useState, useRef } from 'react';
import { X, Printer, Download, Loader2 } from 'lucide-react';
import { Invoice, InvoiceTheme, CompanyInfo } from '../types.ts';
import InvoiceRenderer from './InvoiceRenderer.tsx';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface Props {
  invoice: Invoice;
  theme: InvoiceTheme;
  company: CompanyInfo;
  onClose: () => void;
}

const InvoiceModal: React.FC<Props> = ({ invoice, theme, company, onClose }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  // Handle browser printing
  const handlePrint = () => {
    const originalTitle = document.title;
    const safeCustomer = invoice.customer.replace(/[^a-z0-9]/gi, '_');
    document.title = `${invoice.serialNumber}_${safeCustomer}`;
    
    setTimeout(() => {
      window.print();
      setTimeout(() => {
        document.title = originalTitle;
      }, 500);
    }, 50);
  };

  // Handle PDF generation using html2canvas and jsPDF
  const handleDownloadPDF = async () => {
    if (isDownloading) return;
    setIsDownloading(true);

    try {
      // Use the off-screen high-resolution element for capturing
      const element = printRef.current;
      if (!element) throw new Error("Print source not found");

      // Small delay to ensure all assets (logo, signature) are rendered
      await new Promise(resolve => setTimeout(resolve, 600));

      const canvas = await html2canvas(element, {
        scale: 3, // High DPI for professional print quality
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        width: 794, // Standard A4 width at 96 DPI
        height: 1123, // Standard A4 height at 96 DPI
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      
      const safeCustomer = invoice.customer.replace(/[^a-z0-9]/gi, '_');
      pdf.save(`${invoice.serialNumber}_${safeCustomer}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Automatic download failed. Please use the Print button and select "Save as PDF" as a fallback.');
    } finally {
      setIsDownloading(false);
    }
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
      {/* SCREEN UI - User facing preview modal */}
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
                disabled={isDownloading}
              >
                <Printer className="w-5 h-5" />
                <span className="hidden md:inline font-medium">Print</span>
              </button>
              <button 
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2 px-4 shadow-lg shadow-blue-500/20 font-bold disabled:bg-blue-400 min-w-[160px] justify-center"
              >
                {isDownloading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Download className="w-5 h-5" />
                )}
                <span className="hidden md:inline text-sm">
                  {isDownloading ? 'Downloading...' : 'Download PDF'}
                </span>
              </button>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors ml-2"
                disabled={isDownloading}
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
        </div>
      </div>

      {/* PRINT SOURCE - Off-screen high quality element for html2canvas */}
      <div 
        ref={printRef} 
        className="bg-white"
        style={{ 
          width: '794px', 
          minHeight: '1123px', 
          position: 'absolute', 
          left: '-9999px', 
          top: 0 
        }}
      >
        <InvoiceRenderer invoice={invoice} theme={theme} company={company} />
      </div>
    </>
  );
};

export default InvoiceModal;
