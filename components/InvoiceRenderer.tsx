
import React from 'react';
import { Invoice, InvoiceTheme, CompanyInfo, BookingRow } from '../types';

interface Props {
  invoice: Invoice;
  theme: InvoiceTheme;
  company: CompanyInfo;
}

const InvoiceRenderer: React.FC<Props> = ({ invoice, theme, company }) => {
  const getThemeBaseStyles = () => {
    switch (theme) {
      case 'dark': return "bg-white text-slate-900 font-sans";
      case 'elegant': return "bg-white text-slate-800 font-serif";
      case 'modern-serif': return "bg-white text-slate-900 font-serif";
      case 'ledger-pro': return "bg-white text-slate-900 font-sans";
      case 'industrial': return "bg-white text-slate-900 font-mono uppercase";
      case 'bold': return "bg-white text-slate-900 font-sans";
      case 'grid': return "bg-white text-slate-900 font-mono";
      default: return "bg-white text-slate-900 font-sans";
    }
  };

  const renderHeader = () => {
    const commonLogoName = (
      <div className="flex flex-col items-start gap-1">
        {company.logo && <img src={company.logo} className="h-32 w-auto mb-1 object-contain" />}
        <div className="text-3xl font-black tracking-tighter uppercase leading-none">{company.name}</div>
        <div className="text-[10px] font-semibold text-slate-400 tracking-[0.2em] uppercase">SHERIF HEGAZY</div>
      </div>
    );

    const titleText = invoice.isStatement ? 'STATEMENT OF ACCOUNT' : 'INVOICE';

    switch (theme) {
      case 'ledger-pro':
        return (
          <div className="flex justify-between items-start mb-8">
            <div className="space-y-2">
              {company.logo && <img src={company.logo} className="h-24 w-auto mb-2" />}
              <div className="border-l-4 border-slate-900 pl-4">
                <div className="text-4xl font-black tracking-tighter text-slate-900 uppercase leading-none">{company.name}</div>
                <div className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-[0.4em]">Logistics Solutions</div>
              </div>
            </div>
            <div className="text-right flex flex-col items-end">
              <h1 className="text-5xl font-black text-slate-100 tracking-tighter uppercase leading-none mb-2">{titleText}</h1>
              <div className="border-2 border-slate-900 p-3 inline-block">
                <div className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Doc No</div>
                <div className="text-xl font-black text-slate-900">{invoice.serialNumber}</div>
              </div>
              <div className="mt-2 text-xs font-bold bg-slate-100 px-3 py-0.5">Dated: {invoice.date}</div>
            </div>
          </div>
        );
      case 'modern-serif':
        return (
          <div className="flex justify-between items-center mb-8 border-b-2 border-slate-900 pb-4">
            <div className="flex flex-col gap-1">
              {company.logo && <img src={company.logo} className="h-24 w-auto" />}
              <div className="text-3xl font-bold tracking-tight text-slate-900">{company.name}</div>
            </div>
            <div className="text-right">
              <h1 className="text-3xl font-black tracking-tight mb-1 text-slate-900">{titleText}</h1>
              <div className="text-xs font-bold text-slate-500 uppercase">NO: <span className="text-slate-900">{invoice.serialNumber}</span></div>
              <div className="mt-2 text-[10px] font-bold">{invoice.date}</div>
            </div>
          </div>
        );
      case 'bold':
        return (
          <div className="flex justify-between items-start mb-8 border-b-4 border-blue-600 pb-4">
            {commonLogoName}
            <div className="text-right">
              <h1 className="font-black text-blue-600 mb-1 leading-none text-[40px]">{titleText}</h1>
              <div className="text-lg font-bold bg-blue-600 text-white px-3 py-0.5 inline-block">#{invoice.serialNumber}</div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex justify-between items-start mb-8 border-l-4 border-slate-900 pl-4">
            {commonLogoName}
            <div className="text-right">
              <h1 className="text-4xl font-black text-slate-200 uppercase leading-none mb-1">{titleText}</h1>
              <div className="text-lg font-bold text-slate-900">{invoice.serialNumber}</div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Dated: {invoice.date}</p>
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
          <div className="grid grid-cols-2 gap-0 mb-8 border-2 border-slate-900">
            <div className="p-4 border-r-2 border-slate-900">
              <h4 className="text-[9px] font-black uppercase text-slate-400 mb-2 tracking-[0.2em]">Bill To</h4>
              <p className="text-3xl font-black text-slate-900 leading-none mb-1 uppercase tracking-tighter">{invoice.customer}</p>
            </div>
            <div className="p-4 flex flex-col justify-between">
              <div>
                <h4 className="text-[9px] font-black uppercase text-slate-400 mb-1 tracking-[0.2em]">{periodLabel}</h4>
                <p className="text-xl font-black text-slate-900 uppercase tracking-tight">{periodValue}</p>
              </div>
            </div>
          </div>
        );
      case 'modern-serif':
        return (
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="border-l-2 border-slate-900 pl-4">
              <h4 className="text-[9px] font-black uppercase text-slate-400 mb-1">Bill To</h4>
              <p className="text-xl font-bold text-slate-900 uppercase">{invoice.customer}</p>
            </div>
            <div className="bg-slate-50 p-4 border border-slate-100">
               <h4 className="text-[9px] font-black uppercase text-slate-400 mb-1">{periodLabel}</h4>
               <p className="text-lg font-bold text-slate-900 uppercase">{periodValue}</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="mb-8 border-l-2 border-slate-200 pl-4 flex justify-between items-center">
            <div>
              <h4 className="text-[9px] font-black uppercase text-slate-400 mb-1">Billing To</h4>
              <p className="text-2xl font-black text-slate-900 tracking-tight">{invoice.customer}</p>
            </div>
            <div className="text-right border-r-4 border-slate-900 pr-3">
              <div className="text-[9px] font-black uppercase text-blue-600 mb-0.5">{periodLabel}</div>
              <div className="text-xl font-black text-slate-900 uppercase">{periodValue}</div>
            </div>
          </div>
        );
    }
  };

  const renderTable = () => {
    let containerClass = "mb-8 overflow-hidden";
    let tableClass = "w-full text-xs border-collapse";
    let theadClass = "bg-slate-100 text-[9px] font-black uppercase tracking-widest text-slate-500 border-y-2 border-slate-900";
    let thClass = "px-3 py-2 text-left";
    let tdClass = "px-3 py-3 border-b border-slate-100";
    let rateClass = "text-right font-black text-slate-900";

    if (theme === 'ledger-pro') {
      theadClass = "bg-white text-slate-900 text-[10px] font-black uppercase tracking-[0.1em] border-y-2 border-slate-900";
      tdClass = "px-3 py-2 border-2 border-slate-900 text-base font-bold text-slate-900"; 
      rateClass = "text-right font-black text-slate-900 text-xl";
      containerClass = "mb-6";
      thClass = "px-3 py-2 text-left border-x-2 border-slate-900";
    } else if (theme === 'bold') {
      theadClass = "bg-blue-600 text-white text-[10px] font-black uppercase";
      tdClass = "px-3 py-4 border-b-2 border-slate-900";
      rateClass = "text-right text-lg font-black bg-yellow-400 text-slate-900 px-1";
    }

    if (invoice.isStatement) {
      const groups = invoice.items.reduce((acc, item) => {
        const key = `${item.PortGo} to ${item.PortGi}`;
        if (!acc[key]) acc[key] = { items: [], total: 0 };
        acc[key].items.push(item);
        acc[key].total += item.Rate;
        return acc;
      }, {} as Record<string, { items: BookingRow[], total: number }>);

      return (
        <div className={containerClass}>
          <table className={tableClass}>
            <thead className={theadClass}>
              <tr>
                <th className={thClass}>Date</th>
                <th className={thClass}>Unit / Booking</th>
                <th className={thClass}>Route</th>
                <th className={thClass}>Shipper</th>
                <th className={thClass}>Trucker</th>
                <th className={`${thClass} text-right`}>Rate</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(groups).map(([routeKey, group]: [string, { items: BookingRow[], total: number }], gIdx) => (
                <React.Fragment key={routeKey}>
                  <tr className="bg-slate-50/50">
                    <td colSpan={6} className={`px-3 py-1 border-b-2 border-slate-900 text-[9px] font-black uppercase text-blue-600 bg-blue-50/30 ${theme === 'ledger-pro' ? 'border-x-2' : ''}`}>
                      Route: {routeKey}
                    </td>
                  </tr>
                  {group.items.map((item, i) => (
                    <tr key={`${routeKey}-${i}`}>
                      <td className={tdClass}><div className="text-[9px]">{item.Date}</div></td>
                      <td className={tdClass}>
                        <div className="font-black text-slate-900">{item.UnitNumber}</div>
                        <div className="text-[9px] font-bold text-blue-500 uppercase">{item.BookingNo}</div>
                      </td>
                      <td className={tdClass}>
                        <div className="flex items-center gap-1 font-bold text-[11px]">
                          <span>{item.PortGo}</span>
                          <span className="text-blue-500">→</span>
                          <span>{item.PortGi}</span>
                        </div>
                      </td>
                      <td className={tdClass}><div className="text-[11px] uppercase font-bold">{item.Shipper || '---'}</div></td>
                      <td className={tdClass}><div className="text-[11px] font-black uppercase text-blue-800">{item.Trucker || '---'}</div></td>
                      <td className={`${tdClass} ${rateClass}`}>
                        {item.Rate.toLocaleString()} <span className="text-[9px] opacity-40">EGP</span>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-slate-100/30">
                    <td colSpan={5} className={`px-3 py-1 text-right font-black uppercase text-[9px] tracking-widest text-slate-400 ${theme === 'ledger-pro' ? 'border-x-2' : ''}`}>
                      Subtotal:
                    </td>
                    <td className={`${rateClass} px-3 py-1 border-b-2 border-slate-900 bg-slate-100/50 ${theme === 'ledger-pro' ? 'border-x-2' : ''}`}>
                      {group.total.toLocaleString()}
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    return (
      <div className={containerClass}>
        <table className={tableClass}>
          <thead className={theadClass}>
            <tr>
              <th className={thClass}>Date</th>
              <th className={thClass}>Unit / Booking</th>
              <th className={thClass}>Route</th>
              <th className={thClass}>Shipper</th>
              <th className={thClass}>Trucker</th>
              <th className={`${thClass} text-right`}>Rate</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, i) => (
              <tr key={i}>
                <td className={tdClass}><div className="text-[9px]">{item.Date}</div></td>
                <td className={tdClass}>
                  <div className="font-black text-slate-900">{item.UnitNumber}</div>
                  <div className="text-[9px] font-bold text-blue-500 uppercase">{item.BookingNo}</div>
                </td>
                <td className={tdClass}>
                  <div className="flex items-center gap-1 font-bold text-[11px]">
                    <span>{item.PortGo}</span>
                    <span className="text-blue-500">→</span>
                    <span>{item.PortGi}</span>
                  </div>
                </td>
                <td className={tdClass}><div className="text-[11px] uppercase font-bold">{item.Shipper || '---'}</div></td>
                <td className={tdClass}><div className="text-[11px] font-black uppercase text-blue-800">{item.Trucker || '---'}</div></td>
                <td className={`${tdClass} ${rateClass}`}>
                  {item.Rate.toLocaleString()} <span className="text-[9px] opacity-40">EGP</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderFooter = () => {
    let totalBoxClass = "p-4 bg-slate-900 text-white rounded-xl w-64";
    let footerTaglineClass = "mt-auto pt-4 border-t flex flex-col items-center text-[8px] uppercase tracking-[0.4em] shrink-0";

    if (theme === 'ledger-pro') {
      totalBoxClass = "p-4 border-2 border-slate-900 text-slate-900 w-full flex justify-between items-center";
    } else if (theme === 'bold') {
      totalBoxClass = "p-6 bg-blue-600 text-white border-4 border-slate-900 w-80";
    }

    const totalSection = (
      <div className={`${totalBoxClass} shrink-0`}>
         {theme === 'ledger-pro' ? (
           <>
             <div className="text-left">
                <div className="text-[8px] font-black uppercase mb-0.5 text-slate-400">Net Total</div>
                <div className="text-3xl font-black">{invoice.total.toLocaleString()} EGP</div>
             </div>
             <div className="text-right">
                <div className="text-[8px] font-black uppercase mb-0.5 text-slate-400">Amount Due</div>
                <div className="text-5xl font-black tabular-nums">{invoice.total.toLocaleString()}</div>
             </div>
           </>
         ) : (
           <div className="flex flex-col items-end">
              <span className="text-[9px] font-black uppercase tracking-widest mb-0.5">Grand Total EGP</span>
              <span className="text-4xl font-black tabular-nums">{invoice.total.toLocaleString()}</span>
           </div>
         )}
      </div>
    );

    return (
      <div className="mt-auto flex flex-col gap-4">
        <div className={`p-4 ${theme === 'ledger-pro' ? 'border-2 border-slate-900' : 'bg-slate-50 border border-slate-100 rounded-xl'}`}>
          <h5 className="text-[9px] font-black uppercase text-blue-600 mb-1 border-b border-blue-100 pb-0.5 inline-block">Notes</h5>
          <p className="text-[9px] text-slate-600 leading-tight italic font-medium">
            Please settle by <span className="text-slate-900 font-black">{invoice.dueDate}</span>. Use Invoice No as reference.
          </p>
        </div>

        <div className={`flex flex-col ${theme === 'ledger-pro' ? 'gap-2' : 'flex-row justify-between items-end'}`}>
          {totalSection}

          <div className={`${theme === 'ledger-pro' ? 'pt-4 border-t-2 border-slate-900 mt-2' : ''} pb-2`}>
             <h4 className="text-[9px] font-black uppercase text-slate-400 mb-2 tracking-widest">Authorized By</h4>
             <div className="flex items-center gap-4">
               {company.signature && (
                 <img src={company.signature} className="h-16 w-auto grayscale mix-blend-multiply object-contain" alt="Signature" />
               )}
               <div className="space-y-0.5 border-l-2 border-blue-600 pl-2">
                 <p className="text-base font-black text-slate-900 uppercase leading-none">{company.authName}</p>
                 <p className="text-[8px] font-black text-slate-400 uppercase">{company.authJobTitle}</p>
               </div>
             </div>
          </div>
        </div>

        <div className={footerTaglineClass}>
          <div className="font-black text-slate-900 mb-0.5">NILE FLEET GENSET</div>
          <div className="opacity-40 font-bold text-[7px]">POWERED BY BEBITO</div>
        </div>
      </div>
    );
  };

  return (
    <div className={`invoice-container relative shadow-none transition-all duration-500 overflow-hidden ${getThemeBaseStyles()}`}>
      {/* Watermark */}
      {company.watermark && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none rotate-45 scale-125">
          <img src={company.watermark} className="w-[100mm] h-auto grayscale" />
        </div>
      )}

      {renderHeader()}
      {renderBillTo()}
      <div className="flex-1 overflow-hidden">
        {renderTable()}
      </div>
      {renderFooter()}

      {/* Decorative Stamp */}
      {(theme === 'industrial' || theme === 'classic' || theme === 'bold' || theme === 'ledger-pro') && (
        <div className="absolute top-12 right-24 border-2 border-red-500/10 rounded-full w-16 h-16 flex items-center justify-center -rotate-12 pointer-events-none">
           <div className="text-[6px] font-black text-red-500/10 text-center uppercase">
             ORIGINAL<br/>NILE FLEET
           </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceRenderer;
