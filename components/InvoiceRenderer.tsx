import React from 'react';
import { Invoice, InvoiceTheme, CompanyInfo } from '../types.ts';

interface Props {
  invoice: Invoice;
  theme: InvoiceTheme;
  company: CompanyInfo;
}

const InvoiceRenderer: React.FC<Props> = ({ invoice, theme, company }) => {
  const getThemeBaseStyles = () => {
    switch (theme) {
      case 'dark': return "bg-[#0f172a] text-slate-100 font-sans p-12";
      case 'elegant': return "bg-[#fffcf9] text-[#2d241e] font-serif p-16";
      case 'modern-serif': return "bg-white text-slate-900 font-serif p-12";
      case 'ledger-pro': return "bg-white text-slate-900 font-sans p-10";
      case 'industrial': return "bg-[#f0f0f0] text-black font-mono uppercase p-8 tracking-tighter";
      case 'bold': return "bg-white text-black font-sans p-12";
      case 'grid': return "bg-white text-slate-800 font-mono p-8";
      case 'soft': return "bg-[#fafbff] text-slate-700 font-sans p-12 rounded-[2.5rem]";
      case 'compact': return "bg-white text-slate-900 font-sans p-6 text-[11px]";
      case 'corporate': return "bg-white text-slate-800 font-sans p-12 border-t-[12px] border-blue-800";
      case 'classic': return "bg-white text-black font-serif p-12 border border-slate-200";
      default: return "bg-white text-slate-900 font-sans p-12";
    }
  };

  const isDark = theme === 'dark';
  const titleText = invoice.isStatement ? 'STATEMENT OF ACCOUNT' : 'INVOICE';
  const periodLabel = invoice.isStatement ? 'Statement Period' : 'Booking Ref';
  const periodValue = invoice.isStatement ? invoice.period : invoice.bookingNo;

  // Exact Settlement Instructions as requested
  const settlementText = `Official payment is required before ${invoice.dueDate}. Direct transfers to Nile Fleet are mandatory. Document reference ${invoice.serialNumber} must be quoted in all remittance details for successful verification.`;

  const renderHeader = () => {
    switch (theme) {
      case 'modern-serif':
        return (
          <div className="flex justify-between items-start mb-16 border-b border-slate-200 pb-12">
            <div className="space-y-4">
              {company.logo && <img src={company.logo} className="h-14 w-auto grayscale" />}
              <h1 className="text-5xl font-black italic tracking-tighter leading-none">{company.name}</h1>
              <p className="text-[10px] font-bold tracking-[0.4em] text-blue-600 uppercase">{company.subName || 'Logistics & Power'}</p>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-widest">Document Registry</div>
              <div className="text-3xl font-light italic text-slate-900">{invoice.serialNumber}</div>
              <div className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-tighter">{invoice.date}</div>
            </div>
          </div>
        );
      case 'industrial':
        return (
          <div className="grid grid-cols-2 border-b-[10px] border-black mb-12 pb-6">
            <div className="flex flex-col justify-end">
              <div className="text-5xl font-black leading-[0.8] mb-2">{company.name}</div>
              <div className="text-[11px] font-black bg-black text-white px-2 py-0.5 inline-block w-fit uppercase">{company.subName || 'CORE // GENSET // INFRA'}</div>
            </div>
            <div className="text-right flex flex-col justify-end items-end">
              <div className="text-xs font-black mb-1">REF_CODE: {invoice.serialNumber}</div>
              <div className="text-xs font-black">STAMPED_ON: {invoice.date}</div>
              <div className="text-6xl font-black opacity-10 absolute right-8 top-8 select-none">{titleText}</div>
            </div>
          </div>
        );
      case 'ledger-pro':
        return (
          <div className="flex justify-between items-stretch mb-12 bg-slate-900 text-white -mx-10 -mt-10 p-10 h-40">
            <div className="flex flex-col justify-between border-l-4 border-blue-500 pl-6">
              <div className="text-4xl font-black tracking-tighter uppercase">{company.name}</div>
              <div className="text-[10px] font-bold tracking-[0.2em] opacity-40 uppercase">{company.subName || 'Executive Operations Division'}</div>
            </div>
            <div className="text-right flex flex-col justify-between">
              <h1 className="text-xs font-black tracking-[0.3em] opacity-30 uppercase">{titleText}</h1>
              <div className="text-4xl font-mono tracking-tighter text-blue-400">{invoice.serialNumber}</div>
            </div>
          </div>
        );
      case 'soft':
        return (
          <div className="flex justify-between items-center mb-12 bg-white rounded-[2rem] p-10 shadow-sm border border-slate-50">
            <div className="flex items-center gap-8">
              {company.logo && <div className="p-3 bg-indigo-50 rounded-2xl"><img src={company.logo} className="h-10 w-auto" /></div>}
              <div>
                <h1 className="text-3xl font-black text-slate-800 tracking-tight">{company.name}</h1>
                <div className="bg-indigo-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full inline-block uppercase tracking-widest mt-1">{company.subName || 'Verified Document'}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Serial Tracking</div>
              <div className="text-3xl font-black text-indigo-600 tracking-tighter">{invoice.serialNumber}</div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex justify-between items-start mb-12 border-l-8 border-slate-900 pl-8 py-2">
            <div className="space-y-4">
              {company.logo && <img src={company.logo} className={`h-16 w-auto ${isDark ? 'brightness-200' : ''}`} />}
              <div>
                <div className="text-4xl font-black tracking-tighter uppercase text-slate-900">{company.name}</div>
                <div className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em]">{company.subName}</div>
              </div>
            </div>
            <div className="text-right">
              <h1 className="text-5xl font-black opacity-[0.05] leading-none uppercase -mb-4 mr-2">{titleText}</h1>
              <div className="text-3xl font-bold mt-2 text-slate-900 tracking-tight">{invoice.serialNumber}</div>
              <div className="mt-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">Dated: {invoice.date}</div>
            </div>
          </div>
        );
    }
  };

  const renderBillTo = () => {
    switch (theme) {
      case 'modern-serif':
        return (
          <div className="grid grid-cols-2 gap-16 mb-16 items-start">
            <div className="space-y-4">
              <h3 className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.4em]">Recipient Profile</h3>
              <div className="text-5xl font-light italic leading-[0.9] text-slate-800">{invoice.customer}</div>
              <div className="h-0.5 w-full bg-slate-900/5 mt-4"></div>
            </div>
            <div className="space-y-6 bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
               <div className="flex justify-between gap-8">
                  <div className="flex-1">
                    <div className="text-[9px] font-black text-slate-400 uppercase mb-1 tracking-widest">Manifest Ref</div>
                    <div className="font-bold text-slate-900 truncate">{periodValue}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[9px] font-black text-red-400 uppercase mb-1 tracking-widest">Payment Deadline</div>
                    <div className="font-black text-red-600">{invoice.dueDate}</div>
                  </div>
               </div>
            </div>
          </div>
        );
      case 'industrial':
        return (
          <div className="grid grid-cols-12 gap-0 mb-12 border-4 border-black">
            <div className="col-span-7 p-6 border-r-4 border-black">
              <div className="text-[10px] font-black underline mb-3">DESTINATION_ENTITY</div>
              <div className="text-4xl font-black leading-[0.8]">{invoice.customer}</div>
            </div>
            <div className="col-span-5 p-6 bg-yellow-400 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-black mb-1 opacity-60">LOG_REF_ID</div>
                <div className="text-xs font-black truncate">{periodValue}</div>
              </div>
              <div className="pt-3 border-t border-black/10">
                <div className="text-[10px] font-black opacity-60">DUE_THRESHOLD</div>
                <div className="text-xl font-black">{invoice.dueDate}</div>
              </div>
            </div>
          </div>
        );
      case 'ledger-pro':
        return (
          <div className="flex justify-between items-end mb-12 border-b border-slate-200 pb-10">
            <div className="max-w-md">
              <div className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Account Consignee</div>
              <div className="text-5xl font-black text-slate-900 tracking-tighter leading-[0.8] uppercase">{invoice.customer}</div>
            </div>
            <div className="text-right space-y-4">
               <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{periodLabel}</div>
                  <div className="text-2xl font-black text-slate-900">{periodValue}</div>
               </div>
               <div className="bg-red-600 text-white px-4 py-2 text-[10px] font-black uppercase tracking-widest w-fit ml-auto">
                 Payable by {invoice.dueDate}
               </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex justify-between mb-12 items-center bg-slate-50 p-8 border border-slate-100 rounded-2xl">
            <div>
              <div className="text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">Bill To Account</div>
              <div className="text-4xl font-black text-slate-900 tracking-tight">{invoice.customer}</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-black text-blue-600 uppercase mb-1 tracking-widest">{periodLabel}</div>
              <div className="text-xl font-bold text-slate-900">{periodValue}</div>
              <div className="text-[10px] font-black text-red-500 mt-2 uppercase bg-red-50 px-2 py-1 rounded inline-block">Due: {invoice.dueDate}</div>
            </div>
          </div>
        );
    }
  };

  const renderTable = () => {
    let theadClass = "bg-slate-50 border-y border-slate-200";
    let thClass = "px-4 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-500";
    let tdClass = "px-4 py-5 border-b border-slate-100 text-[13px]";
    
    if (theme === 'ledger-pro') {
      theadClass = "bg-slate-900 text-white";
      thClass = "px-4 py-4 text-left font-black text-[11px] uppercase tracking-widest";
      tdClass = "px-4 py-6 border-b border-slate-100 text-[14px] font-bold text-slate-800";
    } else if (theme === 'industrial') {
      theadClass = "bg-black text-white";
      thClass = "px-4 py-3 text-left font-black text-[11px] tracking-tight";
      tdClass = "px-4 py-4 border-4 border-black text-base font-black";
    } else if (theme === 'soft') {
      theadClass = "bg-indigo-50/50";
      thClass = "px-6 py-4 text-left font-black text-[10px] text-indigo-400 tracking-[0.2em]";
      tdClass = "px-6 py-6 border-b border-indigo-50/50 text-[14px] font-medium text-slate-600";
    }

    return (
      <div className="mb-12">
        <table className="w-full border-collapse">
          <thead className={theadClass}>
            <tr>
              <th className={thClass}>Date</th>
              <th className={thClass}>Unit & Booking</th>
              <th className={thClass}>Route</th>
              <th className={thClass}>Shipper</th>
              <th className={`${thClass} text-right`}>Service Rate</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, i) => (
              <tr key={i} className={`${theme === 'soft' ? 'hover:bg-indigo-50/30' : 'hover:bg-slate-50'} transition-colors`}>
                <td className={tdClass}>
                   <div className="font-bold opacity-60">{item.Date}</div>
                </td>
                <td className={tdClass}>
                  <div className="font-black text-slate-900">{item.UnitNumber}</div>
                  <div className="text-[9px] font-black text-blue-500 uppercase tracking-widest mt-0.5">{item.BookingNo}</div>
                </td>
                <td className={tdClass}>
                   <div className="flex items-center gap-2">
                      <span className="font-bold opacity-50">{item.PortGo}</span>
                      <span className="text-blue-500 text-[10px] font-black">→</span>
                      <span className="font-bold text-slate-900">{item.PortGi}</span>
                   </div>
                </td>
                <td className={tdClass}>
                  <div className="uppercase font-bold text-slate-500">{item.Shipper || '-'}</div>
                </td>
                <td className={`${tdClass} text-right font-black text-slate-900`}>
                  {item.Rate.toLocaleString()} <span className="text-[10px] font-bold opacity-30">EGP</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderFooter = () => {
    // Info block including Location, Mail, Mobile as requested
    const authAndSignature = (
      <div className="flex items-end gap-12">
        {/* Auth Info Block - Fixed "under authorize add my info" */}
        <div className={`flex flex-col justify-end border-l-4 pl-6 ${isDark ? 'border-blue-500' : 'border-slate-900'}`}>
          <div className="text-3xl font-black tracking-tight leading-none uppercase mb-2">{company.authName}</div>
          <div className="text-xs font-black text-blue-600 uppercase tracking-widest mb-6">{company.authJobTitle}</div>
          
          <div className="space-y-1.5 text-[10px] font-bold text-slate-400 uppercase leading-none">
            <div className="flex items-center gap-2">
              <span className="min-w-[40px] opacity-40">LOC:</span>
              <span className="text-slate-600">{company.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="min-w-[40px] opacity-40">MAIL:</span>
              <span className="text-slate-600 lowercase">{company.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="min-w-[40px] opacity-40">MOB:</span>
              <span className="text-slate-600">{company.phone}</span>
            </div>
          </div>
        </div>

        {/* Signature - Scaled proportional to text and placed close to end of text */}
        <div className="flex items-end pb-1 translate-y-2">
          {company.signature && (
            <div className="relative">
              <img 
                src={company.signature} 
                className={`h-24 md:h-28 w-auto mix-blend-multiply opacity-90 object-contain grayscale brightness-50 ${isDark ? 'invert' : ''}`} 
                alt="Authorized Signature" 
              />
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-slate-900/10 rounded-full" />
            </div>
          )}
        </div>
      </div>
    );

    const settlementSection = (
      <div className={`p-6 rounded-2xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
         <h5 className="text-[10px] font-black uppercase text-blue-600 tracking-widest mb-3">Settlement Mandate</h5>
         <p className="text-[11.5px] leading-relaxed text-slate-500 font-medium">
            {settlementText}
         </p>
      </div>
    );

    const totalSection = (
      <div className="bg-slate-900 text-white p-8 rounded-[2rem] flex justify-between items-center w-full shadow-xl shadow-slate-900/10">
         <div>
            <div className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mb-1">Total Payable Balance</div>
            <div className="text-xs font-bold italic opacity-60">Currency: Egyptian Pounds (EGP)</div>
         </div>
         <div className="text-6xl font-black tabular-nums tracking-tighter">
            {invoice.total.toLocaleString()}
         </div>
      </div>
    );

    const taglineSection = (
      <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col items-center shrink-0">
        <div className={`font-black text-base tracking-[0.3em] uppercase ${isDark ? 'text-slate-400' : 'text-slate-900'}`}>NILE FLEET GENSET</div>
        <div className="text-[9px] font-bold text-slate-400 tracking-[0.5em] uppercase mt-1 opacity-50">POWERED BY BEBITO SYSTEM</div>
      </div>
    );

    switch (theme) {
      case 'modern-serif':
        return (
          <div className="mt-auto pt-16 border-t border-slate-100 flex flex-col">
             <div className="mb-12">
                {totalSection}
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
                <div className="space-y-8">
                   {settlementSection}
                   {authAndSignature}
                </div>
                <div className="text-right pb-4">
                   <div className="text-[10px] font-black opacity-30 uppercase tracking-[0.5em] rotate-180 [writing-mode:vertical-lr]">System Verified</div>
                </div>
             </div>
             {taglineSection}
          </div>
        );
      case 'industrial':
        return (
          <div className="mt-auto pt-10 flex flex-col">
             <div className="bg-black text-white p-6 mb-8 flex justify-between items-end border-b-[20px] border-yellow-400">
                <div className="text-3xl font-black leading-none uppercase">Total_Due_Payable</div>
                <div className="text-7xl font-black tracking-tighter leading-none">{invoice.total.toLocaleString()}</div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                <div className="space-y-4">
                  <div className="p-4 border-4 border-black font-black text-[10px]">
                    {settlementText}
                  </div>
                  {authAndSignature}
                </div>
                <div className="flex justify-end opacity-20 rotate-12 -translate-y-8">
                   <div className="border-[12px] border-black p-4 text-3xl font-black text-center uppercase leading-none">
                     Original<br/>Auth<br/>Nile Fleet
                   </div>
                </div>
             </div>
             {taglineSection}
          </div>
        );
      case 'ledger-pro':
        return (
          <div className="mt-auto pt-10 flex flex-col">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch mb-12">
                <div className="flex flex-col justify-center">
                   {settlementSection}
                </div>
                <div className="bg-slate-900 text-white p-10 flex flex-col justify-center">
                   <div className="text-[11px] font-black uppercase tracking-[0.4em] text-blue-400 mb-2">Net Clearing Amount</div>
                   <div className="text-6xl font-black tracking-tighter">{invoice.total.toLocaleString()} <span className="text-sm font-bold opacity-30">EGP</span></div>
                </div>
             </div>
             <div className="flex justify-between items-end border-t border-slate-100 pt-10">
                {authAndSignature}
                <div className="text-right text-[9px] font-black opacity-20 uppercase tracking-[1em] mb-2">Registry #NF9928</div>
             </div>
             {taglineSection}
          </div>
        );
      default:
        return (
          <div className="mt-auto pt-12 border-t-2 border-slate-100 flex flex-col">
             <div className="flex flex-col gap-12">
                <div className="flex justify-between items-center w-full bg-slate-50 p-8 rounded-3xl border border-slate-100">
                   <div>
                     <div className="text-[10px] font-black uppercase text-slate-400 mb-1">Total Due Amount</div>
                     <div className="text-5xl font-black text-slate-900 tracking-tighter">{invoice.total.toLocaleString()} EGP</div>
                   </div>
                   <div className="max-w-xs text-right">
                      {settlementSection}
                   </div>
                </div>
                <div className="flex justify-between items-end">
                   {authAndSignature}
                   <div className="text-right pb-4">
                      <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Nile Fleet Authorized Seal</div>
                   </div>
                </div>
             </div>
             {taglineSection}
          </div>
        );
    }
  };

  return (
    <div className={`invoice-container relative shadow-2xl transition-all duration-700 overflow-hidden ${getThemeBaseStyles()}`}>
      {/* Background Watermark */}
      {company.watermark && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none rotate-12 scale-[1.5]">
          <img src={company.watermark} className={`w-[140mm] h-auto grayscale ${isDark ? 'invert' : ''}`} />
        </div>
      )}

      {renderHeader()}
      {renderBillTo()}
      <div className="flex-1">
        {renderTable()}
      </div>
      {renderFooter()}

      {/* Decorative Overlays */}
      {theme === 'grid' && (
        <div className="absolute inset-0 pointer-events-none opacity-[0.05]" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      )}
      
      {/* Authority Stamp */}
      {(theme === 'industrial' || theme === 'ledger-pro') && (
        <div className="absolute bottom-24 right-12 opacity-5 pointer-events-none rotate-[15deg]">
           <div className="border-[10px] border-black p-6 text-2xl font-black text-center uppercase">
              System<br/>Verified<br/>Logistics
           </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceRenderer;