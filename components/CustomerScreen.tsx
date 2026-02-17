
import React from 'react';
import { Settings, Save } from 'lucide-react';
import { CustomerSettings } from '../types';

interface Props {
  settings: Record<string, CustomerSettings>;
  onUpdate: (name: string, settings: CustomerSettings) => void;
}

const CustomerScreen: React.FC<Props> = ({ settings, onUpdate }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Customer Settings</h2>
        <p className="text-slate-500">Configure billing preferences for each client detected in your system</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Fix: Explicitly type the map parameter as CustomerSettings to resolve 'unknown' type errors */}
        {Object.values(settings).map((customer: CustomerSettings) => (
          <div key={customer.name} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                  {customer.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">{customer.name}</h3>
                  <p className="text-xs text-slate-400 uppercase tracking-wider">Client Configuration</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Serial Prefix</label>
                <input 
                  type="text" 
                  value={customer.serialPrefix}
                  onChange={(e) => onUpdate(customer.name, { ...customer, serialPrefix: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g. INV-2026-"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Starting Serial</label>
                <input 
                  type="number" 
                  value={customer.startingSerial}
                  onChange={(e) => onUpdate(customer.name, { ...customer, startingSerial: parseInt(e.target.value) || 1 })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Payment Due (Days)</label>
                <input 
                  type="number" 
                  value={customer.dueDateDays}
                  onChange={(e) => onUpdate(customer.name, { ...customer, dueDateDays: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerScreen;
