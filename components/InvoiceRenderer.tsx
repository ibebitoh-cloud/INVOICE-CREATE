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
      case 'dark': return "bg-[#0f172a] text-slate-100 font-sans p-10";
      case 'elegant': return "bg-[#fffcf9] text-[#2d241e] font-serif p-12";
      case 'modern-serif': return "bg-white text-slate-900 font-serif p-10";
      case 'ledger-pro': return "bg-white text-slate-900 font-sans p-8";
      case 'industrial': return "bg-[#f0f0f0] text-black font-mono uppercase p-8 tracking-tighter";
      case 'bold': return "bg-white text-black font-sans p-10";
      case 'grid': return "bg-white text-slate-800 font-mono p-8";
      case 'soft': return "bg-[#fafbff] text-slate-700 font-sans p-10 rounded-[2rem]";
      case 'compact': return "bg-white text-slate-900 font-sans p-6 text-[11px]";
      case 'corporate': return "bg-white text-slate-800 font-sans p-10 border-t-[10px] border-blue-800";
      case 'classic': return "bg-white text-black font-serif p-10 border border-slate-200";
      default: return "bg-white text-slate-900 font-sans p-10";
    }
  };

  const isDark = theme === 'dark';
  const titleText = invoice.isStatement ? 'STATEMENT OF ACCOUNT' : 'INVOICE';
  const periodLabel = invoice.isStatement ? 'Statement Period' : 'Booking Ref';
  const periodValue = invoice.isStatement ? invoice.period : invoice.bookingNo;

  // Updated Settlement Instructions with "final after a week" clause
  const settlementText = `Official payment is required before ${invoice.dueDate}. Direct transfers to Nile Fleet are mandatory. Document reference ${invoice.serialNumber} must be quoted in all remittance details for successful verification. After receiving the booking within a week, the invoice is final if no edits are required from your side.`;

  const renderHeader = () => {
    switch (theme) {
      case 'modern-serif':
        return (
          <div className="flex justify-between items-start mb-10 border-b border-slate-200 pb-8">
            <div className="space-y-3">
              {company.logo && <img src={company.logo} className="h-12 w-auto grayscale" />}
              <h1 className="text-4xl font-black italic tracking-tighter leading-none">{company.name}</h1>
              <p className="text-[9px] font-bold tracking-[0.4em] text-blue-600 uppercase">{company.subName || 'Logistics & Power'}</p>
            </div>
            <div className="text-right">
              <div className="text-[9px] font-bold text-slate-400 mb-1 uppercase tracking-widest">Document Registry</div>
              <div className="text-2xl font-light italic text-slate-900">{invoice.serialNumber}</div>
              <div className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">{invoice.date}</div>
            </div>
          </div>
        );
      case 'industrial':
        return (
          <div className="grid grid-cols-2 border-b-[8px] border-black mb-10 pb-4">
            <div className="flex flex-col justify-end">
              <div className="text-4xl font-black leading-[0.8] mb-1">{company.name}</div>
              <div className="text-[10px] font-black bg-black text-white px-2 py-0.5 inline-block w-fit uppercase">{company.subName || 'CORE // GENSET // INFRA'}</div>
            </div>
            <div className="text-right flex flex-col justify-end items-end">
              <div className="text-[10px] font-black mb-1">REF_CODE: {invoice.serialNumber}</div>
              <div className="text-[10px] font-black">STAMPED_ON: {invoice.date}</div>
              <div className="text-5xl font-black opacity-10 absolute right-8 top-8 select-none">{titleText}</div>
            </div>
          </div>
        );
      case 'ledger-pro':
        return (
          <div className="flex justify-between items-stretch mb-10 bg-slate-900 text-white -mx-8 -mt-8 p-8 h-32">
            <div className="flex flex-col justify-between border-l-4 border-blue-500 pl-6">
              <div className="text-3xl font-black tracking-tighter uppercase">{company.name}</div>
              <div className="text-[9px] font-bold tracking-[0.2em] opacity-40 uppercase">{company.subName || 'Executive Operations Division'}</div>
            </div>
            <div className="text-right flex flex-col justify-between">
              <h1 className="text-[10px] font-black tracking-[0.3em] opacity-30 uppercase">{titleText}</h1>
              <div className="text-3xl font-mono tracking-tighter text-blue-400">{invoice.serialNumber}</div>
            </div>
          </div>
        );
      case 'soft':
        return (
          <div className="flex justify-between items-center mb-10 bg-white rounded-[1.5rem] p-8 shadow-sm border border-slate-50">
            <div className="flex items-center gap-6">
              {company.logo && <div className="p-2 bg-indigo-50 rounded-xl"><img src={company.logo} className="h-8 w-auto" /></div>}
              <div>
                <h1 className="text-2xl font-black text-slate-800 tracking-tight">{company.name}</h1>
                <div className="bg-indigo-500 text-white text-[8px] font-black px-2 py-0.5 rounded-full inline-block uppercase tracking-widest mt-1">{company.subName || 'Verified Document'}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Serial Tracking</div>
              <div className="text-2xl font-black text-indigo-600 tracking-tighter">{invoice.serialNumber}</div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex justify-between items-start mb-10 border-l-8 border-slate-900 pl-8 py-2">
            <div className="space-y-3">
              {company.logo && <img src={company.logo} className={`h-14 w-auto ${isDark ? 'brightness-200' : ''}`} />}
              <div>
                <div className="text-3xl font-black tracking-tighter uppercase text-slate-900">{company.name}</div>
                <div className="text-[9px] font-bold text-blue-600 uppercase tracking-[0.2em]">{company.subName}</div>
              </div>
            </div>
            <div className="text-right">
              <h1 className="text-4xl font-black opacity-[0.05] leading-none uppercase -mb-4 mr-2">{titleText}</h1>
              <div className="text-2xl font-bold mt-2 text-slate-900 tracking-tight">{invoice.serialNumber}</div>
              <div className="mt-2 text-[9px] font-black text-slate-400 uppercase tracking-widest">Dated: {invoice.date}</div>
            </div>
          </div>
        );
    }
  };

  const renderBillTo = () => {
    switch (theme) {
      case 'modern-serif':
        return (
          <div className="grid grid-cols-2 gap-12 mb-10 items-start">
            <div className="space-y-3">
              <h3 className="text-[9px] font-bold text-blue-600 uppercase tracking-[0.4em]">Recipient Profile</h3>
              <div className="text-4xl font-light italic leading-[0.9] text-slate-800">{invoice.customer}</div>
              <div className="h-0.5 w-full bg-slate-900/5 mt-3"></div>
            </div>
            <div className="space-y-4 bg-slate-50 p-6 rounded-[1.5rem] border border-slate-100">
               <div className="flex justify-between gap-6">
                  <div className="flex-1">
                    <div className="text-[8px] font-black text-slate-400 uppercase mb-1 tracking-widest">Manifest Ref</div>
                    <div className="font-bold text-slate-900 truncate text-xs">{periodValue}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[8px] font-black text-red-400 uppercase mb-1 tracking-widest">Payment Deadline</div>
                    <div className="font-black text-red-600 text-xs">{invoice.dueDate}</div>
                  </div>
               </div>
            </div>
          </div>
        );
      case 'industrial':
        return (
          <div className="grid grid-cols-12 gap-0 mb-8 border-4 border-black">
            <div className="col-span-7 p-4 border-r-4 border-black">
              <div className="text-[9px] font-black underline mb-2">DESTINATION_ENTITY</div>
              <div className="text-3xl font-black leading-[0.8]">{invoice.customer}</div>
            </div>
            <div className="col-span-5 p-4 bg-yellow-400 flex flex-col justify-between">
              <div>
                <div className="text-[9px] font-black mb-0.5 opacity-60">LOG_REF_ID</div>
                <div className="text-[10px] font-black truncate">{periodValue}</div>
              </div>
              <div className="pt-2 border-t border-black/10">
                <div className="text-[9px] font-black opacity-60">DUE_THRESHOLD</div>
                <div className="text-lg font-black">{invoice.dueDate}</div>
              </div>
            </div>
          </div>
        );
      case 'ledger-pro':
        return (
          <div className="flex justify-between items-end mb-8 border-b border-slate-200 pb-8">
            <div className="max-w-md">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Account Consignee</div>
              <div className="text-4xl font-black text-slate-900 tracking-tighter leading-[0.8] uppercase">{invoice.customer}</div>
            </div>
            <div className="text-right space-y-3">
               <div>
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{periodLabel}</div>
                  <div className="text-xl font-black text-slate-900">{periodValue}</div>
               </div>
               <div className="bg-red-600 text-white px-3 py-1.5 text-[9px] font-black uppercase tracking-widest w-fit ml-auto">
                 Payable by {invoice.dueDate}
               </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex justify-between mb-8 items-center bg-slate-50 p-6 border border-slate-100 rounded-xl">
            <div>
              <div className="text-[9px] font-black text-slate-400 uppercase mb-1 tracking-widest">Bill To Account</div>
              <div className="text-3xl font-black text-slate-900 tracking-tight">{invoice.customer}</div>
            </div>
            <div className="text-right">
              <div className="text-[9px] font-black text-blue-600 uppercase mb-1 tracking-widest">{periodLabel}</div>
              <div className="text-lg font-bold text-slate-900">{periodValue}</div>
              <div className="text-[9px] font-black text-red-500 mt-1 uppercase bg-red-50 px-2 py-0.5 rounded inline-block">Due: {invoice.dueDate}</div>
            </div>
          </div>
        );
    }
  };

  const renderTable = () => {
    let theadClass = "bg-slate-50 border-y border-slate-200";
    let thClass = "px-2 py-3 text-left text-[9px] font-black uppercase tracking-widest text-slate-500";
    let tdClass = "px-2 py-3 border-b border-slate-100 text-[11px]";
    
    if (theme === 'ledger-pro') {
      theadClass = "bg-slate-900 text-white";
      thClass = "px-2 py-3 text-left font-black text-[10px] uppercase tracking-widest";
      tdClass = "px-2 py-4 border-b border-slate-100 text-[12px] font-bold text-slate-800";
    } else if (theme === 'industrial') {
      theadClass = "bg-black text-white";
      thClass = "px-2 py-2 text-left font-black text-[10px] tracking-tight";
      tdClass = "px-2 py-2 border-2 border-black text-sm font-black";
    } else if (theme === 'soft') {
      theadClass = "bg-indigo-50/50";
      thClass = "px-3 py-3 text-left font-black text-[9px] text-indigo-400 tracking-[0.2em]";
      tdClass = "px-3 py-4 border-b border-indigo-50/50 text-[12px] font-medium text-slate-600";
    }

    return (
      <div className="mb-8 flex-1 overflow-hidden">
        <table className="w-full border-collapse table-fixed">
          <thead className={theadClass}>
            <tr>
              <th className={`${thClass} w-[12%]`}>Date</th>
              <th className={`${thClass} w-[18%]`}>Unit</th>
              <th className={`${thClass} w-[20%]`}>Route</th>
              <th className={`${thClass} w-[18%]`}>Shipper</th>
              <th className={`${thClass} w-[15%]`}>Trucker</th>
              <th className={`${thClass} text-right w-[17%]`}>Rate</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, i) => (
              <tr key={i} className={`${theme === 'soft' ? 'hover:bg-indigo-50/30' : 'hover:bg-slate-50'} transition-colors`}>
                <td className={tdClass}>
                   <div className="font-bold opacity-60 truncate">{item.Date}</div>
                </td>
                <td className={tdClass}>
                  <div className="font-black text-slate-900 truncate">{item.UnitNumber}</div>
                </td>
                <td className={tdClass}>
                   <div className="flex items-center gap-1 overflow-hidden">
                      <span className="font-bold opacity-50 truncate">{item.PortGo}</span>
                      <span className="text-blue-500 text-[9px] font-black shrink-0">→</span>
                      <span className="font-bold text-slate-900 truncate">{item.PortGi}</span>
                   </div>
                </td>
                <td className={tdClass}>
                  <div className="uppercase font-bold text-slate-500 truncate">{item.Shipper || '-'}</div>
                </td>
                <td className={tdClass}>
                  <div className="uppercase font-bold text-slate-700 truncate">{item.Trucker || '-'}</div>
                </td>
                <td className={`${tdClass} text-right font-black text-slate-900`}>
                  {item.Rate.toLocaleString()} <span className="text-[9px] font-bold opacity-30">EGP</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderFooter = () => {
    const signatureStyle = {
      transform: `translate(${company.signatureXOffset}px, ${company.signatureYOffset}px) scale(${company.signatureScale})`,
      transformOrigin: 'bottom center'
    };

    const authAndSignature = (
      <div className="flex items-end gap-10">
        <div className={`flex flex-col justify-end border-l-4 pl-5 ${isDark ? 'border-blue-500' : 'border-slate-900'}`}>
          <div className="text-2xl font-black tracking-tight leading-none uppercase mb-1">{company.authName}</div>
          <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4">{company.authJobTitle}</div>
          
          <div className="space-y-1 text-[8px] font-bold text-slate-400 uppercase leading-none">
            <div className="flex items-center gap-2">
              <span className="min-w-[32px] opacity-40">LOC:</span>
              <span className="text-slate-600">{company.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="min-w-[32px] opacity-40">MAIL:</span>
              <span className="text-slate-600 lowercase">{company.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="min-w-[32px] opacity-40">MOB:</span>
              <span className="text-slate-600">{company.phone}</span>
            </div>
          </div>
        </div>

        <div className="flex items-end pb-1 translate-y-2">
          {company.signature && (
            <div className="relative" style={signatureStyle}>
              <img 
                src={company.signature} 
                className={`h-20 md:h-24 w-auto mix-blend-multiply opacity-90 object-contain grayscale brightness-50 ${isDark ? 'invert' : ''}`} 
                alt="Authorized Signature" 
              />
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-slate-900/10 rounded-full" />
            </div>
          )}
        </div>
      </div>
    );

    const settlementSection = (
      <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
         <h5 className="text-[9px] font-black uppercase text-blue-600 tracking-widest mb-2">Settlement Mandate</h5>
         <p className="text-[10.5px] leading-relaxed text-slate-500 font-medium">
            {settlementText}
         </p>
      </div>
    );

    const totalSection = (
      <div className="bg-slate-900 text-white p-6 rounded-[1.5rem] flex justify-between items-center w-full shadow-xl shadow-slate-900/10">
         <div>
            <div className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40 mb-0.5">Total Payable Balance</div>
            <div className="text-[10px] font-bold italic opacity-60">Egyptian Pounds (EGP)</div>
         </div>
         <div className="text-5xl font-black tabular-nums tracking-tighter">
            {invoice.total.toLocaleString()}
         </div>
      </div>
    );

    const taglineSection = (
      <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col items-center shrink-0">
        <div className={`font-black text-sm tracking-[0.3em] uppercase ${isDark ? 'text-slate-400' : 'text-slate-900'}`}>NILE FLEET GENSET</div>
        <div className="text-[8px] font-bold text-slate-400 tracking-[0.5em] uppercase mt-0.5 opacity-50">POWERED BY BEBITO SYSTEM</div>
      </div>
    );

    switch (theme) {
      case 'modern-serif':
        return (
          <div className="mt-auto pt-8 border-t border-slate-100 flex flex-col">
             <div className="mb-8">
                {totalSection}
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                <div className="space-y-6">
                   {settlementSection}
                   {authAndSignature}
                </div>
                <div className="text-right pb-2">
                   <div className="text-[9px] font-black opacity-30 uppercase tracking-[0.5em] rotate-180 [writing-mode:vertical-lr]">System Verified</div>
                </div>
             </div>
             {taglineSection}
          </div>
        );
      case 'industrial':
        return (
          <div className="mt-auto pt-6 flex flex-col">
             <div className="bg-black text-white p-4 mb-6 flex justify-between items-end border-b-[15px] border-yellow-400">
                <div className="text-2xl font-black leading-none uppercase">Total_Due_Payable</div>
                <div className="text-6xl font-black tracking-tighter leading-none">{invoice.total.toLocaleString()}</div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                <div className="space-y-3">
                  <div className="p-3 border-4 border-black font-black text-[9px]">
                    {settlementText}
                  </div>
                  {authAndSignature}
                </div>
                <div className="flex justify-end opacity-20 rotate-12 -translate-y-6">
                   <div className="border-[8px] border-black p-3 text-2xl font-black text-center uppercase leading-none">
                     Original<br/>Auth<br/>Nile Fleet
                   </div>
                </div>
             </div>
             {taglineSection}
          </div>
        );
      case 'ledger-pro':
        return (
          <div className="mt-auto pt-6 flex flex-col">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mb-8">
                <div className="flex flex-col justify-center">
                   {settlementSection}
                </div>
                <div className="bg-slate-900 text-white p-8 flex flex-col justify-center">
                   <div className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 mb-1">Net Clearing Amount</div>
                   <div className="text-5xl font-black tracking-tighter">{invoice.total.toLocaleString()} <span className="text-xs font-bold opacity-30">EGP</span></div>
                </div>
             </div>
             <div className="flex justify-between items-end border-t border-slate-100 pt-8">
                {authAndSignature}
                <div className="text-right text-[8px] font-black opacity-20 uppercase tracking-[1em] mb-1">Registry #NF9928</div>
             </div>
             {taglineSection}
          </div>
        );
      default:
        return (
          <div className="mt-auto pt-8 border-t-2 border-slate-100 flex flex-col">
             <div className="flex flex-col gap-8">
                <div className="flex justify-between items-center w-full bg-slate-50 p-6 rounded-2xl border border-slate-100">
                   <div>
                     <div className="text-[9px] font-black uppercase text-slate-400 mb-0.5">Total Due Amount</div>
                     <div className="text-4xl font-black text-slate-900 tracking-tighter">{invoice.total.toLocaleString()} EGP</div>
                   </div>
                   <div className="max-w-xs text-right">
                      {settlementSection}
                   </div>
                </div>
                <div className="flex justify-between items-end">
                   {authAndSignature}
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none rotate-12 scale-[1.2]">
          <img src={company.watermark} className={`w-[140mm] h-auto grayscale ${isDark ? 'invert' : ''}`} />
        </div>
      )}

      {renderHeader()}
      {renderBillTo()}
      <div className="flex-1 min-h-0 overflow-hidden">
        {renderTable()}
      </div>
      <div className="mt-auto shrink-0">
        {renderFooter()}
      </div>

      {/* Decorative Overlays */}
      {theme === 'grid' && (
        <div className="absolute inset-0 pointer-events-none opacity-[0.05]" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      )}
      
      {/* Authority Stamp */}
      {(theme === 'industrial' || theme === 'ledger-pro') && (
        <div className="absolute bottom-20 right-8 opacity-5 pointer-events-none rotate-[15deg]">
           <div className="border-[8px] border-black p-4 text-xl font-black text-center uppercase leading-none">
              System<br/>Verified<br/>Logistics
           </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceRenderer;