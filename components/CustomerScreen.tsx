
import React, { useState } from 'react';
import { 
  Settings, 
  Hash, 
  CalendarClock, 
  Type, 
  Search, 
  User, 
  ChevronRight,
  Info,
  ShieldCheck
} from 'lucide-react';
import { CustomerSettings } from '../types.ts';

interface Props {
  settings: Record<string, CustomerSettings>;
  onUpdate: (name: string, settings: CustomerSettings) => void;
  globalSerialStart: string;
  isGlobalMode: boolean;
  onApplyGlobalSerial: (start: string) => void;
  onToggleGlobalMode: () => void;
}

const CustomerScreen: React.FC<Props> = ({ settings, onUpdate, globalSerialStart, isGlobalMode, onApplyGlobalSerial, onToggleGlobalMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [localGlobalSerial, setLocalGlobalSerial] = useState(globalSerialStart);
  const customerList: CustomerSettings[] = Object.values(settings);
  
  const filteredCustomers = customerList.filter((c: CustomerSettings) => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-[0.2em]">
            <ShieldCheck className="w-4 h-4" />
            <span>Billing Control</span>
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Customer Profiles</h2>
          <p className="text-slate-500 font-medium max-w-md">
            Define unique invoice numbering and payment terms for each client in your logistics network.
          </p>
        </div>

        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Filter customers..." 
            className="pl-12 pr-6 py-3 bg-white border border-slate-200 rounded-2xl w-full md:w-80 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none shadow-sm transition-all font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
            <User className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{customerList.length}</div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Clients</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
            <Hash className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">
              {new Set(customerList.map((c: CustomerSettings) => c.serialPrefix)).size}
            </div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Unique Prefixes</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
            <CalendarClock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">
              {Math.round(customerList.reduce((acc: number, c: CustomerSettings) => acc + c.dueDateDays, 0) / (customerList.length || 1))}
            </div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Avg. Due Days</div>
          </div>
        </div>
      </div>

      {/* Global Serial Numbering Section */}
      <div className={`p-8 rounded-[2rem] shadow-2xl relative overflow-hidden transition-all duration-500 ${isGlobalMode ? 'bg-blue-600 text-white shadow-blue-600/20' : 'bg-slate-900 text-white shadow-slate-900/20'}`}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${isGlobalMode ? 'bg-white/20 text-white' : 'bg-blue-500/20 text-blue-400'}`}>
              <Hash className="w-3 h-3" />
              <span>{isGlobalMode ? 'Global Mode Active' : 'Global Sequencing'}</span>
            </div>
            <h3 className="text-3xl font-black tracking-tight">Global Invoice Numbering</h3>
            <p className={`${isGlobalMode ? 'text-blue-50' : 'text-slate-400'} font-medium text-sm`}>
              {isGlobalMode 
                ? "The system is currently using a single sequential numbering sequence for all customers. New bookings will automatically follow this order."
                : "Override all individual customer prefixes and starting numbers. This will assign a continuous sequential number to every booking in the system."}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch gap-4 w-full md:w-auto">
            <div className="relative">
              <input 
                type="number" 
                value={localGlobalSerial}
                onChange={(e) => setLocalGlobalSerial(e.target.value)}
                className={`w-full sm:w-48 px-6 py-4 border rounded-2xl outline-none font-black text-xl transition-all placeholder:text-white/20 ${isGlobalMode ? 'bg-white/20 border-white/30 text-white focus:ring-white/20' : 'bg-white/10 border-white/20 text-white focus:ring-blue-500/20 focus:border-blue-500'}`}
                placeholder="1001"
              />
              <div className={`absolute -top-2.5 left-4 px-2 text-[9px] font-black uppercase tracking-widest ${isGlobalMode ? 'bg-blue-600 text-white' : 'bg-slate-900 text-blue-400'}`}>Start From</div>
            </div>
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => onApplyGlobalSerial(localGlobalSerial)}
                className={`px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 ${isGlobalMode ? 'bg-white text-blue-600 hover:bg-blue-50' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/20'}`}
              >
                <ShieldCheck className="w-5 h-5" />
                {isGlobalMode ? 'Update Sequence' : 'Apply Global Serial'}
              </button>
              {isGlobalMode && (
                <button 
                  onClick={onToggleGlobalMode}
                  className="text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-white transition-colors"
                >
                  Switch back to Customer Prefixes
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Customer List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredCustomers.map((customer: CustomerSettings) => (
          <div 
            key={customer.name} 
            className="group bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row">
              {/* Left Side: Identity */}
              <div className="p-8 lg:w-1/3 bg-slate-50/50 border-b lg:border-b-0 lg:border-r border-slate-100 flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-white border-2 border-slate-100 rounded-2xl shadow-sm flex items-center justify-center text-2xl font-black text-blue-600 group-hover:scale-110 transition-transform duration-500">
                      {customer.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-2">{customer.name}</h3>
                      <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Active Account
                      </div>
                    </div>
                  </div>
                  <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="mt-8 p-4 bg-white rounded-2xl border border-slate-100 space-y-2">
                   <div className="flex items-center gap-2 text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                      <Info className="w-3 h-3" />
                      <span>Quick Preview</span>
                   </div>
                   <div className="text-xs font-medium text-slate-500">
                      Invoices for this client will start with <span className="font-bold text-slate-900">{customer.serialPrefix}{customer.startingSerial}</span>
                   </div>
                </div>
              </div>

              {/* Right Side: Inputs */}
              <div className="p-8 flex-1 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    <Type className="w-3 h-3" />
                    <span>Serial Prefix</span>
                  </div>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={customer.serialPrefix}
                      onChange={(e) => onUpdate(customer.name, { ...customer, serialPrefix: e.target.value })}
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white outline-none font-bold text-slate-900 transition-all"
                      placeholder="e.g. INV-2026-"
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium">Appears before the number</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    <Hash className="w-3 h-3" />
                    <span>Starting Number</span>
                  </div>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={customer.startingSerial}
                      onChange={(e) => onUpdate(customer.name, { ...customer, startingSerial: parseInt(e.target.value) || 1 })}
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white outline-none font-bold text-slate-900 transition-all"
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium">First invoice serial</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    <CalendarClock className="w-3 h-3" />
                    <span>Payment Terms</span>
                  </div>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={customer.dueDateDays}
                      onChange={(e) => onUpdate(customer.name, { ...customer, dueDateDays: parseInt(e.target.value) || 0 })}
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white outline-none font-bold text-slate-900 transition-all"
                    />
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 uppercase">Days</div>
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium">Days until due</p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredCustomers.length === 0 && (
          <div className="py-20 text-center space-y-4 bg-white rounded-3xl border border-dashed border-slate-300">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
              <Search className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">No customers found</h3>
              <p className="text-slate-500">Try adjusting your search filter</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerScreen;
