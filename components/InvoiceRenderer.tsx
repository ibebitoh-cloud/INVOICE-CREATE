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
      case 'blueprint': return "bg-[#002b5c] text-[#a5c9ff] font-mono p-10";
      case 'retro': return "bg-[#f4ecd8] text-[#433422] font-['Special_Elite'] p-12";
      case 'minimalist-bold': return "bg-white text-black font-sans p-12";
      case 'executive': return "bg-[#fcfcfc] text-[#1a1a1a] font-['Outfit'] p-12";
      case 'brutalist': return "bg-white text-black font-sans p-10 border-[12px] border-black";
      case 'luxury': return "bg-[#0a0a0a] text-[#c5a059] font-serif p-12 border-t-[20px] border-[#c5a059]";
      case 'luxury-white': return "bg-white text-slate-900 font-serif p-12 border-t-[20px] border-[#c5a059]";
      case 'tech': return "bg-[#050505] text-[#00ff41] font-mono p-10 border-2 border-[#00ff41]/30";
      case 'editorial': return "bg-white text-slate-900 font-serif p-12";
      case 'organic': return "bg-[#fdfbf7] text-[#2d3a30] font-sans p-10 rounded-[3rem]";
      case 'atmospheric': return "bg-slate-900 text-white font-sans p-10";
      case 'clean-utility': return "bg-[#f8f9fa] text-slate-800 font-sans p-8 border border-slate-200";
      case 'oversized': return "bg-white text-slate-900 font-sans p-10";
      case 'bold-color': return "bg-[#ff4e00] text-white font-serif p-10";
      case 'split-layout': return "bg-white text-slate-900 font-sans p-0";
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
      case 'minimal':
        return (
          <div className="flex justify-between items-start mb-12">
            <div>
              {company.logo && <img src={company.logo} className="h-10 w-auto mb-4 grayscale" />}
              <div className="text-2xl font-bold tracking-tight text-slate-900">{company.name}</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-widest">{company.subName}</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Invoice</div>
              <div className="text-xl font-medium text-slate-900">{invoice.serialNumber}</div>
              <div className="text-xs text-slate-400 mt-1">{invoice.date}</div>
            </div>
          </div>
        );
      case 'corporate':
        return (
          <div className="flex justify-between items-start mb-12">
            <div className="flex items-start gap-6">
              {company.logo && <img src={company.logo} className="h-12 w-auto" />}
              <div>
                <div className="text-3xl font-bold text-blue-900 tracking-tight uppercase">{company.name}</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{company.subName}</div>
              </div>
            </div>
            <div className="text-right border-l-2 border-blue-800 pl-8">
              <div className="text-xs font-bold text-blue-800 uppercase tracking-widest mb-1">{titleText}</div>
              <div className="text-2xl font-bold text-slate-900">{invoice.serialNumber}</div>
              <div className="text-xs text-slate-400 mt-1">{invoice.date}</div>
            </div>
          </div>
        );
      case 'elegant':
        return (
          <div className="flex flex-col items-center mb-16 border-b border-[#2d241e]/10 pb-12 text-center">
            {company.logo && <img src={company.logo} className="h-14 w-auto mb-6 opacity-80" />}
            <div className="text-4xl font-light tracking-[0.15em] uppercase text-[#2d241e] mb-2">{company.name}</div>
            <div className="text-[10px] font-medium tracking-[0.4em] uppercase text-[#2d241e]/50 mb-10">{company.subName}</div>
            <div className="w-full flex justify-between items-end text-left">
              <div className="text-xs italic text-[#2d241e]/60">Ref: {invoice.serialNumber}</div>
              <div className="text-3xl font-light italic tracking-widest uppercase text-center flex-1">{titleText}</div>
              <div className="text-xs italic text-[#2d241e]/60 text-right">Date: {invoice.date}</div>
            </div>
          </div>
        );
      case 'bold':
        return (
          <div className="flex justify-between items-end mb-12 border-b-4 border-black pb-6">
            <div>
              {company.logo && <img src={company.logo} className="h-14 w-auto mb-4 grayscale" />}
              <div className="text-5xl font-black tracking-tighter uppercase leading-none">{company.name}</div>
              <div className="text-xs font-black uppercase tracking-[0.3em] mt-2">{company.subName}</div>
            </div>
            <div className="text-right">
              <div className="text-xs font-black uppercase tracking-widest mb-1">Invoice No.</div>
              <div className="text-4xl font-black tracking-tighter">{invoice.serialNumber}</div>
              <div className="text-xs font-black mt-1">{invoice.date}</div>
            </div>
          </div>
        );
      case 'dark':
        return (
          <div className="flex justify-between items-start mb-12 border-b border-slate-700 pb-10">
            <div className="flex items-start gap-6">
              {company.logo && <img src={company.logo} className="h-12 w-auto brightness-200" />}
              <div>
                <div className="text-3xl font-black tracking-tight text-white uppercase">{company.name}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-1">{company.subName}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">{titleText}</div>
              <div className="text-2xl font-bold text-white tracking-tighter">{invoice.serialNumber}</div>
              <div className="text-xs text-slate-500 mt-2">{invoice.date}</div>
            </div>
          </div>
        );
      case 'grid':
        return (
          <div className="grid grid-cols-2 border-2 border-slate-200 mb-12">
            <div className="p-8 border-r-2 border-slate-200 flex flex-col justify-center">
              {company.logo && <img src={company.logo} className="h-10 w-auto mb-4 grayscale" />}
              <div className="text-2xl font-bold tracking-tight uppercase text-slate-900">{company.name}</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{company.subName}</div>
            </div>
            <div className="p-8 flex flex-col justify-center items-end bg-slate-50">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Document Ref</div>
              <div className="text-3xl font-bold tracking-tighter text-slate-900">{invoice.serialNumber}</div>
              <div className="text-xs text-slate-400 mt-2 font-bold">{invoice.date}</div>
            </div>
          </div>
        );
      case 'classic':
        return (
          <div className="flex flex-col items-center mb-12 border-b-2 border-slate-200 pb-10 text-center">
            {company.logo && <img src={company.logo} className="h-16 w-auto mb-6 grayscale" />}
            <div className="text-4xl font-serif font-bold uppercase mb-2 tracking-tight text-slate-900">{company.name}</div>
            <div className="text-xs font-serif italic text-slate-600 mb-8">{company.subName}</div>
            <div className="w-full flex justify-between items-baseline px-4">
              <div className="text-sm font-serif text-slate-700 text-left">Invoice No: <span className="font-bold text-slate-900">{invoice.serialNumber}</span></div>
              <h1 className="text-2xl font-serif font-bold uppercase tracking-widest text-slate-900 text-center flex-1">{titleText}</h1>
              <div className="text-sm font-serif text-slate-700 text-right">Date: <span className="font-bold text-slate-900">{invoice.date}</span></div>
            </div>
          </div>
        );
      case 'compact':
        return (
          <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-6">
            <div className="flex items-center gap-4">
              {company.logo && <img src={company.logo} className="h-8 w-auto grayscale" />}
              <div>
                <div className="text-lg font-bold tracking-tight text-slate-900">{company.name}</div>
                <div className="text-[8px] text-slate-400 uppercase tracking-widest">{company.subName}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[8px] font-bold uppercase text-slate-400 mb-0.5">Ref: {invoice.serialNumber}</div>
              <div className="text-xs font-bold text-slate-900">{invoice.date}</div>
            </div>
          </div>
        );
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
              {company.logo && <img src={company.logo} className="h-10 w-auto mb-3 grayscale" />}
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
            <div className="flex items-center gap-6 border-l-4 border-blue-500 pl-6">
              {company.logo && <img src={company.logo} className="h-12 w-auto brightness-200" />}
              <div className="flex flex-col justify-between h-full">
                <div className="text-3xl font-black tracking-tighter uppercase">{company.name}</div>
                <div className="text-[9px] font-bold tracking-[0.2em] opacity-40 uppercase">{company.subName || 'Executive Operations Division'}</div>
              </div>
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
      case 'blueprint':
        return (
          <div className="flex justify-between items-start mb-10 border-b-2 border-[#a5c9ff] pb-8">
            <div className="space-y-4">
              {company.logo && <img src={company.logo} className="h-10 w-auto brightness-200 opacity-80" />}
              <div className="space-y-2">
                <div className="text-4xl font-bold tracking-tighter uppercase">{company.name}</div>
                <div className="text-[10px] font-bold tracking-[0.3em] opacity-60">{company.subName}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-bold opacity-40 mb-1 uppercase tracking-[0.2em]">DWG_REF_NO</div>
              <div className="text-3xl font-bold tracking-tighter">{invoice.serialNumber}</div>
            </div>
          </div>
        );
      case 'retro':
        return (
          <div className="flex flex-col items-center mb-12 border-b-2 border-[#433422]/20 pb-8 text-center">
            {company.logo && <img src={company.logo} className="h-12 w-auto mb-6 grayscale opacity-80" />}
            <div className="text-4xl font-bold uppercase mb-2 tracking-widest">{company.name}</div>
            <div className="text-xs font-bold opacity-60 mb-6">{company.subName}</div>
            <div className="flex justify-between w-full text-left">
              <div>
                <div className="text-[10px] font-bold uppercase mb-1">Document #</div>
                <div className="text-xl font-bold">{invoice.serialNumber}</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-bold uppercase mb-1">Date Issued</div>
                <div className="text-xl font-bold">{invoice.date}</div>
              </div>
            </div>
          </div>
        );
      case 'minimalist-bold':
        return (
          <div className="flex justify-between items-end mb-16">
            <div>
              {company.logo && <img src={company.logo} className="h-16 w-auto mb-8 grayscale" />}
              <div className="text-6xl font-black leading-none tracking-tighter mb-2">{company.name}</div>
              <div className="text-xs font-black uppercase tracking-[0.5em] text-slate-400">{company.subName}</div>
            </div>
            <div className="text-right">
              <div className="text-xs font-black uppercase tracking-widest mb-1">Invoice</div>
              <div className="text-4xl font-black tracking-tighter">{invoice.serialNumber}</div>
            </div>
          </div>
        );
      case 'executive':
        return (
          <div className="flex justify-between items-center mb-12 bg-[#1a1a1a] text-white -mx-12 -mt-12 p-12">
            <div className="flex items-center gap-8">
              {company.logo && <img src={company.logo} className="h-12 w-auto brightness-200" />}
              <div>
                <div className="text-4xl font-black tracking-tight mb-1 uppercase">{company.name}</div>
                <div className="text-[10px] font-bold tracking-[0.4em] text-amber-400 uppercase">{company.subName}</div>
              </div>
            </div>
            <div className="text-right border-l border-white/10 pl-12">
              <div className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em] mb-2">Registry ID</div>
              <div className="text-3xl font-light tracking-tighter text-amber-400">{invoice.serialNumber}</div>
            </div>
          </div>
        );
      case 'brutalist':
        return (
          <div className="flex flex-col mb-12">
            <div className="flex items-start justify-between mb-4">
              <div className="text-8xl font-black leading-[0.8] tracking-tighter uppercase">{company.name}</div>
              {company.logo && <img src={company.logo} className="h-20 w-auto grayscale border-4 border-black" />}
            </div>
            <div className="bg-black text-white p-2 text-xs font-black uppercase tracking-[0.3em] w-fit mb-8">{company.subName}</div>
            <div className="flex justify-between items-end border-b-[8px] border-black pb-4">
              <div className="text-4xl font-black italic tracking-tighter">{titleText}</div>
              <div className="text-2xl font-black tracking-tighter">#{invoice.serialNumber}</div>
            </div>
          </div>
        );
      case 'luxury':
        return (
          <div className="flex flex-col items-center mb-16 text-center">
            {company.logo && <img src={company.logo} className="h-16 w-auto mb-6 brightness-150" />}
            <h1 className="text-5xl font-light tracking-[0.2em] uppercase mb-2 text-[#c5a059]">{company.name}</h1>
            <div className="text-[10px] font-bold tracking-[0.5em] uppercase text-[#c5a059]/60 mb-12">{company.subName}</div>
            <div className="w-full flex justify-between items-center border-y border-[#c5a059]/30 py-6">
              <div className="text-xs font-bold uppercase tracking-[0.3em] text-[#c5a059]/40">Ref: {invoice.serialNumber}</div>
              <div className="text-2xl font-light italic tracking-widest uppercase">{titleText}</div>
              <div className="text-xs font-bold uppercase tracking-[0.3em] text-[#c5a059]/40">Date: {invoice.date}</div>
            </div>
          </div>
        );
      case 'luxury-white':
        return (
          <div className="flex flex-col items-center mb-16 text-center">
            {company.logo && <img src={company.logo} className="h-16 w-auto mb-6" />}
            <h1 className="text-5xl font-light tracking-[0.2em] uppercase mb-2 text-[#c5a059]">{company.name}</h1>
            <div className="text-[10px] font-bold tracking-[0.5em] uppercase text-[#c5a059]/60 mb-12">{company.subName}</div>
            <div className="w-full flex justify-between items-center border-y border-[#c5a059]/30 py-6">
              <div className="text-xs font-bold uppercase tracking-[0.3em] text-[#c5a059]/40">Ref: {invoice.serialNumber}</div>
              <div className="text-2xl font-light italic tracking-widest uppercase text-slate-900">{titleText}</div>
              <div className="text-xs font-bold uppercase tracking-[0.3em] text-[#c5a059]/40">Date: {invoice.date}</div>
            </div>
          </div>
        );
      case 'tech':
        return (
          <div className="mb-12 border-b border-[#00ff41]/20 pb-8">
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-start gap-6">
                {company.logo && <img src={company.logo} className="h-10 w-auto brightness-150 grayscale" />}
                <div>
                  <div className="text-3xl font-bold tracking-tighter mb-1">[ {company.name} ]</div>
                  <div className="text-[10px] opacity-60 uppercase tracking-widest">{company.subName}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] opacity-40 uppercase mb-1">SYSTEM_STATUS: OK</div>
                <div className="text-[10px] opacity-40 uppercase">TERMINAL: {invoice.serialNumber}</div>
              </div>
            </div>
            <div className="bg-[#00ff41]/5 p-4 border-l-4 border-[#00ff41]">
              <div className="text-xl font-bold tracking-widest uppercase">{titleText} // {invoice.date}</div>
            </div>
          </div>
        );
      case 'editorial':
        return (
          <div className="flex flex-col mb-16">
            <div className="flex justify-between items-baseline border-b-2 border-slate-900 pb-4 mb-4">
              <div className="flex items-baseline gap-6">
                {company.logo && <img src={company.logo} className="h-10 w-auto grayscale" />}
                <h1 className="text-7xl font-black tracking-tighter leading-none">{company.name}</h1>
              </div>
              <div className="text-sm font-bold uppercase tracking-widest italic">{company.subName}</div>
            </div>
            <div className="flex justify-between items-end">
              <div className="text-xs font-bold uppercase tracking-[0.4em] text-slate-400">Issue No. {invoice.serialNumber}</div>
              <div className="text-4xl font-light italic tracking-tighter">{invoice.date}</div>
            </div>
          </div>
        );
      case 'organic':
        return (
          <div className="flex justify-between items-center mb-12 bg-white rounded-[2.5rem] p-10 shadow-sm border border-[#e8ece9]">
            <div className="flex items-center gap-8">
              {company.logo && <div className="p-4 bg-[#f4f7f5] rounded-full"><img src={company.logo} className="h-10 w-auto" /></div>}
              <div>
                <h1 className="text-3xl font-bold text-[#2d3a30] tracking-tight">{company.name}</h1>
                <div className="text-xs font-medium text-[#7a8c7e] mt-1">{company.subName}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-bold text-[#b0bcaf] uppercase tracking-widest mb-1">Document ID</div>
              <div className="text-3xl font-bold text-[#4a5d4e] tracking-tighter">{invoice.serialNumber}</div>
            </div>
          </div>
        );
      case 'atmospheric':
        return (
          <div className="relative mb-12 overflow-hidden rounded-3xl p-12 bg-gradient-to-r from-blue-600 to-indigo-700">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="relative z-10 flex justify-between items-center">
              <div className="flex items-center gap-6">
                {company.logo && <div className="p-2 bg-white/10 rounded-xl backdrop-blur-md"><img src={company.logo} className="h-10 w-auto brightness-200" /></div>}
                <div>
                  <h1 className="text-4xl font-black tracking-tight text-white mb-2">{company.name}</h1>
                  <div className="text-xs font-bold text-white/60 uppercase tracking-[0.3em]">{company.subName}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Invoice Ref</div>
                <div className="text-3xl font-black text-white tracking-tighter">{invoice.serialNumber}</div>
              </div>
            </div>
          </div>
        );
      case 'clean-utility':
        return (
          <div className="flex justify-between items-start mb-12 border-b border-slate-200 pb-10">
            <div className="flex items-start gap-6">
              {company.logo && <img src={company.logo} className="h-10 w-auto grayscale" />}
              <div className="space-y-4">
                <div className="text-2xl font-bold text-slate-900 tracking-tight">{company.name}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-1 rounded inline-block">{company.subName}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Invoice Number</div>
              <div className="text-2xl font-mono font-bold text-slate-900">{invoice.serialNumber}</div>
              <div className="text-xs text-slate-400 mt-2">{invoice.date}</div>
            </div>
          </div>
        );
      case 'oversized':
        return (
          <div className="relative mb-20">
            <div className="absolute -top-10 -left-10 text-[180px] font-black text-slate-50 leading-none select-none z-0">
              {invoice.serialNumber.slice(-2)}
            </div>
            <div className="relative z-10 flex justify-between items-end">
              <div className="flex items-end gap-8">
                {company.logo && <img src={company.logo} className="h-16 w-auto grayscale mb-1" />}
                <div>
                  <h1 className="text-6xl font-black tracking-tighter leading-none mb-4">{company.name}</h1>
                  <div className="text-xs font-black uppercase tracking-[0.6em] text-blue-600">{company.subName}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-black uppercase tracking-widest mb-1">Invoice</div>
                <div className="text-4xl font-black tracking-tighter">{invoice.serialNumber}</div>
              </div>
            </div>
          </div>
        );
      case 'bold-color':
        return (
          <div className="flex justify-between items-center mb-12 bg-black text-white -mx-10 -mt-10 p-12">
            <div className="flex items-center gap-8">
              {company.logo && <img src={company.logo} className="h-14 w-auto brightness-200" />}
              <div>
                <h1 className="text-5xl font-black tracking-tighter leading-none mb-2 italic">{company.name}</h1>
                <div className="text-xs font-bold uppercase tracking-[0.4em] opacity-60">{company.subName}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs font-bold uppercase tracking-widest mb-1 opacity-40">Document</div>
              <div className="text-4xl font-black tracking-tighter">{invoice.serialNumber}</div>
            </div>
          </div>
        );
      case 'split-layout':
        return (
          <div className="flex h-48 bg-slate-900 text-white mb-12">
            <div className="w-1/2 p-12 flex items-center gap-8 border-r border-white/10">
              {company.logo && <img src={company.logo} className="h-16 w-auto brightness-200" />}
              <div>
                <h1 className="text-4xl font-black tracking-tighter uppercase">{company.name}</h1>
                <div className="text-[10px] font-bold tracking-[0.4em] text-blue-400 uppercase mt-2">{company.subName}</div>
              </div>
            </div>
            <div className="w-1/2 p-12 flex flex-col justify-center items-end bg-blue-600">
              <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-2">Invoice Reference</div>
              <div className="text-5xl font-black tracking-tighter">{invoice.serialNumber}</div>
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
      case 'minimal':
        return (
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Bill To</div>
              <div className="text-3xl font-bold text-slate-900 tracking-tight">{invoice.customer}</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Due Date</div>
              <div className="text-lg font-bold text-slate-900">{invoice.dueDate}</div>
            </div>
          </div>
        );
      case 'corporate':
        return (
          <div className="grid grid-cols-2 gap-12 mb-12 bg-slate-50 p-8 rounded-lg border border-slate-200">
            <div>
              <div className="text-[10px] font-bold text-blue-800 uppercase tracking-widest mb-4">Client Information</div>
              <div className="text-3xl font-bold text-slate-900 tracking-tight uppercase">{invoice.customer}</div>
            </div>
            <div className="text-right flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Reference</div>
                <div className="text-xl font-bold text-slate-900">{periodValue}</div>
              </div>
              <div className="mt-4">
                <div className="text-[10px] font-bold text-red-600 uppercase tracking-widest mb-1">Payment Due</div>
                <div className="text-xl font-bold text-red-600">{invoice.dueDate}</div>
              </div>
            </div>
          </div>
        );
      case 'elegant':
        return (
          <div className="grid grid-cols-3 gap-12 mb-16 items-start">
            <div className="col-span-2">
              <div className="text-[10px] font-medium text-[#2d241e]/40 uppercase tracking-[0.4em] mb-6">Recipient</div>
              <div className="text-5xl font-light italic text-[#2d241e] tracking-tight leading-none">{invoice.customer}</div>
            </div>
            <div className="text-right space-y-8">
              <div>
                <div className="text-[10px] font-medium text-[#2d241e]/40 uppercase tracking-[0.3em] mb-2">Manifest</div>
                <div className="text-xl font-light italic text-[#2d241e]">{periodValue}</div>
              </div>
              <div>
                <div className="text-[10px] font-medium text-[#2d241e]/40 uppercase tracking-[0.3em] mb-2">Due Date</div>
                <div className="text-xl font-light text-[#2d241e]">{invoice.dueDate}</div>
              </div>
            </div>
          </div>
        );
      case 'bold':
        return (
          <div className="flex justify-between items-center mb-12 bg-black text-white p-10">
            <div>
              <div className="text-xs font-black uppercase tracking-widest mb-4 opacity-40">Bill To:</div>
              <div className="text-5xl font-black tracking-tighter uppercase leading-none">{invoice.customer}</div>
            </div>
            <div className="text-right">
              <div className="text-xs font-black uppercase tracking-widest mb-2 opacity-40">Due Date</div>
              <div className="text-3xl font-black tracking-tighter">{invoice.dueDate}</div>
            </div>
          </div>
        );
      case 'dark':
        return (
          <div className="grid grid-cols-2 gap-8 mb-12 bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Recipient</div>
              <div className="text-3xl font-black text-white tracking-tight uppercase">{invoice.customer}</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Reference</div>
              <div className="text-xl font-bold text-white mb-4">{periodValue}</div>
              <div className="text-[10px] font-bold text-blue-500 uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full inline-block">Due {invoice.dueDate}</div>
            </div>
          </div>
        );
      case 'grid':
        return (
          <div className="grid grid-cols-2 border-x-2 border-b-2 border-slate-200 mb-12">
            <div className="p-8 border-r-2 border-slate-200">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Recipient_Entity</div>
              <div className="text-3xl font-bold tracking-tighter uppercase text-slate-900">{invoice.customer}</div>
            </div>
            <div className="p-8 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Data_Ref</div>
                <div className="text-xl font-bold text-slate-900">{periodValue}</div>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Due_Date</div>
                <div className="text-xl font-bold text-red-600">{invoice.dueDate}</div>
              </div>
            </div>
          </div>
        );
      case 'classic':
        return (
          <div className="mb-12 border border-slate-200 p-10 bg-slate-50/50">
            <div className="text-xs font-serif italic text-slate-500 mb-4">Bill To:</div>
            <div className="text-4xl font-serif font-bold text-slate-900 mb-6">{invoice.customer}</div>
            <div className="flex justify-between border-t border-slate-200 pt-6">
              <div>
                <div className="text-[10px] font-serif uppercase text-slate-400 mb-1">Reference</div>
                <div className="font-serif font-bold text-slate-900">{periodValue}</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-serif uppercase text-slate-400 mb-1">Payment Due</div>
                <div className="font-serif font-bold text-slate-900">{invoice.dueDate}</div>
              </div>
            </div>
          </div>
        );
      case 'compact':
        return (
          <div className="flex justify-between items-end mb-8 px-2">
            <div>
              <div className="text-[8px] font-bold text-slate-400 uppercase mb-1">Bill To</div>
              <div className="text-xl font-bold text-slate-900 tracking-tight">{invoice.customer}</div>
            </div>
            <div className="text-right">
              <div className="text-[8px] font-bold text-slate-400 uppercase mb-1">Due Date</div>
              <div className="text-sm font-bold text-slate-900">{invoice.dueDate}</div>
            </div>
          </div>
        );
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
                    <div className="font-bold text-slate-900 text-xs">{periodValue}</div>
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
                <div className="text-[10px] font-black">{periodValue}</div>
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
      case 'blueprint':
        return (
          <div className="grid grid-cols-2 gap-8 mb-10 border-2 border-[#a5c9ff] p-6">
            <div>
              <div className="text-[10px] font-bold opacity-40 uppercase mb-2">CONTRACTOR_CLIENT</div>
              <div className="text-2xl font-bold tracking-tight">{invoice.customer}</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-bold opacity-40 uppercase mb-2">PROJECT_REF</div>
              <div className="text-xl font-bold">{periodValue}</div>
              <div className="text-[10px] font-bold text-[#ff6b6b] mt-2 uppercase">DUE: {invoice.dueDate}</div>
            </div>
          </div>
        );
      case 'retro':
        return (
          <div className="mb-10 border-2 border-[#433422] p-8 bg-[#433422]/5">
            <div className="text-xs font-bold uppercase mb-4 opacity-40">Bill To:</div>
            <div className="text-3xl font-bold mb-4">{invoice.customer}</div>
            <div className="flex justify-between border-t border-[#433422]/20 pt-4">
              <div>
                <div className="text-[10px] font-bold uppercase opacity-40">Reference</div>
                <div className="font-bold">{periodValue}</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-bold uppercase opacity-40">Due Date</div>
                <div className="font-bold">{invoice.dueDate}</div>
              </div>
            </div>
          </div>
        );
      case 'minimalist-bold':
        return (
          <div className="mb-12 border-t-8 border-black pt-8 flex justify-between items-start">
            <div>
              <div className="text-xs font-black uppercase tracking-widest mb-4">Client</div>
              <div className="text-4xl font-black tracking-tighter">{invoice.customer}</div>
            </div>
            <div className="text-right">
              <div className="text-xs font-black uppercase tracking-widest mb-2">Reference</div>
              <div className="text-xl font-black tracking-tighter">{periodValue}</div>
              <div className="mt-4 text-xs font-black bg-black text-white px-3 py-1 uppercase tracking-widest">Due {invoice.dueDate}</div>
            </div>
          </div>
        );
      case 'executive':
        return (
          <div className="flex justify-between items-center mb-12 border-b border-slate-200 pb-12">
            <div>
              <div className="text-[10px] font-bold text-amber-600 uppercase tracking-[0.3em] mb-4">Account Holder</div>
              <div className="text-4xl font-black tracking-tight text-slate-900 uppercase">{invoice.customer}</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-2">{periodLabel}</div>
              <div className="text-xl font-bold text-slate-800 mb-4">{periodValue}</div>
              <div className="text-[10px] font-bold text-white bg-slate-900 px-4 py-2 uppercase tracking-[0.2em]">Payable by {invoice.dueDate}</div>
            </div>
          </div>
        );
      case 'brutalist':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mb-12 border-[6px] border-black">
            <div className="p-8 border-r-[6px] border-black">
              <div className="text-xs font-black uppercase tracking-widest mb-4">Bill To:</div>
              <div className="text-5xl font-black tracking-tighter uppercase leading-[0.9]">{invoice.customer}</div>
            </div>
            <div className="p-8 bg-yellow-400 flex flex-col justify-between">
              <div>
                <div className="text-xs font-black uppercase tracking-widest mb-2">Reference</div>
                <div className="text-2xl font-black tracking-tighter">{periodValue}</div>
              </div>
              <div className="pt-4 border-t-2 border-black/10">
                <div className="text-xs font-black uppercase tracking-widest mb-1">Due Date</div>
                <div className="text-3xl font-black tracking-tighter">{invoice.dueDate}</div>
              </div>
            </div>
          </div>
        );
      case 'luxury':
        return (
          <div className="grid grid-cols-3 gap-12 mb-16 items-start border-b border-[#c5a059]/20 pb-12">
            <div className="col-span-2">
              <div className="text-[10px] font-bold text-[#c5a059] uppercase tracking-[0.4em] mb-6">Client Registry</div>
              <div className="text-5xl font-light italic text-white tracking-tight">{invoice.customer}</div>
            </div>
            <div className="text-right space-y-6">
              <div>
                <div className="text-[10px] font-bold text-[#c5a059]/40 uppercase tracking-[0.3em] mb-2">Manifest</div>
                <div className="text-xl font-light text-white">{periodValue}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-[#c5a059]/40 uppercase tracking-[0.3em] mb-2">Payment Due</div>
                <div className="text-xl font-light text-[#c5a059]">{invoice.dueDate}</div>
              </div>
            </div>
          </div>
        );
      case 'luxury-white':
        return (
          <div className="grid grid-cols-3 gap-12 mb-16 items-start border-b border-[#c5a059]/20 pb-12">
            <div className="col-span-2">
              <div className="text-[10px] font-bold text-[#c5a059] uppercase tracking-[0.4em] mb-6">Client Registry</div>
              <div className="text-5xl font-light italic text-slate-900 tracking-tight">{invoice.customer}</div>
            </div>
            <div className="text-right space-y-6">
              <div>
                <div className="text-[10px] font-bold text-[#c5a059]/40 uppercase tracking-[0.3em] mb-2">Manifest</div>
                <div className="text-xl font-light text-slate-800">{periodValue}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-[#c5a059]/40 uppercase tracking-[0.3em] mb-2">Payment Due</div>
                <div className="text-xl font-light text-[#c5a059]">{invoice.dueDate}</div>
              </div>
            </div>
          </div>
        );
      case 'tech':
        return (
          <div className="grid grid-cols-2 gap-8 mb-12 border border-[#00ff41]/30 p-8 bg-[#00ff41]/5">
            <div>
              <div className="text-[10px] opacity-40 uppercase mb-4 tracking-widest">{'>'} TARGET_ENTITY</div>
              <div className="text-3xl font-bold tracking-tighter uppercase">{invoice.customer}</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] opacity-40 uppercase mb-4 tracking-widest">{'>'} DATA_REF</div>
              <div className="text-xl font-bold tracking-tighter">{periodValue}</div>
              <div className="mt-4 text-[10px] font-bold bg-[#00ff41] text-black px-2 py-1 inline-block">DUE_DATE: {invoice.dueDate}</div>
            </div>
          </div>
        );
      case 'editorial':
        return (
          <div className="grid grid-cols-12 gap-12 mb-16">
            <div className="col-span-8 border-r-2 border-slate-900 pr-12">
              <div className="text-xs font-bold uppercase tracking-[0.4em] text-slate-400 mb-6">Recipient</div>
              <div className="text-6xl font-black tracking-tighter leading-[0.85]">{invoice.customer}</div>
            </div>
            <div className="col-span-4 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest mb-2">Ref.</div>
                <div className="text-xl font-bold italic">{periodValue}</div>
              </div>
              <div className="pt-6 border-t border-slate-200">
                <div className="text-xs font-bold uppercase tracking-widest mb-1 text-red-600">Deadline</div>
                <div className="text-2xl font-black tracking-tighter">{invoice.dueDate}</div>
              </div>
            </div>
          </div>
        );
      case 'organic':
        return (
          <div className="flex justify-between items-end mb-12 px-10">
            <div>
              <div className="text-[10px] font-bold text-[#b0bcaf] uppercase tracking-[0.3em] mb-4">Billing To</div>
              <div className="text-4xl font-bold text-[#2d3a30] tracking-tight">{invoice.customer}</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-bold text-[#b0bcaf] uppercase tracking-[0.3em] mb-2">Due Date</div>
              <div className="text-xl font-bold text-[#4a5d4e] mb-4">{invoice.dueDate}</div>
              <div className="text-[10px] font-bold text-white bg-[#4a5d4e] px-4 py-2 rounded-full uppercase tracking-widest">Ref: {periodValue}</div>
            </div>
          </div>
        );
      case 'atmospheric':
        return (
          <div className="flex justify-between items-center mb-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-10">
            <div>
              <div className="text-[10px] font-bold text-white/40 uppercase tracking-[0.4em] mb-4">Recipient</div>
              <div className="text-4xl font-black text-white tracking-tight">{invoice.customer}</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-bold text-white/40 uppercase tracking-[0.4em] mb-2">Manifest</div>
              <div className="text-xl font-bold text-white mb-4">{periodValue}</div>
              <div className="text-[10px] font-bold text-white bg-blue-600 px-4 py-2 rounded-full uppercase tracking-widest shadow-lg shadow-blue-600/40">Due {invoice.dueDate}</div>
            </div>
          </div>
        );
      case 'clean-utility':
        return (
          <div className="grid grid-cols-2 gap-8 mb-12 bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Bill To</div>
              <div className="text-3xl font-bold text-slate-900 tracking-tight">{invoice.customer}</div>
            </div>
            <div className="text-right border-l border-slate-100 pl-8">
              <div className="grid grid-cols-2 gap-4 text-left">
                <div>
                  <div className="text-[9px] font-bold text-slate-400 uppercase mb-1">Ref ID</div>
                  <div className="text-sm font-bold">{periodValue}</div>
                </div>
                <div>
                  <div className="text-[9px] font-bold text-slate-400 uppercase mb-1">Due Date</div>
                  <div className="text-sm font-bold text-red-600">{invoice.dueDate}</div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'oversized':
        return (
          <div className="mb-20 flex justify-between items-start">
            <div className="max-w-xl">
              <div className="text-[10px] font-black text-blue-600 uppercase tracking-[0.5em] mb-6">Billing Recipient</div>
              <div className="text-7xl font-black tracking-tighter leading-[0.8] uppercase">{invoice.customer}</div>
            </div>
            <div className="text-right pt-2">
              <div className="text-xs font-black uppercase tracking-widest mb-2 text-slate-300">Reference</div>
              <div className="text-2xl font-black tracking-tighter mb-6">{periodValue}</div>
              <div className="text-xs font-black bg-slate-900 text-white px-4 py-2 uppercase tracking-widest">Pay by {invoice.dueDate}</div>
            </div>
          </div>
        );
      case 'bold-color':
        return (
          <div className="mb-12 border-b-4 border-white pb-12">
            <div className="text-xs font-bold uppercase tracking-[0.5em] mb-6 opacity-60">Recipient Account</div>
            <div className="text-7xl font-black tracking-tighter leading-[0.8] mb-8">{invoice.customer}</div>
            <div className="flex justify-between items-end">
              <div className="text-2xl font-bold italic opacity-80">{periodValue}</div>
              <div className="text-2xl font-black uppercase tracking-widest">Due {invoice.dueDate}</div>
            </div>
          </div>
        );
      case 'split-layout':
        return (
          <div className="flex justify-between items-center mb-12 px-12">
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] mb-4">Bill To</div>
              <div className="text-4xl font-black text-slate-900 tracking-tight uppercase">{invoice.customer}</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] mb-2">Manifest Ref</div>
              <div className="text-xl font-bold text-slate-800 mb-4">{periodValue}</div>
              <div className="text-[10px] font-bold text-white bg-slate-900 px-4 py-2 uppercase tracking-widest">Due {invoice.dueDate}</div>
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
    
    if (theme === 'minimal') {
      theadClass = "border-b border-slate-100";
      thClass = "px-2 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-slate-400";
      tdClass = "px-2 py-4 border-b border-slate-50 text-xs text-slate-600";
    } else if (theme === 'corporate') {
      theadClass = "bg-slate-100 px-4";
      thClass = "px-4 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-blue-800";
      tdClass = "px-4 py-4 border-b border-slate-100 text-sm text-slate-700";
    } else if (theme === 'elegant') {
      theadClass = "border-b border-[#2d241e]/10";
      thClass = "px-4 py-6 text-left text-[10px] font-medium uppercase tracking-[0.3em] text-[#2d241e]/40";
      tdClass = "px-4 py-8 border-b border-[#2d241e]/5 text-sm font-light italic text-[#2d241e]";
    } else if (theme === 'bold') {
      theadClass = "bg-black text-white px-4";
      thClass = "px-4 py-4 text-left text-xs font-black uppercase tracking-widest";
      tdClass = "px-4 py-6 border-b-4 border-black text-lg font-black uppercase tracking-tighter";
    } else if (theme === 'dark') {
      theadClass = "border-b border-slate-700";
      thClass = "px-2 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-slate-500";
      tdClass = "px-2 py-5 border-b border-slate-800 text-sm text-slate-300";
    } else if (theme === 'grid') {
      theadClass = "border-y-2 border-slate-200 px-4";
      thClass = "px-4 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-slate-400";
      tdClass = "px-4 py-4 border-b-2 border-slate-200 text-xs font-mono text-slate-600";
    } else if (theme === 'classic') {
      theadClass = "border-y-2 border-slate-900";
      thClass = "px-4 py-4 text-left text-xs font-serif font-bold uppercase tracking-widest text-slate-900";
      tdClass = "px-4 py-6 border-b border-slate-200 text-sm font-serif text-slate-700";
    } else if (theme === 'compact') {
      theadClass = "border-b border-slate-100";
      thClass = "px-2 py-2 text-left text-[8px] font-bold uppercase tracking-widest text-slate-400";
      tdClass = "px-2 py-2 border-b border-slate-50 text-[10px] text-slate-600";
    } else if (theme === 'ledger-pro') {
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
    } else if (theme === 'blueprint') {
      theadClass = "border-y-2 border-[#a5c9ff]";
      thClass = "px-2 py-2 text-left font-bold text-[10px] uppercase tracking-widest";
      tdClass = "px-2 py-3 border-b border-[#a5c9ff]/20 text-[11px] font-bold";
    } else if (theme === 'retro') {
      theadClass = "border-y border-[#433422]";
      thClass = "px-2 py-2 text-left font-bold text-[11px] uppercase";
      tdClass = "px-2 py-3 border-b border-[#433422]/10 text-[13px]";
    } else if (theme === 'minimalist-bold') {
      theadClass = "bg-black text-white";
      thClass = "px-4 py-4 text-left font-black text-[10px] uppercase tracking-widest";
      tdClass = "px-4 py-4 border-b-2 border-slate-100 text-[13px] font-black";
    } else if (theme === 'executive') {
      theadClass = "bg-slate-50";
      thClass = "px-4 py-4 text-left font-bold text-[10px] uppercase tracking-[0.2em] text-slate-400";
      tdClass = "px-4 py-5 border-b border-slate-100 text-[13px] font-bold text-slate-700";
    } else if (theme === 'brutalist') {
      theadClass = "bg-black text-white";
      thClass = "px-4 py-4 text-left font-black text-[10px] uppercase tracking-widest";
      tdClass = "px-4 py-4 border-b-[4px] border-black text-[14px] font-black uppercase";
    } else if (theme === 'luxury') {
      theadClass = "border-y border-[#c5a059]/30";
      thClass = "px-4 py-4 text-left font-bold text-[10px] uppercase tracking-[0.3em] text-[#c5a059]";
      tdClass = "px-4 py-5 border-b border-[#c5a059]/10 text-[13px] font-light text-white tracking-wide";
    } else if (theme === 'luxury-white') {
      theadClass = "border-y border-[#c5a059]/30";
      thClass = "px-4 py-4 text-left font-bold text-[10px] uppercase tracking-[0.3em] text-[#c5a059]";
      tdClass = "px-4 py-5 border-b border-[#c5a059]/10 text-[13px] font-light text-slate-700 tracking-wide";
    } else if (theme === 'tech') {
      theadClass = "bg-[#00ff41]/10 border-y border-[#00ff41]/30";
      thClass = "px-4 py-3 text-left font-bold text-[10px] uppercase tracking-widest text-[#00ff41]";
      tdClass = "px-4 py-3 border-b border-[#00ff41]/10 text-[12px] font-bold text-[#00ff41]/80";
    } else if (theme === 'editorial') {
      theadClass = "border-y-2 border-slate-900";
      thClass = "px-2 py-4 text-left font-black text-[11px] uppercase tracking-widest";
      tdClass = "px-2 py-5 border-b border-slate-100 text-[14px] font-bold italic";
    } else if (theme === 'organic') {
      theadClass = "bg-[#f4f7f5]";
      thClass = "px-6 py-4 text-left font-bold text-[10px] uppercase tracking-widest text-[#7a8c7e]";
      tdClass = "px-6 py-5 border-b border-[#f4f7f5] text-[13px] font-medium text-[#4a5d4e]";
    } else if (theme === 'atmospheric') {
      theadClass = "bg-white/5 border-y border-white/10";
      thClass = "px-6 py-4 text-left font-bold text-[10px] uppercase tracking-widest text-white/60";
      tdClass = "px-6 py-5 border-b border-white/5 text-[13px] font-medium text-white/90";
    } else if (theme === 'clean-utility') {
      theadClass = "bg-slate-100";
      thClass = "px-4 py-3 text-left font-bold text-[10px] uppercase tracking-widest text-slate-500";
      tdClass = "px-4 py-4 border-b border-slate-100 text-[12px] font-medium text-slate-700";
    } else if (theme === 'oversized') {
      theadClass = "border-y-4 border-slate-900";
      thClass = "px-2 py-4 text-left font-black text-[11px] uppercase tracking-widest";
      tdClass = "px-2 py-6 border-b border-slate-100 text-[15px] font-black tracking-tighter";
    } else if (theme === 'bold-color') {
      theadClass = "border-y-2 border-white";
      thClass = "px-4 py-4 text-left font-bold text-[12px] uppercase tracking-widest text-white";
      tdClass = "px-4 py-5 border-b border-white/20 text-[14px] font-bold italic text-white";
    } else if (theme === 'split-layout') {
      theadClass = "bg-slate-50";
      thClass = "px-6 py-4 text-left font-bold text-[10px] uppercase tracking-widest text-slate-400";
      tdClass = "px-6 py-5 border-b border-slate-100 text-[13px] font-bold text-slate-700";
    }

    return (
      <div className="mb-8 flex-1">
        <table className="w-full border-collapse">
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
                   <div className="font-bold opacity-60">{item.Date}</div>
                </td>
                <td className={tdClass}>
                  <div className="font-black text-slate-900">{item.UnitNumber}</div>
                </td>
                <td className={tdClass}>
                   <div className="flex items-center gap-1">
                      <span className="font-bold opacity-50">{item.PortGo}</span>
                      <span className="text-blue-500 text-[9px] font-black shrink-0">→</span>
                      <span className="font-bold text-slate-900">{item.PortGi}</span>
                   </div>
                </td>
                <td className={tdClass}>
                  <div className="uppercase font-bold text-slate-500">{item.Shipper || '-'}</div>
                </td>
                <td className={tdClass}>
                  <div className="uppercase font-bold text-slate-700">{item.Trucker || '-'}</div>
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

    const blueprintTotal = (
      <div className="border-4 border-[#a5c9ff] p-6 flex justify-between items-center w-full">
        <div className="text-xl font-bold uppercase tracking-[0.2em]">TOTAL_PAYABLE_EGP</div>
        <div className="text-6xl font-bold tracking-tighter">{invoice.total.toLocaleString()}</div>
      </div>
    );

    const retroTotal = (
      <div className="border-2 border-[#433422] p-6 flex justify-between items-center w-full bg-[#433422]/5">
        <div className="text-xl font-bold uppercase underline">Total Amount Due:</div>
        <div className="text-5xl font-bold">{invoice.total.toLocaleString()} EGP</div>
      </div>
    );

    const minimalistTotal = (
      <div className="border-y-8 border-black py-8 flex justify-between items-center w-full">
        <div className="text-2xl font-black uppercase tracking-widest">Total</div>
        <div className="text-7xl font-black tracking-tighter">{invoice.total.toLocaleString()}</div>
      </div>
    );

    const executiveTotal = (
      <div className="bg-[#1a1a1a] text-white p-10 flex justify-between items-center w-full">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-amber-400 mb-2">Final Settlement Amount</div>
          <div className="text-sm font-medium text-white/40 italic">All values in Egyptian Pounds</div>
        </div>
        <div className="text-6xl font-black tracking-tighter text-amber-400">
          {invoice.total.toLocaleString()}
        </div>
      </div>
    );

    const brutalistTotal = (
      <div className="border-[10px] border-black p-8 flex justify-between items-center w-full bg-white">
        <div className="text-4xl font-black uppercase tracking-tighter">Total_Payable</div>
        <div className="text-8xl font-black tracking-tighter">{invoice.total.toLocaleString()}</div>
      </div>
    );

    const luxuryTotal = (
      <div className="border border-[#c5a059] p-10 flex justify-between items-center w-full bg-[#c5a059]/5">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#c5a059] mb-2">Total Amount Due</div>
          <div className="text-sm font-light italic text-white/40">Egyptian Pounds (EGP)</div>
        </div>
        <div className="text-7xl font-light tracking-tighter text-[#c5a059]">
          {invoice.total.toLocaleString()}
        </div>
      </div>
    );

    const luxuryWhiteTotal = (
      <div className="border border-[#c5a059] p-10 flex justify-between items-center w-full bg-[#c5a059]/5">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#c5a059] mb-2">Total Amount Due</div>
          <div className="text-sm font-light italic text-slate-400">Egyptian Pounds (EGP)</div>
        </div>
        <div className="text-7xl font-light tracking-tighter text-[#c5a059]">
          {invoice.total.toLocaleString()}
        </div>
      </div>
    );

    const techTotal = (
      <div className="border-2 border-[#00ff41] p-8 flex justify-between items-center w-full bg-[#00ff41]/10">
        <div className="text-xl font-bold tracking-[0.3em] uppercase">TOTAL_PAYABLE_EGP</div>
        <div className="text-6xl font-bold tracking-tighter">{invoice.total.toLocaleString()}</div>
      </div>
    );

    const editorialTotal = (
      <div className="border-y-4 border-slate-900 py-10 flex justify-between items-center w-full">
        <div className="text-4xl font-black tracking-tighter uppercase italic">Total</div>
        <div className="text-8xl font-black tracking-tighter">{invoice.total.toLocaleString()}</div>
      </div>
    );

    const organicTotal = (
      <div className="bg-[#4a5d4e] text-white p-10 rounded-[2.5rem] flex justify-between items-center w-full shadow-xl shadow-[#4a5d4e]/20">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-60 mb-1">Total Balance</div>
          <div className="text-xs font-medium opacity-40 italic">Egyptian Pounds</div>
        </div>
        <div className="text-6xl font-bold tracking-tighter">
          {invoice.total.toLocaleString()}
        </div>
      </div>
    );

    const atmosphericTotal = (
      <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-10 rounded-[2rem] flex justify-between items-center w-full">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/60 mb-2">Total Due</div>
          <div className="text-sm font-medium text-white/40 italic">EGP Currency</div>
        </div>
        <div className="text-7xl font-black tracking-tighter text-white">
          {invoice.total.toLocaleString()}
        </div>
      </div>
    );

    const utilityTotal = (
      <div className="bg-slate-900 text-white p-8 rounded-xl flex justify-between items-center w-full">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-1">Total Amount</div>
          <div className="text-xs font-medium opacity-30 italic">All values in EGP</div>
        </div>
        <div className="text-5xl font-bold tracking-tight">
          {invoice.total.toLocaleString()}
        </div>
      </div>
    );

    const oversizedTotal = (
      <div className="border-y-[12px] border-slate-900 py-12 flex justify-between items-center w-full">
        <div className="text-4xl font-black uppercase tracking-widest">Total</div>
        <div className="text-9xl font-black tracking-tighter leading-none">{invoice.total.toLocaleString()}</div>
      </div>
    );

    const boldColorTotal = (
      <div className="border-4 border-white p-10 flex justify-between items-center w-full bg-black/20">
        <div className="text-3xl font-black uppercase tracking-widest italic">Total</div>
        <div className="text-8xl font-black tracking-tighter">{invoice.total.toLocaleString()}</div>
      </div>
    );

    const splitTotal = (
      <div className="bg-blue-600 text-white p-12 flex justify-between items-center w-full">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/60 mb-2">Total Payable</div>
          <div className="text-sm font-medium text-white/40 italic">Egyptian Pounds</div>
        </div>
        <div className="text-7xl font-black tracking-tighter">
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
      case 'minimal':
        return (
          <div className="mt-auto pt-8 border-t border-slate-100 flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Due</div>
                <div className="text-3xl font-bold text-slate-900">{invoice.total.toLocaleString()} EGP</div>
              </div>
              <div className="max-w-xs text-right">
                {settlementSection}
              </div>
            </div>
            {authAndSignature}
            {taglineSection}
          </div>
        );
      case 'corporate':
        return (
          <div className="mt-auto pt-8 flex flex-col">
            <div className="bg-blue-900 text-white p-8 mb-8 flex justify-between items-center rounded-lg">
              <div className="text-xl font-bold uppercase tracking-widest">Total Amount Payable</div>
              <div className="text-5xl font-bold">{invoice.total.toLocaleString()} <span className="text-lg opacity-50">EGP</span></div>
            </div>
            <div className="grid grid-cols-2 gap-12 items-end">
              {settlementSection}
              {authAndSignature}
            </div>
            {taglineSection}
          </div>
        );
      case 'elegant':
        return (
          <div className="mt-auto pt-12 flex flex-col">
            <div className="flex justify-between items-center mb-12 border-y border-[#2d241e]/10 py-8">
              <div className="text-xl font-light tracking-widest uppercase text-[#2d241e]">Total Balance Due</div>
              <div className="text-6xl font-light text-[#2d241e] tracking-tighter">{invoice.total.toLocaleString()}</div>
            </div>
            <div className="grid grid-cols-2 gap-12 items-end">
              <div className="space-y-8">
                {settlementSection}
                <div className="text-[10px] font-medium text-[#2d241e]/30 uppercase tracking-[0.4em]">Prestige Logistics Division</div>
              </div>
              {authAndSignature}
            </div>
            {taglineSection}
          </div>
        );
      case 'bold':
        return (
          <div className="mt-auto pt-12 flex flex-col">
            <div className="bg-black text-white p-10 mb-10 flex justify-between items-center">
              <div className="text-3xl font-black uppercase tracking-tighter">Total_Payable</div>
              <div className="text-7xl font-black tracking-tighter">{invoice.total.toLocaleString()}</div>
            </div>
            <div className="grid grid-cols-2 gap-12 items-end">
              <div className="space-y-8">
                <div className="p-6 border-4 border-black font-black text-xs uppercase leading-relaxed">
                  {settlementText}
                </div>
                {authAndSignature}
              </div>
              <div className="text-right opacity-10">
                <div className="text-5xl font-black uppercase tracking-tighter rotate-90 origin-right">Original</div>
              </div>
            </div>
            {taglineSection}
          </div>
        );
      case 'dark':
        return (
          <div className="mt-auto pt-10 flex flex-col">
            <div className="bg-slate-800 p-8 mb-8 rounded-2xl flex justify-between items-center border border-slate-700 shadow-2xl">
              <div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Total Due</div>
                <div className="text-sm text-slate-400 italic">Egyptian Pounds</div>
              </div>
              <div className="text-5xl font-black text-white tracking-tighter">{invoice.total.toLocaleString()}</div>
            </div>
            <div className="grid grid-cols-2 gap-12 items-end">
              <div className="space-y-8">
                {settlementSection}
                {authAndSignature}
              </div>
              <div className="text-right opacity-20">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.5em]">Secure Dark Mode Auth</div>
              </div>
            </div>
            {taglineSection}
          </div>
        );
      case 'grid':
        return (
          <div className="mt-auto pt-8 flex flex-col">
            <div className="border-2 border-slate-200 p-8 mb-8 flex justify-between items-center bg-slate-50">
              <div className="text-xl font-bold uppercase tracking-widest">Total_Due_EGP</div>
              <div className="text-6xl font-bold tracking-tighter">{invoice.total.toLocaleString()}</div>
            </div>
            <div className="grid grid-cols-2 gap-8 items-end">
              <div className="space-y-6">
                <div className="p-6 border-2 border-slate-200 font-mono text-[10px] leading-relaxed">
                  {settlementText}
                </div>
                {authAndSignature}
              </div>
              <div className="text-right opacity-10">
                <div className="text-4xl font-bold uppercase tracking-widest">Verified_Data</div>
              </div>
            </div>
            {taglineSection}
          </div>
        );
      case 'classic':
        return (
          <div className="mt-auto pt-12 flex flex-col">
            <div className="border-y-2 border-slate-200 py-8 mb-10 flex justify-between items-center">
              <div className="text-2xl font-serif font-bold uppercase tracking-tight">Total Amount Due:</div>
              <div className="text-6xl font-serif font-bold text-slate-900 tracking-tighter">{invoice.total.toLocaleString()} EGP</div>
            </div>
            <div className="grid grid-cols-2 gap-12 items-end">
              <div className="space-y-8">
                {settlementSection}
                {authAndSignature}
              </div>
              <div className="text-right opacity-20">
                <div className="text-[10px] font-serif font-bold uppercase tracking-widest">Official Nile Fleet Document</div>
              </div>
            </div>
            {taglineSection}
          </div>
        );
      case 'compact':
        return (
          <div className="mt-auto pt-6 flex flex-col border-t border-slate-100">
            <div className="flex justify-between items-center mb-6 px-2">
              <div className="text-sm font-bold uppercase tracking-widest text-slate-400">Total Due</div>
              <div className="text-3xl font-bold text-slate-900">{invoice.total.toLocaleString()} EGP</div>
            </div>
            <div className="grid grid-cols-2 gap-6 items-end">
              <div className="text-[9px] leading-relaxed text-slate-400 italic">
                {settlementText}
              </div>
              <div className="scale-75 origin-bottom-right">
                {authAndSignature}
              </div>
            </div>
            {taglineSection}
          </div>
        );
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
      case 'blueprint':
        return (
          <div className="mt-auto pt-8 flex flex-col">
            <div className="mb-8">{blueprintTotal}</div>
            <div className="grid grid-cols-2 gap-8">
              {settlementSection}
              {authAndSignature}
            </div>
            {taglineSection}
          </div>
        );
      case 'retro':
        return (
          <div className="mt-auto pt-8 flex flex-col">
            <div className="mb-8">{retroTotal}</div>
            <div className="grid grid-cols-2 gap-12 items-end">
              <div className="space-y-6">
                {settlementSection}
                <div className="text-[10px] font-bold uppercase opacity-30">Certified Document // Nile Fleet</div>
              </div>
              {authAndSignature}
            </div>
            {taglineSection}
          </div>
        );
      case 'minimalist-bold':
        return (
          <div className="mt-auto pt-12 flex flex-col">
            <div className="mb-12">{minimalistTotal}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
              {settlementSection}
              {authAndSignature}
            </div>
            {taglineSection}
          </div>
        );
      case 'executive':
        return (
          <div className="mt-auto pt-12 flex flex-col">
            <div className="mb-12">{executiveTotal}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
              <div className="space-y-8">
                {settlementSection}
                <div className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.5em]">Verified Executive Document</div>
              </div>
              {authAndSignature}
            </div>
            {taglineSection}
          </div>
        );
      case 'brutalist':
        return (
          <div className="mt-auto pt-12 flex flex-col">
            <div className="mb-12">{brutalistTotal}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
              <div className="space-y-8">
                <div className="p-6 border-[4px] border-black font-black text-xs uppercase leading-relaxed">
                  {settlementText}
                </div>
                {authAndSignature}
              </div>
              <div className="flex justify-end opacity-10 rotate-12">
                <div className="border-[12px] border-black p-6 text-4xl font-black text-center uppercase leading-none">
                  Verified
                </div>
              </div>
            </div>
            {taglineSection}
          </div>
        );
      case 'luxury':
        return (
          <div className="mt-auto pt-16 flex flex-col">
            <div className="mb-12">{luxuryTotal}</div>
            <div className="grid grid-cols-2 gap-16 items-end">
              <div className="space-y-8">
                <div className="text-[11px] leading-relaxed text-white/40 font-light italic border-l border-[#c5a059]/30 pl-6">
                  {settlementText}
                </div>
                {authAndSignature}
              </div>
              <div className="text-right">
                <div className="text-[10px] font-bold text-[#c5a059] uppercase tracking-[0.5em] mb-2 opacity-30">Nile Fleet Prestige</div>
              </div>
            </div>
            {taglineSection}
          </div>
        );
      case 'luxury-white':
        return (
          <div className="mt-auto pt-16 flex flex-col">
            <div className="mb-12">{luxuryWhiteTotal}</div>
            <div className="grid grid-cols-2 gap-16 items-end">
              <div className="space-y-8">
                <div className="text-[11px] leading-relaxed text-slate-400 font-light italic border-l border-[#c5a059]/30 pl-6">
                  {settlementText}
                </div>
                {authAndSignature}
              </div>
              <div className="text-right">
                <div className="text-[10px] font-bold text-[#c5a059] uppercase tracking-[0.5em] mb-2 opacity-30">Nile Fleet</div>
              </div>
            </div>
            {taglineSection}
          </div>
        );
      case 'tech':
        return (
          <div className="mt-auto pt-12 flex flex-col">
            <div className="mb-12">{techTotal}</div>
            <div className="grid grid-cols-2 gap-8 items-end">
              <div className="space-y-6">
                <div className="p-4 bg-[#00ff41]/5 border border-[#00ff41]/20 font-mono text-[10px] leading-relaxed">
                  {'>'} {settlementText}
                </div>
                {authAndSignature}
              </div>
              <div className="text-right opacity-20">
                <div className="text-[10px] font-bold uppercase tracking-widest">SYSTEM_VERSION: 4.2.0</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#00ff41]">ENCRYPTED_AUTH</div>
              </div>
            </div>
            {taglineSection}
          </div>
        );
      case 'editorial':
        return (
          <div className="mt-auto pt-16 flex flex-col">
            <div className="mb-16">{editorialTotal}</div>
            <div className="grid grid-cols-12 gap-12 items-end">
              <div className="col-span-7 space-y-10">
                <div className="text-sm leading-relaxed text-slate-500 font-medium border-t-2 border-slate-100 pt-8">
                  {settlementText}
                </div>
                {authAndSignature}
              </div>
              <div className="col-span-5 text-right">
                <div className="text-[10px] font-black uppercase tracking-[0.8em] text-slate-200 rotate-90 origin-right translate-y-[-100%]">Official Document</div>
              </div>
            </div>
            {taglineSection}
          </div>
        );
      case 'organic':
        return (
          <div className="mt-auto pt-12 flex flex-col px-10">
            <div className="mb-12">{organicTotal}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
              <div className="space-y-8">
                <div className="p-8 bg-[#f4f7f5] rounded-[2rem] text-[11px] leading-relaxed text-[#7a8c7e] font-medium">
                  {settlementText}
                </div>
                {authAndSignature}
              </div>
              <div className="text-right opacity-20">
                <div className="text-[10px] font-bold text-[#b0bcaf] uppercase tracking-[0.5em]">Natural Logistics</div>
              </div>
            </div>
            {taglineSection}
          </div>
        );
      case 'atmospheric':
        return (
          <div className="mt-auto pt-12 flex flex-col">
            <div className="mb-12">{atmosphericTotal}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
              <div className="space-y-8">
                <div className="p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] text-[11px] leading-relaxed text-white/60 font-medium">
                  {settlementText}
                </div>
                {authAndSignature}
              </div>
              <div className="text-right opacity-20">
                <div className="text-[10px] font-bold text-white/40 uppercase tracking-[0.5em]">Cloud Verified</div>
              </div>
            </div>
            {taglineSection}
          </div>
        );
      case 'clean-utility':
        return (
          <div className="mt-auto pt-12 flex flex-col">
            <div className="mb-12">{utilityTotal}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
              <div className="space-y-6">
                <div className="p-6 bg-white border border-slate-200 rounded-xl text-[11px] leading-relaxed text-slate-500">
                  {settlementText}
                </div>
                {authAndSignature}
              </div>
              <div className="text-right opacity-20">
                <div className="text-[10px] font-bold uppercase tracking-widest">Standard Utility Document</div>
              </div>
            </div>
            {taglineSection}
          </div>
        );
      case 'oversized':
        return (
          <div className="mt-auto pt-20 flex flex-col">
            <div className="mb-20">{oversizedTotal}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-end">
              <div className="space-y-12">
                <div className="text-sm leading-relaxed text-slate-400 font-black uppercase tracking-widest border-l-8 border-blue-600 pl-8">
                  {settlementText}
                </div>
                {authAndSignature}
              </div>
              <div className="text-right opacity-10">
                <div className="text-4xl font-black uppercase tracking-tighter">Verified</div>
              </div>
            </div>
            {taglineSection}
          </div>
        );
      case 'bold-color':
        return (
          <div className="mt-auto pt-12 flex flex-col">
            <div className="mb-12">{boldColorTotal}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
              <div className="space-y-8">
                <div className="p-8 border-4 border-white text-sm leading-relaxed text-white font-bold italic">
                  {settlementText}
                </div>
                {authAndSignature}
              </div>
              <div className="text-right opacity-30">
                <div className="text-[10px] font-bold text-white uppercase tracking-[0.8em] rotate-90 origin-right">Nile Fleet Bold</div>
              </div>
            </div>
            {taglineSection}
          </div>
        );
      case 'split-layout':
        return (
          <div className="mt-auto pt-12 flex flex-col">
            <div className="mb-12">{splitTotal}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end px-12 pb-12">
              <div className="space-y-8">
                <div className="p-8 bg-slate-50 border border-slate-100 rounded-2xl text-[11px] leading-relaxed text-slate-500">
                  {settlementText}
                </div>
                {authAndSignature}
              </div>
              <div className="text-right opacity-20">
                <div className="text-[10px] font-bold uppercase tracking-widest">Split Division Document</div>
              </div>
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
    <div className={`invoice-container relative shadow-2xl transition-all duration-700 ${getThemeBaseStyles()}`}>
      {/* Background Watermark */}
      {company.watermark && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none rotate-12 scale-[1.2]">
          <img src={company.watermark} className={`w-[140mm] h-auto grayscale ${isDark ? 'invert' : ''}`} />
        </div>
      )}

      {renderHeader()}
      {renderBillTo()}
      <div className="flex-1 min-h-0">
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