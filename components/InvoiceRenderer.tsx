
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
        {company.logo && <img src={company.logo} className="h-40 w-auto mb-2 object-contain" />}
        <div className="text-4xl font-black tracking-tighter uppercase leading-none">{company.name}</div>
        <div className="text-sm font-semibold text-slate-400 tracking-[0.2em] uppercase">SHERIF HEGAZY</div>
      </div>
    );

    const titleText = invoice.isStatement ? 'STATEMENT OF ACCOUNT' : 'INVOICE';

    switch (theme) {
      case 'ledger-pro':
        return (
          <div className="flex justify-between items-start mb-16">
            <div className="space-y-4">
              {company.logo && <img src={company.logo} className="h-32 w-auto mb-4" />}
              <div className="border-l-8 border-slate-900 pl-6">
                <div className="text-5xl font-black tracking-tighter text-slate-900 uppercase leading-none">{company.name}</div>
                <div className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-[0.5em]">Global Logistics Solutions</div>
              </div>
            </div>
            <div className="text-right flex flex-col items-end">
              <h1 className="text-6xl font-black text-slate-100 tracking-tighter uppercase leading-none mb-4">{titleText}</h1>
              <div className="border-2 border-slate-900 p-4 inline-block">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Document No</div>
                <div className="text-2xl font-black text-slate-900">{invoice.serialNumber}</div>
              </div>
              <div className="mt-4 text-sm font-bold bg-slate-100 px-4 py-1">Dated: {invoice.date}</div>
            </div>
          </div>
        );
      case 'modern-serif':
        return (
          <div className="flex justify-between items-center mb-12 border-b-2 border-slate-900 pb-8">
            <div className="flex flex-col gap-2">
              {company.logo && <img src={company.logo} className="h-32 w-auto mb-2" />}
              <div className="text-4xl font-bold tracking-tight text-slate-900">{company.name}</div>
              <div className="text-[10px] tracking-[0.4em] text-slate-500 uppercase font-black">Professional Logistics Solutions</div>
            </div>
            <div className="text-right">
              <h1 className="text-4xl font-black tracking-tight mb-2 text-slate-900">{titleText}</h1>
              <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">NO: <span className="text-slate-900">{invoice.serialNumber}</span></div>
              <div className="mt-4 flex flex-col items-end gap-1">
                 <div className="text-[10px] font-black uppercase text-slate-400">Transaction Date</div>
                 <div className="text-sm font-bold">{invoice.date}</div>
              </div>
            </div>
          </div>
        );
      case 'bold':
        return (
          <div className="flex justify-between items-start mb-12 border-b-8 border-blue-600 pb-8">
            {commonLogoName}
            <div className="text-right">
              <h1 className="font-black text-blue-600 mb-2 leading-none text-[60px]">{titleText}</h1>
              <div className="text-xl font-bold bg-blue-600 text-white px-4 py-1 inline-block">#{invoice.serialNumber}</div>
              <div className="mt-4 text-sm font-bold uppercase tracking-widest text-slate-400">Date: {invoice.date}</div>
              <div className="mt-2 text-xs font-black bg-blue-100 text-blue-600 px-3 py-1 inline-block uppercase">DUE: {invoice.dueDate}</div>
            </div>
          </div>
        );
      case 'elegant':
        return (
          <div className="text-center space-y-6 mb-12 border-b border-amber-200 pb-10">
            <div className="flex flex-col items-center gap-2">
              {company.logo && <img src={company.logo} className="h-40 w-auto mb-2 grayscale" />}
              <div className="text-5xl font-light tracking-[0.2em] uppercase leading-none italic text-amber-900">{company.name}</div>
              <div className="text-xs tracking-[0.5em] text-amber-700 uppercase font-bold">SHERIF HEGAZY</div>
            </div>
            <div className="h-px w-24 bg-amber-200 mx-auto"></div>
            <h1 className="text-sm uppercase tracking-[0.6em] text-slate-400">{invoice.isStatement ? 'Statement Summary' : 'Commercial Document'}</h1>
            <div className="flex justify-between text-[10px] text-slate-400 uppercase tracking-widest px-10">
              <span>{company.address}</span>
              <span className="font-bold text-slate-800">{invoice.serialNumber}</span>
              <span>DUE: {invoice.dueDate}</span>
            </div>
          </div>
        );
      case 'industrial':
        return (
          <div className="mb-12 border-4 border-black p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="space-y-2">
                {company.logo && <img src={company.logo} className="h-32 w-auto grayscale contrast-125" />}
                <div className="text-3xl font-black leading-none">{company.name}</div>
                <div className="text-sm font-bold tracking-tighter border-y border-black inline-block py-0.5 px-2">SHERIF HEGAZY</div>
              </div>
              <div className="text-right border-l-4 border-black pl-6">
                <div className="text-xs font-bold mb-1">{invoice.isStatement ? 'STATEMENT_ID:' : 'SPEC_ID:'}</div>
                <div className="text-4xl font-black leading-none">{invoice.serialNumber}</div>
                <div className="bg-black text-white px-2 py-1 text-xs mt-4 inline-block font-mono uppercase">DUE: {invoice.dueDate}</div>
              </div>
            </div>
          </div>
        );
      case 'grid':
        return (
          <div className="grid grid-cols-3 border-2 border-slate-900 mb-12">
            <div className="col-span-2 p-6 border-r-2 border-slate-900">
               {commonLogoName}
            </div>
            <div className="p-6 bg-slate-50 flex flex-col justify-center text-right">
              <div className="text-[10px] font-bold text-slate-400 mb-1">REFERENCE NO:</div>
              <div className="text-2xl font-black">{invoice.serialNumber}</div>
              <div className="mt-4 text-[10px] font-bold text-slate-400 mb-1 uppercase text-red-600">PAYMENT DUE</div>
              <div className="text-lg font-black text-red-600 underline decoration-2">{invoice.dueDate}</div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex justify-between items-start mb-12 border-l-8 border-slate-900 pl-8">
            {commonLogoName}
            <div className="text-right">
              <h1 className="text-5xl font-black text-slate-200 uppercase leading-none mb-2">{titleText}</h1>
              <div className="text-xl font-bold text-slate-900">{invoice.serialNumber}</div>
              <p className="text-xs text-slate-500 mt-2 font-bold uppercase tracking-widest">Dated: {invoice.date}</p>
              <p className="text-sm font-black mt-2 bg-red-600 text-white px-3 py-0.5 inline-block uppercase">DUE: {invoice.dueDate}</p>
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
          <div className="grid grid-cols-2 gap-0 mb-16 border-2 border-slate-900">
            <div className="p-8 border-r-2 border-slate-900">
              <h4 className="text-[10px] font-black uppercase text-slate-400 mb-4 tracking-[0.3em]">Client / Bill To</h4>
              <p className="text-4xl font-black text-slate-900 leading-none mb-2 uppercase tracking-tighter">{invoice.customer}</p>
              <p className="text-sm font-medium text-slate-500">Logistics & Supply Chain Partner</p>
            </div>
            <div className="p-8 flex flex-col justify-between">
              <div>
                <h4 className="text-[10px] font-black uppercase text-slate-400 mb-2 tracking-[0.3em]">{periodLabel}</h4>
                <p className="text-2xl font-black text-slate-900 uppercase tracking-tight">{periodValue}</p>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-100 flex justify-between items-center">
                 <span className="text-xs font-bold text-slate-400 uppercase">Payment Due</span>
                 <span className="text-xl font-black text-red-600">{invoice.dueDate}</span>
              </div>
            </div>
          </div>
        );
      case 'modern-serif':
        return (
          <div className="grid grid-cols-2 gap-12 mb-12">
            <div className="border-l-4 border-slate-900 pl-6">
              <h4 className="text-[10px] font-black uppercase text-slate-400 mb-3 tracking-widest">Bill To</h4>
              <p className="text-2xl font-bold text-slate-900 uppercase leading-tight">{invoice.customer}</p>
              <p className="text-xs text-slate-400 mt-2">Valued Partner Account</p>
            </div>
            <div className="bg-slate-50 p-6 flex flex-col justify-center border border-slate-100">
               <h4 className="text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">{periodLabel}</h4>
               <p className="text-xl font-bold text-slate-900 uppercase tracking-tight">{periodValue}</p>
            </div>
          </div>
        );
      case 'bold':
        return (
          <div className="flex gap-10 mb-12">
            <div className="flex-1 border-4 border-slate-900 p-6">
              <h4 className="text-[10px] font-black uppercase text-blue-600 mb-2">Invoice Recipient</h4>
              <p className="text-3xl font-black tracking-tighter uppercase">{invoice.customer}</p>
            </div>
            <div className="w-80 border-4 border-slate-900 p-6 bg-slate-900 text-white">
              <h4 className="text-[10px] font-black uppercase text-blue-400 mb-2">{periodLabel}</h4>
              <p className="text-2xl font-black tracking-tighter text-yellow-400 leading-tight uppercase">{periodValue}</p>
            </div>
          </div>
        );
      case 'elegant':
        return (
          <div className="grid grid-cols-2 gap-20 mb-12 py-6 border-b border-amber-100 italic">
            <div>
              <h4 className="text-[10px] uppercase tracking-widest text-amber-700 mb-4 not-italic font-bold">Bill To Address</h4>
              <p className="text-2xl font-light text-slate-900 leading-none mb-1">{invoice.customer}</p>
              <p className="text-xs text-slate-400">Verified Client Account</p>
            </div>
            <div className="text-right">
              <h4 className="text-[10px] uppercase tracking-widest text-amber-700 mb-4 not-italic font-bold">{periodLabel}</h4>
              <p className="text-2xl font-black tracking-widest text-amber-900 border-b-2 border-amber-900 inline-block px-4 py-1 uppercase">{periodValue}</p>
            </div>
          </div>
        );
      case 'industrial':
        return (
          <div className="grid grid-cols-3 gap-0 mb-12 border-2 border-black divide-x-2 divide-black">
             <div className="p-4 bg-black text-white">
                <h4 className="text-[10px] font-black mb-2">RECIPIENT_NAME</h4>
                <p className="text-xl font-black truncate">{invoice.customer}</p>
             </div>
             <div className="p-4 col-span-2 flex flex-col justify-center">
                <h4 className="text-[10px] font-black mb-1 uppercase">{periodLabel}</h4>
                <p className="text-3xl font-black tracking-tighter bg-yellow-200 px-2 inline-block self-start uppercase">{periodValue}</p>
             </div>
          </div>
        );
      case 'grid':
        return (
          <div className="grid grid-cols-4 gap-0 mb-12 border-2 border-slate-900 divide-x-2 border-b-0">
            <div className="p-4 bg-slate-100 flex items-center">
               <div className="text-[10px] font-bold text-slate-500 uppercase">Bill To:</div>
            </div>
            <div className="col-span-3 p-4 flex justify-between items-center">
               <div>
                  <div className="text-2xl font-black uppercase">{invoice.customer}</div>
               </div>
               <div className="text-right border-l-2 border-slate-900 pl-6">
                  <div className="text-[8px] font-bold text-slate-400 uppercase">{periodLabel}</div>
                  <div className="text-xl font-black text-slate-900 uppercase">{periodValue}</div>
               </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="mb-12 border-l-4 border-slate-200 pl-6 flex justify-between items-start">
            <div>
              <h4 className="text-[10px] font-black uppercase text-slate-400 mb-2">Billing Information</h4>
              <p className="text-3xl font-black text-slate-900 tracking-tight">{invoice.customer}</p>
            </div>
            <div className="text-right border-r-8 border-slate-900 pr-4">
              <div className="text-[10px] font-black uppercase text-blue-600 mb-1">{periodLabel}</div>
              <div className="text-2xl font-black tracking-tighter text-slate-900 uppercase">{periodValue}</div>
            </div>
          </div>
        );
    }
  };

  const renderTable = () => {
    let containerClass = "mb-12 overflow-hidden";
    let tableClass = "w-full text-sm border-collapse";
    let theadClass = "bg-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-500 border-y-2 border-slate-900";
    let thClass = "px-4 py-4 text-left";
    let tdClass = "px-4 py-5 border-b border-slate-100";
    let rateClass = "text-right font-black text-slate-900";

    if (theme === 'bold') {
      theadClass = "bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest";
      tdClass = "px-4 py-6 border-b-4 border-slate-900";
      rateClass = "text-right text-xl font-black bg-yellow-400 text-slate-900 px-2";
    } else if (theme === 'ledger-pro') {
      theadClass = "bg-white text-slate-900 text-[11px] font-black uppercase tracking-[0.2em] border-y-2 border-slate-900";
      tdClass = "px-4 py-5 border-2 border-slate-900 text-lg font-bold text-slate-900"; // BIGGER TEXT
      rateClass = "text-right font-black text-slate-900 text-2xl";
      containerClass = "mb-12";
      thClass = "px-4 py-3 text-left border-x-2 border-slate-900";
    } else if (theme === 'modern-serif') {
      theadClass = "bg-slate-900 text-white text-[10px] font-bold uppercase tracking-[0.2em]";
      tdClass = "px-4 py-4 border-b border-slate-200 font-medium";
    } else if (theme === 'elegant') {
      theadClass = "bg-white text-amber-700 font-bold uppercase text-[9px] tracking-[0.3em] border-y-2 border-amber-100";
      tdClass = "px-4 py-6 italic border-b border-amber-50";
      rateClass = "text-right text-slate-800 font-normal tracking-widest";
    } else if (theme === 'industrial') {
      theadClass = "bg-black text-white text-[10px] font-black border-2 border-black";
      tdClass = "px-4 py-3 border-2 border-black font-black";
      thClass = "px-4 py-2 text-left";
    } else if (theme === 'grid') {
      theadClass = "bg-slate-900 text-white text-[10px] font-bold";
      tdClass = "px-4 py-4 border-2 border-slate-900 font-bold";
      containerClass = "mb-12 border-collapse";
    } else if (theme === 'soft') {
      theadClass = "bg-teal-500 text-white text-[10px] font-bold uppercase rounded-t-xl";
      tdClass = "px-4 py-4 bg-white border-b border-teal-50 text-slate-600";
      containerClass = "mb-12 rounded-2xl overflow-hidden border-2 border-teal-50";
    }

    if (invoice.isStatement) {
      // Group items by route
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
                <th className={thClass}>Route / Transit</th>
                <th className={thClass}>Shipper</th>
                <th className={thClass}>Trucker</th>
                <th className={`${thClass} text-right`}>Rate</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(groups).map(([routeKey, group]: [string, { items: BookingRow[], total: number }], gIdx) => (
                <React.Fragment key={routeKey}>
                  <tr className="bg-slate-50/50">
                    <td colSpan={6} className={`px-4 py-2 border-b-2 border-slate-900 text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50/30 ${theme === 'ledger-pro' ? 'border-x-2' : ''}`}>
                      Route: {routeKey}
                    </td>
                  </tr>
                  {group.items.map((item, i) => (
                    <tr key={`${routeKey}-${i}`}>
                      <td className={tdClass}>
                        <div className="font-bold text-[10px] text-slate-400">{item.Date}</div>
                      </td>
                      <td className={tdClass}>
                        <div className="font-black text-slate-900">{item.UnitNumber}</div>
                        <div className="text-[11px] font-bold text-blue-500 uppercase">{item.BookingNo}</div>
                      </td>
                      <td className={tdClass}>
                        <div className="flex items-center gap-2 font-bold text-sm">
                          <span className="opacity-40">{item.PortGo}</span>
                          <span className="text-blue-500">→</span>
                          <span className="opacity-40">{item.PortGi}</span>
                        </div>
                      </td>
                      <td className={tdClass}>
                        <div className="opacity-70 text-sm uppercase font-bold">{item.Shipper || '---'}</div>
                      </td>
                      <td className={tdClass}>
                        <div className="opacity-70 text-sm font-black uppercase text-blue-800">{item.Trucker || '---'}</div>
                      </td>
                      <td className={`${tdClass} ${rateClass}`}>
                        {item.Rate.toLocaleString()} <span className="text-[10px] opacity-40">EGP</span>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-slate-100/30">
                    <td colSpan={5} className={`px-4 py-3 text-right font-black uppercase text-[10px] tracking-widest text-slate-400 ${theme === 'ledger-pro' ? 'border-x-2' : ''}`}>
                      Subtotal for {routeKey}:
                    </td>
                    <td className={`${rateClass} px-4 py-3 border-b-4 border-slate-900 bg-slate-100/50 ${theme === 'ledger-pro' ? 'border-x-2' : ''}`}>
                      {group.total.toLocaleString()} <span className="text-[10px] opacity-40">EGP</span>
                    </td>
                  </tr>
                  <tr className="h-4"><td colSpan={6}></td></tr>
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
              <tr key={i} className={theme === 'soft' && i % 2 === 0 ? 'bg-teal-50/20' : ''}>
                <td className={tdClass}>
                  <div className="font-bold text-[10px] text-slate-400">{item.Date}</div>
                </td>
                <td className={tdClass}>
                  <div className="font-black text-slate-900">{item.UnitNumber}</div>
                  <div className="text-[11px] font-bold text-blue-500 uppercase">{item.BookingNo}</div>
                </td>
                <td className={tdClass}>
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <span className="opacity-40">{item.PortGo}</span>
                    <span className="text-blue-500">→</span>
                    <span className="opacity-40">{item.PortGi}</span>
                  </div>
                </td>
                <td className={tdClass}>
                  <div className="opacity-70 text-sm uppercase font-bold">{item.Shipper || '---'}</div>
                </td>
                <td className={tdClass}>
                  <div className="opacity-70 text-sm font-black uppercase text-blue-800">{item.Trucker || '---'}</div>
                </td>
                <td className={`${tdClass} ${rateClass}`}>
                  {item.Rate.toLocaleString()} <span className="text-[10px] opacity-40">EGP</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderFooter = () => {
    let totalBoxClass = "p-8 bg-slate-900 text-white rounded-2xl w-80";
    let footerTaglineClass = "mt-20 pt-10 border-t flex flex-col items-center text-[10px] uppercase tracking-[0.4em]";

    if (theme === 'bold') {
      totalBoxClass = "p-10 bg-blue-600 text-white border-8 border-slate-900 w-96";
    } else if (theme === 'ledger-pro') {
      totalBoxClass = "p-10 border-4 border-slate-900 text-slate-900 w-full flex justify-between items-center";
    } else if (theme === 'modern-serif') {
      totalBoxClass = "p-8 bg-slate-900 text-white w-80 border-l-8 border-slate-400";
    } else if (theme === 'elegant') {
      totalBoxClass = "p-8 border-2 border-amber-200 text-amber-900 w-80 text-center italic";
    } else if (theme === 'industrial') {
      totalBoxClass = "p-4 border-4 border-black bg-white text-black w-80 flex flex-col items-end";
    } else if (theme === 'soft') {
      totalBoxClass = "p-8 bg-teal-600 text-white rounded-[2rem] w-80 shadow-xl shadow-teal-100";
    }

    const totalSection = (
      <div className={`${totalBoxClass} shrink-0`}>
         {theme === 'ledger-pro' ? (
           <>
             <div className="text-left">
                <div className="text-[10px] font-black uppercase tracking-[0.4em] mb-1 text-slate-400">Total Net Value</div>
                <div className="text-4xl font-black">{invoice.total.toLocaleString()} EGP</div>
             </div>
             <div className="text-right">
                <div className="text-[10px] font-black uppercase tracking-[0.4em] mb-1 text-slate-400">Amount to Settle</div>
                <div className="text-7xl font-black tabular-nums tracking-tighter">{invoice.total.toLocaleString()}</div>
             </div>
           </>
         ) : (
           <>
             <div className="flex justify-between items-center mb-2 uppercase tracking-[0.2em] font-bold text-[10px] opacity-60">
                <span>{invoice.isStatement ? 'Net Total Amount' : 'Subtotal Net'}</span>
                <span>{invoice.total.toLocaleString()}</span>
             </div>
             <div className="h-px bg-white/20 my-4"></div>
             <div className="flex flex-col items-end">
                <span className="text-[11px] font-black uppercase tracking-[0.4em] mb-1">Grand Total EGP</span>
                <span className="text-6xl font-black tabular-nums tracking-tighter">{invoice.total.toLocaleString()}</span>
             </div>
           </>
         )}
      </div>
    );

    return (
      <div className="mt-auto flex flex-col">
        {/* 1. Settlement Note */}
        <div className={`mb-12 p-8 ${theme === 'ledger-pro' ? 'border-2 border-slate-900 rounded-none' : 'bg-slate-50 border-2 border-slate-100 rounded-2xl'}`}>
          <h5 className={`text-[11px] font-black uppercase text-blue-600 mb-4 tracking-widest border-b border-blue-100 pb-2 inline-block`}>Settlement Note</h5>
          <p className="text-[11px] text-slate-600 leading-relaxed font-semibold italic">
            Thank you for your business! We kindly request full settlement by <span className="text-slate-900 font-black underline decoration-blue-500 decoration-2 underline-offset-4">{invoice.dueDate}</span>. 
            For smooth processing, please include the invoice number in your payment reference. We value your feedback, so please review these details within one week of receipt; after this time, the invoice will be considered final and approved. We appreciate your cooperation.
          </p>
        </div>

        {/* 2. Rate and Authorization */}
        <div className={`flex flex-col ${theme === 'ledger-pro' ? 'gap-4' : 'md:flex-row justify-between items-end gap-12 pt-8 border-t border-slate-100'}`}>
          
          {totalSection}

          <div className={`${theme === 'ledger-pro' ? 'pt-8 border-t-2 border-slate-900 mt-8' : ''} max-w-xl pb-4`}>
             <h4 className="text-[10px] font-black uppercase text-slate-400 mb-4 tracking-widest">Authorized Endorsement</h4>
             <div className="flex items-center gap-6">
               {company.signature && (
                 <img src={company.signature} className="h-32 w-auto grayscale mix-blend-multiply object-contain border-r border-slate-100 pr-6" alt="Signature" />
               )}
               <div className="space-y-1 border-l-4 border-blue-600 pl-4">
                 <p className="text-2xl font-black text-slate-900 uppercase tracking-tight leading-none">{company.authName}</p>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{company.authJobTitle}</p>
                 <div className="pt-2 text-[10px] font-medium text-slate-400 space-y-0.5">
                    <p>{company.authPhone}</p>
                    <p>{company.authEmail}</p>
                 </div>
               </div>
             </div>
          </div>
        </div>

        {/* Branding Footer Tagline */}
        <div className={footerTaglineClass}>
          <div className="font-black text-slate-900 mb-1">NILE FLEET GENSET</div>
          <div className="opacity-40 font-bold text-[8px]">POWERED BY BEBITO</div>
        </div>
      </div>
    );
  };

  return (
    <div className={`invoice-container relative shadow-2xl overflow-hidden transition-all duration-500 ${getThemeBaseStyles()}`}>
      {/* Watermark */}
      {company.watermark && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none rotate-45 scale-150">
          <img src={company.watermark} className="w-[120mm] h-auto grayscale" />
        </div>
      )}

      {renderHeader()}
      {renderBillTo()}
      {renderTable()}
      {renderFooter()}

      {/* Decorative Stamp */}
      {(theme === 'industrial' || theme === 'classic' || theme === 'bold' || theme === 'ledger-pro') && (
        <div className="absolute top-24 right-48 border-4 border-red-500/20 rounded-full w-24 h-24 flex items-center justify-center -rotate-12 pointer-events-none">
           <div className="text-[8px] font-black text-red-500/20 text-center uppercase tracking-widest">
             ORIGINAL<br/>DOCUMENT<br/>NILE FLEET
           </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceRenderer;
