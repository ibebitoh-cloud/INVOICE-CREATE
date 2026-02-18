import React from 'react';
import { Upload, Trash2, Building2, ShieldCheck, Move } from 'lucide-react';
import { CompanyInfo } from '../types';

interface Props {
  info: CompanyInfo;
  onUpdate: (info: Partial<CompanyInfo>) => void;
}

const InfoScreen: React.FC<Props> = ({ info, onUpdate }) => {
  const handleFileUpload = (field: 'logo' | 'signature' | 'watermark', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate({ [field]: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFile = (field: 'logo' | 'signature' | 'watermark') => {
    onUpdate({ [field]: null });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Company Information</h2>
        <p className="text-slate-500">Manage Nile Fleet company profile and branding assets</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Info */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-600" />
              General Profile
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Company Name</label>
                  <input 
                    type="text" 
                    value={info.name}
                    onChange={(e) => onUpdate({ name: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Company Sub-Name</label>
                  <input 
                    type="text" 
                    value={info.subName}
                    onChange={(e) => onUpdate({ subName: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="e.g. GENSET"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Full Address</label>
                <textarea 
                  rows={2}
                  value={info.address}
                  onChange={(e) => onUpdate({ address: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Company Email</label>
                  <input 
                    type="email" 
                    value={info.email}
                    onChange={(e) => onUpdate({ email: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Company Phone</label>
                  <input 
                    type="text" 
                    value={info.phone}
                    onChange={(e) => onUpdate({ phone: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-green-600" />
              Authorized Person Details
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Authorized Name</label>
                  <input 
                    type="text" 
                    value={info.authName}
                    onChange={(e) => onUpdate({ authName: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="e.g. John Doe"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Job Title</label>
                  <input 
                    type="text" 
                    value={info.authJobTitle}
                    onChange={(e) => onUpdate({ authJobTitle: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="e.g. Operations Manager"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Authorized Phone</label>
                  <input 
                    type="text" 
                    value={info.authPhone}
                    onChange={(e) => onUpdate({ authPhone: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Authorized Email</label>
                  <input 
                    type="email" 
                    value={info.authEmail}
                    onChange={(e) => onUpdate({ authEmail: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Assets */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-800">Branding & Assets</h3>
            
            <AssetUpload 
              label="Company Logo"
              value={info.logo}
              onUpload={(e) => handleFileUpload('logo', e)}
              onClear={() => removeFile('logo')}
            />

            <div className="space-y-4">
              <AssetUpload 
                label="Digital Signature"
                value={info.signature}
                onUpload={(e) => handleFileUpload('signature', e)}
                onClear={() => removeFile('signature')}
                isSignature
              />
              
              {info.signature && (
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Move className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-black text-slate-700 uppercase tracking-widest">Adjust Signature Position</span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-black uppercase text-slate-400">
                        <span>Horizontal (X)</span>
                        <span>{info.signatureXOffset}px</span>
                      </div>
                      <input 
                        type="range" min="-100" max="100" 
                        value={info.signatureXOffset}
                        onChange={(e) => onUpdate({ signatureXOffset: parseInt(e.target.value) })}
                        className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-black uppercase text-slate-400">
                        <span>Vertical (Y)</span>
                        <span>{info.signatureYOffset}px</span>
                      </div>
                      <input 
                        type="range" min="-100" max="100" 
                        value={info.signatureYOffset}
                        onChange={(e) => onUpdate({ signatureYOffset: parseInt(e.target.value) })}
                        className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-black uppercase text-slate-400">
                        <span>Scale</span>
                        <span>{Math.round(info.signatureScale * 100)}%</span>
                      </div>
                      <input 
                        type="range" min="0.5" max="2" step="0.1"
                        value={info.signatureScale}
                        onChange={(e) => onUpdate({ signatureScale: parseFloat(e.target.value) })}
                        className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-400 italic">Positioning is relative to the Authorized Details block on the invoice.</p>
                </div>
              )}
            </div>

            <AssetUpload 
              label="Invoice Watermark"
              value={info.watermark}
              onUpload={(e) => handleFileUpload('watermark', e)}
              onClear={() => removeFile('watermark')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const AssetUpload: React.FC<{
  label: string;
  value: string | null;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  isSignature?: boolean;
}> = ({ label, value, onUpload, onClear, isSignature }) => (
  <div className="space-y-2">
    <label className="text-sm font-semibold text-slate-700">{label}</label>
    <div className="flex items-center gap-4">
      {value ? (
        <div className="relative group flex-1">
          <img 
            src={value} 
            alt={label} 
            className={`${isSignature ? 'h-32' : 'h-20'} w-full rounded border bg-slate-50 object-contain p-2`} 
          />
          <button 
            onClick={onClear}
            className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      ) : (
        <label className={`${isSignature ? 'h-32' : 'h-20'} flex-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 hover:border-blue-400 transition-all`}>
          <Upload className="w-5 h-5 text-slate-400 mb-1" />
          <span className="text-xs text-slate-500">Upload Image</span>
          <input type="file" className="hidden" accept="image/*" onChange={onUpload} />
        </label>
      )}
    </div>
  </div>
);

export default InfoScreen;