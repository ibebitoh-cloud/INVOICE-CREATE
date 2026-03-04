import React, { useEffect, useState, useRef } from 'react';
import { X, Printer, Download, Loader2, Edit3, Check } from 'lucide-react';
import { Invoice, InvoiceTheme, CompanyInfo } from '../types.ts';
import InvoiceRenderer from './InvoiceRenderer.tsx';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface Props {
  invoice: Invoice;
  theme: InvoiceTheme;
  company: CompanyInfo;
  onUpdateSerial: (newSerial: string) => void;
  onClose: () => void;
}

const InvoiceModal: React.FC<Props> = ({ invoice, theme, company, onUpdateSerial, onClose }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isEditingSerial, setIsEditingSerial] = useState(false);
  const [tempSerial, setTempSerial] = useState(invoice.serialNumber);
  const printRef = useRef<HTMLDivElement>(null);

  // Sync tempSerial when invoice changes
  useEffect(() => {
    setTempSerial(invoice.serialNumber);
  }, [invoice.serialNumber]);

  const handleSaveSerial = () => {
    onUpdateSerial(tempSerial);
    setIsEditingSerial(false);
  };

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
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.8);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgProps = pdf.getImageProperties(imgData);
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      let heightLeft = imgHeight;
      let position = 0;

      // Add the first page
      pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pdfHeight;

      // Add subsequent pages if needed
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight, undefined, 'FAST');
        heightLeft -= pdfHeight;
      }
      
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
      {/* 
        The root container must NOT have no-print. 
        Instead, we use internal no-print blocks for screen elements 
        and print-only blocks for the physical paper content.
      */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 pointer-events-none">
        
        {/* SCREEN UI - Backdrop and Controls (HIDDEN ON PRINT) */}
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm pointer-events-auto no-print" onClick={onClose} />
        
        <div className="relative bg-white w-full max-w-5xl h-full md:h-[95vh] md:rounded-2xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto no-print">
          {/* Modal Header */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Previewing Document</h3>
                {isEditingSerial ? (
                  <div className="flex items-center gap-2">
                    <input 
                      type="text" 
                      value={tempSerial}
                      onChange={(e) => setTempSerial(e.target.value)}
                      className="bg-slate-50 border border-blue-200 px-2 py-1 rounded text-sm font-bold text-blue-600 outline-none focus:ring-2 focus:ring-blue-500"
                      autoFocus
                    />
                    <button 
                      onClick={handleSaveSerial}
                      className="bg-blue-600 text-white p-1 rounded hover:bg-blue-700 transition-colors"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => {
                        setTempSerial(invoice.serialNumber);
                        setIsEditingSerial(false);
                      }}
                      className="bg-slate-200 text-slate-600 p-1 rounded hover:bg-slate-300 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 group">
                    <span className="text-lg font-black text-slate-800 leading-none">{invoice.serialNumber}</span>
                    <button 
                      onClick={() => setIsEditingSerial(true)}
                      className="p-1 text-slate-300 hover:text-blue-600 transition-colors opacity-0 group-hover:opacity-100"
                      title="Edit Serial Number"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
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

      {/* 
        NATIVE PRINT SOURCE - This div is invisible on screen but 
        is the primary target for window.print()
      */}
      <div className="print-only">
        <InvoiceRenderer invoice={invoice} theme={theme} company={company} />
      </div>

      {/* 
        PDF CAPTURE SOURCE - Off-screen high quality element for html2canvas.
        It must remain absolute and off-screen to not affect layout.
      */}
      <div 
        ref={printRef} 
        className="bg-white no-print"
        style={{ 
          width: '210mm', 
          minHeight: '297mm', 
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