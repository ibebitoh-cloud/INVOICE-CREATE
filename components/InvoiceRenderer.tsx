import React from 'react';
import { Invoice, InvoiceTheme, CompanyInfo, BookingRow } from '../types.ts';

interface Props {
  invoice: Invoice;
  theme: InvoiceTheme;
  company: CompanyInfo;
}

const InvoiceRenderer: React.FC<Props> = ({ invoice, theme, company }) => {
  const getThemeBaseStyles = () => {
    switch (theme) {
      case 'dark': return "bg-slate-900 text-slate-100 font-sans border-slate-800";
      case 'elegant': return "bg-white text-slate-800 font-serif border-slate-100";
      case 'modern-serif': return "bg-[#fafafa] text-slate-900 font-serif border-slate-200";
      case 'ledger-pro': return "bg-white text-slate-900 font-sans border-slate-900";
      case 'industrial': return "bg-[#eee] text-black font-mono uppercase tracking-tight border-black";
      case 'bold': return "bg-white text-slate-900 font-sans border-black";
      case 'grid': return "bg-white text-slate-900 font-mono border-slate-200";
      case 'soft': return "bg-[#fdfdfd] text-slate-700 font-sans rounded-3xl border-slate-100";
      case 'compact': return "bg-white text-slate-900 font-sans text-[10px] border-slate-200";
      default: return "bg-white text-slate-900 font-sans border-slate-100";
    }
  };

  const isDark = theme === 'dark';

  const renderHeader = () => {
    const commonLogoName = (
      <div className="flex flex-col items-start gap-1">
        {company.logo && <img src={company.logo} className={`h-24 w-auto mb-1 object-contain ${isDark ? 'brightness-200 grayscale' : ''}`} />}
        <div className={`text-3xl font-black tracking-tighter uppercase leading-none ${isDark ? 'text-white' : 'text-slate-900'} ${theme === 'modern-serif' ? 'italic' : ''}`}>{company.name}</div>
        <div className={`text-xs font-black tracking-[0.1em] uppercase ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>SHERIF HEGAZY</div>
      </div>
    );

    const titleText = invoice.isStatement ? 'STATEMENT OF ACCOUNT' : 'INVOICE';

    switch (theme) {
      case 'ledger-pro':
        return (
          <div className="flex justify-between items-start mb-10 border-b-8 border-slate-900 pb-6">
            <div className="space-y-2">
              <div className="text-5xl font-black tracking-tighter text-slate-900 uppercase leading-none">{company.name}</div>
              <div className="text-base font-black text-blue-600 uppercase tracking-widest">SHERIF HEGAZY</div>
            </div>
            <div className="text-right flex flex-col items-end">
              <h1 className="text-7xl font-black text-slate-100 tracking-tighter uppercase leading-none -mb-4 mr-2">{titleText}</h1>
              <div className="bg-slate-900 text-white p-3 inline-block relative z-10">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-1 opacity-60">Serial Number</div>
                <div className="text-2xl font-black">{invoice.serialNumber}</div>
              </div>
            </div>
          </div>
        );
      case 'industrial':
        return (
          <div className="border-b-[12px] border-black pb-4 mb-8 flex justify-between items-end">
            <div>
              <div className="text-5xl font-black tracking-tighter leading-none">{company.name}</div>
              <div className="text-xl font-black tracking-tighter mt-1">SHERIF HEGAZY</div>
              <div className="text-xs font-black mt-2 bg-black text-white px-2 py-1 inline-block">SYSTEM ID // {invoice.serialNumber}</div>
            </div>
            <div className="text-right">
              <div className="text-xs font-black">STAMPED: {invoice.date}</div>
              <div className="text-xs font-black text-red-600">DUE BY: {invoice.dueDate}</div>
              <div className="text-5xl font-black opacity-10">{titleText}</div>
            </div>
          </div>
        );
      case 'soft':
        return (
          <div className="flex justify-between items-center mb-10 p-8 bg-white rounded-3xl shadow-sm border border-slate-50">
            {commonLogoName}
            <div className="text-right">
              <h1 className="text-3xl font-black text-indigo-400 mb-1">{titleText}</h1>
              <div className="text-sm font-bold text-slate-300">REF: {invoice.serialNumber}</div>
            </div>
          </div>
        );
      case 'modern-serif':
        return (
          <div className="flex justify-between items-start mb-10 border-b-2 border-slate-900 pb-8">
            <div className="space-y-1">
               <div className="text-4xl font-bold font-serif italic text-slate-900">{company.name}</div>
               <div className="text-sm font-bold tracking-widest text-blue-700">SHERIF HEGAZY</div>
            </div>
            <div className="text-right">
              <h1 className="text-5xl font-black text-slate-200 uppercase leading-none mb-2">{titleText}</h1>
              <div className="text-xl font-bold text-slate-900">{invoice.serialNumber}</div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex justify-between items-start mb-8 border-l-8 border-slate-900 pl-6 py-2">
            {commonLogoName}
            <div className="text-right">
              <h1 className="text-5xl font-black text-slate-200 uppercase leading-none mb-1">{titleText}</h1>
              <div className="text-xl font-bold text-slate-900">{invoice.serialNumber}</div>
              <div className="mt-1">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Dated: {invoice.date}</p>
                <p className="text-[10px] text-red-500 font-black uppercase tracking-widest">Due: {invoice.dueDate}</p>
              </div>
            </div>
          </div>
        );
    }
  };

  const renderBillTo = () => {
    const periodLabel = invoice.isStatement ? 'Statement Period' : 'Booking Ref';
    const periodValue = invoice.isStatement ? invoice.period : invoice.bookingNo;

    switch (theme) {
      case 'ledger-pro':
        return (
          <div className="grid grid-cols-2 gap-0 mb-10 border-4 border-slate-900">
            <div className="p-6 border-r-4 border-slate-900">
              <h4 className="text-[10px] font-black uppercase text-slate-400 mb-3 tracking-[0.3em]">Billing Consignee</h4>
              <p className="text-4xl font-black text-slate-900 leading-none mb-4 uppercase tracking-tighter">{invoice.customer}</p>
              <div className="flex flex-col gap-2">
                <div>
                  <div className="text-[9px] font-black uppercase text-slate-400">Issue Date</div>
                  <div className="text-base font-bold">{invoice.date}</div>
                </div>
                <div>
                  <div className="text-[9px] font-black uppercase text-red-500">Deadline</div>
                  <div className="text-base font-black text-red-600 underline underline-offset-4">{invoice.dueDate}</div>
                </div>
              </div>
            </div>
            <div className="p-6 bg-slate-50 flex flex-col justify-center">
              <h4 className="text-[10px] font-black uppercase text-slate-400 mb-2 tracking-[0.3em]">{periodLabel}</h4>
              <p className="text-2xl font-black text-slate-900 uppercase tracking-tight leading-tight">{periodValue}</p>
            </div>
          </div>
        );
      case 'industrial':
        return (
          <div className="grid grid-cols-2 gap-0 mb-8 border-4 border-black">
            <div className="p-6 border-r-4 border-black">
              <div className="text-xs font-black underline mb-2">CLIENT / CONSIGNEE:</div>
              <div className="text-3xl font-black leading-tight mb-4">{invoice.customer}</div>
            </div>
            <div className="p-6 bg-slate-200">
              <div className="text-xs font-black underline mb-2">MANIFEST REF:</div>
              <div className="text-xl font-black break-words">{periodValue}</div>
              <div className="text-[11px] mt-4 font-bold border-t border-black pt-2 flex flex-col">
                <span>ORIGIN DATE: {invoice.date}</span>
                <span className="text-red-600">DUE DATE: {invoice.dueDate}</span>
              </div>
            </div>
          </div>
        );
      case 'soft':
        return (
          <div className="flex justify-between items-end mb-10 px-8">
            <div className="space-y-1">
              <h4 className="text-[11px] font-black uppercase text-indigo-200 tracking-widest">Billing Recipient</h4>
              <p className="text-4xl font-black text-slate-700">{invoice.customer}</p>
            </div>
            <div className="text-right">
              <h4 className="text-[11px] font-black uppercase text-indigo-200 tracking-widest">{periodLabel}</h4>
              <p className="text-xl font-bold text-indigo-500 mb-2">{periodValue}</p>
              <div className="bg-red-50 text-red-400 px-3 py-1 rounded-full text-[10px] font-bold inline-block">
                Settlement due by {invoice.dueDate}
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="mb-10 border-l-4 border-slate-200 pl-6 flex justify-between items-center">
            <div>
              <h4 className="text-[10px] font-black uppercase text-slate-400 mb-1 tracking-widest">Bill To</h4>
              <p className="text-3xl font-black text-slate-900 tracking-tighter">{invoice.customer}</p>
            </div>
            <div className="text-right border-r-8 border-slate-900 pr-4">
              <div className="text-[10px] font-black uppercase text-blue-600 mb-1 tracking-widest">{periodLabel}</div>
              <div className="text-2xl font-black text-slate-900 uppercase">{periodValue}</div>
            </div>
          </div>
        );
    }
  };

  const renderTable = () => {
    let tableClass = "w-full text-xs border-collapse";
    let theadClass = "bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-500 border-y border-slate-200";
    let thClass = "px-4 py-3 text-left";
    let tdClass = "px-4 py-4 border-b border-slate-100";
    let rateClass = "text-right font-black text-slate-900 text-base";

    if (theme === 'ledger-pro') {
      theadClass = "bg-slate-900 text-white text-[11px] font-black uppercase tracking-[0.2em]";
      tdClass = "px-4 py-3 border-2 border-slate-900 text-lg font-bold text-slate-900"; 
      rateClass = "text-right font-black text-slate-900 text-2xl";
      thClass = "px-4 py-3 text-left border-x-2 border-slate-900";
    } else if (theme === 'industrial') {
      theadClass = "bg-black text-white text-[11px] font-black border-y-4 border-black";
      tdClass = "px-4 py-3 border border-black font-black text-base";
      rateClass = "text-right text-xl border-l-4 border-l-black";
      thClass = "px-4 py-2 text-left";
    } else if (theme === 'dark') {
      theadClass = "bg-slate-800 text-slate-400 text-[10px] font-black uppercase tracking-widest border-y border-slate-700";
      tdClass = "px-4 py-5 border-b border-slate-800 text-slate-300";
      rateClass = "text-right font-black text-white text-xl";
      thClass = "px-4 py-3 text-left";
    } else if (theme === 'soft') {
      theadClass = "bg-transparent text-indigo-300 text-[11px] font-black tracking-widest border-b-2 border-indigo-50";
      tdClass = "px-4 py-5 bg-white shadow-[0_4px_12px_-4px_rgba(0,0,0,0.05)] border-b border-slate-50 rounded-xl mb-2";
      rateClass = "text-right font-black text-indigo-600 text-xl";
      thClass = "px-4 py-4 text-left";
    }

    return (
      <div className="mb-8 overflow-hidden">
        <table className={tableClass}>
          <thead className={theadClass}>
            <tr>
              <th className={thClass}>Operation Date</th>
              <th className={thClass}>Unit & Booking</th>
              <th className={thClass}>Route (Go → Gi)</th>
              <th className={thClass}>Shipper</th>
              <th className={thClass}>Trucker</th>
              <th className={`${thClass} text-right`}>Service Rate</th>
            </tr>
          </thead>
          <tbody className={theme === 'soft' ? 'space-y-4 before:content-[""] before:block before:h-4' : ''}>
            {invoice.items.map((item, i) => (
              <tr key={i} className={theme === 'soft' ? 'block mb-3' : ''}>
                <td className={`${tdClass} ${theme === 'soft' ? 'inline-block w-[15%]' : ''}`}>
                   <div className="text-[10px] font-bold text-slate-400">{item.Date}</div>
                </td>
                <td className={`${tdClass} ${theme === 'soft' ? 'inline-block w-[20%]' : ''}`}>
                  <div className="font-black tracking-tight">{item.UnitNumber}</div>
                  <div className={`text-[10px] font-bold uppercase ${isDark ? 'text-blue-400' : 'text-blue-500'}`}>{item.BookingNo}</div>
                </td>
                <td className={`${tdClass} ${theme === 'soft' ? 'inline-block w-[20%]' : ''}`}>
                  <div className="flex items-center gap-1 font-bold text-[12px]">
                    <span className="opacity-70">{item.PortGo}</span>
                    <span className={isDark ? 'text-blue-400' : 'text-blue-500'}>→</span>
                    <span>{item.PortGi}</span>
                  </div>
                </td>
                <td className={`${tdClass} ${theme === 'soft' ? 'inline-block w-[15%]' : ''}`}>
                  <div className="text-[11px] font-bold uppercase">{item.Shipper || '---'}</div>
                </td>
                <td className={`${tdClass} ${theme === 'soft' ? 'inline-block w-[15%]' : ''}`}>
                  <div className="text-[11px] font-black opacity-30 uppercase">{item.Trucker || '---'}</div>
                </td>
                <td className={`${tdClass} ${rateClass} ${theme === 'soft' ? 'inline-block w-[15%] text-right' : ''}`}>
                  {item.Rate.toLocaleString()} <span className="text-[10px] opacity-40 font-bold">EGP</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderFooter = () => {
    let totalBoxClass = "p-6 bg-slate-900 text-white rounded-2xl w-full flex justify-between items-center";
    let footerTaglineClass = "mt-auto pt-6 border-t flex flex-col items-center text-[10px] uppercase tracking-[0.5em] shrink-0";

    if (theme === 'ledger-pro') {
      totalBoxClass = "p-8 border-4 border-slate-900 text-slate-900 w-full flex justify-between items-center bg-slate-50";
    } else if (theme === 'industrial') {
      totalBoxClass = "p-6 border-8 border-black bg-white text-black w-full flex justify-between items-center shadow-[8px_8px_0_0_rgba(0,0,0,1)] mb-4";
    } else if (theme === 'dark') {
      totalBoxClass = "p-8 bg-blue-600 text-white rounded-3xl w-full flex justify-between items-center shadow-2xl shadow-blue-500/20";
      footerTaglineClass = "mt-auto pt-6 border-t border-slate-800 flex flex-col items-center text-[10px] uppercase tracking-[0.5em] shrink-0 text-slate-600";
    } else if (theme === 'soft') {
      totalBoxClass = "p-8 bg-indigo-500 text-white rounded-[2rem] w-full flex justify-between items-center shadow-2xl shadow-indigo-500/20";
    }

    const totalSection = (
      <div className={`${totalBoxClass} shrink-0`}>
         <div className="text-left">
            <div className={`text-[11px] font-black uppercase mb-1 tracking-widest ${isDark ? 'text-blue-200' : 'text-slate-400'}`}>Cumulative Total Payable</div>
            <div className="text-2xl font-black italic opacity-60">EGYPTIAN POUNDS (EGP)</div>
         </div>
         <div className="text-right">
            <div className="text-7xl font-black tabular-nums tracking-tighter">{invoice.total.toLocaleString()}</div>
         </div>
      </div>
    );

    return (
      <div className="mt-auto flex flex-col gap-10">
        {/* Total (Rate) Section on far right */}
        <div className="flex justify-end">
          <div className="w-full md:w-[450px]">
            {totalSection}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Settlement Instructions */}
          <div className="flex-1">
             <div className={`p-6 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'} border-l-8 border-l-blue-600 rounded-r-2xl shadow-sm`}>
                <h5 className={`text-[11px] font-black uppercase mb-3 tracking-widest ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>Settlement Instructions</h5>
                <p className="text-[12px] leading-relaxed opacity-80 font-medium">
                  Official payment is required before <span className="font-black text-red-600 underline decoration-2 underline-offset-4">{invoice.dueDate}</span>. 
                  Direct transfers to Nile Fleet are mandatory. Document reference <span className="font-bold bg-white px-2 py-0.5 rounded border border-slate-200">{invoice.serialNumber}</span> 
                  must be quoted in all remittance details for successful verification.
                </p>
             </div>
          </div>
          
          {/* My Info / Signature Section next to instructions */}
          <div className="flex-1 flex items-center justify-end gap-10 pr-4">
             {company.signature && (
               <div className="shrink-0 relative">
                 <img 
                   src={company.signature} 
                   className={`h-40 w-auto mix-blend-multiply object-contain opacity-95 -rotate-2 scale-110 drop-shadow-md ${isDark ? 'brightness-200 invert grayscale' : 'grayscale'}`} 
                   alt="Signature" 
                 />
                 <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-0.5 bg-slate-900/10 rounded-full" />
               </div>
             )}
             
             <div className={`border-l-4 pl-6 flex flex-col justify-center ${isDark ? 'border-blue-500' : 'border-slate-900'}`}>
                <p className={`text-2xl font-black uppercase leading-none ${isDark ? 'text-white' : 'text-slate-900'}`}>{company.authName}</p>
                <p className="text-sm font-black text-blue-500 uppercase tracking-[0.2em] mt-2">{company.authJobTitle}</p>
                
                <div className="mt-4 text-[10px] font-bold text-slate-400 uppercase flex flex-col gap-1 items-start leading-tight">
                   <div className="flex items-center gap-2">
                     <span className="opacity-50 font-black">LOC:</span>
                     <span className="text-slate-600">{company.address}</span>
                   </div>
                   <div className="flex items-center gap-2">
                     <span className="opacity-50 font-black">NET:</span>
                     <span className="text-slate-600">{company.email} • {company.phone}</span>
                   </div>
                </div>
             </div>
          </div>
        </div>

        <div className={footerTaglineClass}>
          <div className={`font-black mb-1 text-base tracking-widest ${isDark ? 'text-slate-400' : 'text-slate-900'}`}>NILE FLEET GENSET</div>
          <div className="opacity-40 font-bold text-[9px] tracking-[0.6em]">POWERED BY BEBITO SYSTEM</div>
        </div>
      </div>
    );
  };

  return (
    <div className={`invoice-container relative shadow-none transition-all duration-500 overflow-hidden ${getThemeBaseStyles()} ${theme === 'grid' ? 'bg-dot-grid' : ''}`}>
      {/* Watermark */}
      {company.watermark && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.05] pointer-events-none rotate-45 scale-[2]">
          <img src={company.watermark} className={`w-[140mm] h-auto grayscale ${isDark ? 'invert' : ''}`} />
        </div>
      )}

      {renderHeader()}
      {renderBillTo()}
      <div className="flex-1 overflow-hidden">
        {renderTable()}
      </div>
      {renderFooter()}

      {/* Decorative Stamp */}
      {(theme === 'industrial' || theme === 'ledger-pro' || theme === 'dark' || theme === 'bold') && (
        <div className={`absolute top-16 right-16 border-[6px] rounded-2xl p-4 flex items-center justify-center -rotate-12 pointer-events-none opacity-20 ${isDark ? 'border-blue-500 text-blue-500' : 'border-red-600 text-red-600'}`}>
           <div className={`text-sm font-black text-center uppercase leading-none tracking-tighter`}>
             OFFICIAL DOCUMENT<br/><span className="text-3xl">VERIFIED</span><br/>NILE FLEET GENSET
           </div>
        </div>
      )}
      
      {theme === 'grid' && (
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      )}
    </div>
  );
};

export default InvoiceRenderer;