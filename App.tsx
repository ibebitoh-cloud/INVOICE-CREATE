import React, { useState, useMemo, useEffect } from 'react';
import { 
  FileText, 
  Users, 
  Settings, 
  Plus, 
  Download, 
  Printer, 
  Eye, 
  Trash2,
  FileSpreadsheet,
  Building2,
  Info
} from 'lucide-react';
import { BookingRow, CustomerSettings, CompanyInfo, Invoice, InvoiceTheme } from './types.ts';
import { INITIAL_CSV_DATA, THEMES } from './constants.tsx';
import BookingScreen from './components/BookingScreen.tsx';
import CustomerScreen from './components/CustomerScreen.tsx';
import InfoScreen from './components/InfoScreen.tsx';
import InvoiceModal from './components/InvoiceModal.tsx';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bookings' | 'customers' | 'info'>('bookings');
  const [bookings, setBookings] = useState<BookingRow[]>([]);
  const [customerSettings, setCustomerSettings] = useState<Record<string, CustomerSettings>>({});
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    name: 'NILE FLEET',
    subName: 'GENSET',
    address: '123 Cairo Logistics Hub, Nile Delta, Egypt',
    email: 'billing@nilefleet.com',
    phone: '+20 123 456 7890',
    authName: 'Operations Manager',
    authJobTitle: 'Head of Logistics',
    authPhone: '+20 100 000 0000',
    authEmail: 'ops@nilefleet.com',
    logo: null,
    signature: null,
    watermark: null,
    signatureXOffset: 0,
    signatureYOffset: 0,
    signatureScale: 1
  });
  
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<InvoiceTheme>('minimal');
  const [invoiceOverrides, setInvoiceOverrides] = useState<Record<string, string>>({});
  const [globalSerialStart, setGlobalSerialStart] = useState<string>('1000');
  const [isGlobalMode, setIsGlobalMode] = useState<boolean>(false);

  const parseCSV = (csv: string): BookingRow[] => {
    const lines = csv.split('\n');
    return lines.slice(1).filter(l => l.trim()).map(line => {
      const values = line.split(',');
      return {
        Customer: values[0] || '',
        BookingNo: values[1] || '',
        UnitNumber: values[2] || '',
        PortGo: values[3] || '',
        PortGi: values[4] || '',
        Trucker: values[5] || '',
        Shipper: values[6] || '',
        Rate: parseFloat(values[7]) || 0,
        Date: values[8] || new Date().toISOString().split('T')[0]
      };
    });
  };

  // Initial Load
  useEffect(() => {
    const parsed = parseCSV(INITIAL_CSV_DATA);
    setBookings(parsed);
    updateCustomerSettings(parsed);
  }, []);

  const updateCustomerSettings = (rows: BookingRow[]) => {
    const uniqueCustomers = Array.from(new Set(rows.map(p => p.Customer)));
    setCustomerSettings(prev => {
      const next = { ...prev };
      uniqueCustomers.forEach((c) => {
        if (!next[c]) {
          next[c] = {
            name: c,
            dueDateDays: 15,
            serialPrefix: 'INV-2026-',
            startingSerial: 100 + Object.keys(next).length
          };
        }
      });
      return next;
    });
  };

  // Group Bookings into Invoices
  const invoices = useMemo(() => {
    const groups: Record<string, BookingRow[]> = {};
    bookings.forEach(row => {
      if (!groups[row.BookingNo]) groups[row.BookingNo] = [];
      groups[row.BookingNo].push(row);
    });

    const sortedGroups = Object.entries(groups).sort((a, b) => {
      const dateA = new Date(a[1][0].Date).getTime();
      const dateB = new Date(b[1][0].Date).getTime();
      if (dateA !== dateB) return dateA - dateB;
      return a[0].localeCompare(b[0]);
    });

    return sortedGroups.map(([bookingNo, items], index) => {
      const customerName = items[0].Customer;
      const settings = customerSettings[customerName];
      const override = invoiceOverrides[bookingNo];
      
      const baseSerial = isGlobalMode 
        ? (parseInt(globalSerialStart) + index).toString()
        : (settings 
          ? `${settings.serialPrefix}${settings.startingSerial + index}`
          : `INV-${bookingNo}`);

      const serialNum = override || baseSerial;
      
      const date = new Date(items[0].Date);
      const dueDate = new Date(date);
      dueDate.setDate(date.getDate() + (settings?.dueDateDays || 15));

      return {
        id: bookingNo,
        bookingNo,
        customer: customerName,
        date: items[0].Date,
        dueDate: dueDate.toISOString().split('T')[0],
        serialNumber: serialNum,
        items,
        total: items.reduce((sum, item) => sum + item.Rate, 0)
      } as Invoice;
    });
  }, [bookings, customerSettings, invoiceOverrides]);

  const handleUpdateCustomer = (name: string, settings: CustomerSettings) => {
    setCustomerSettings(prev => ({ ...prev, [name]: settings }));
  };

  const handleUpdateInvoiceSerial = (id: string, newSerial: string) => {
    setInvoiceOverrides(prev => ({ ...prev, [id]: newSerial }));
  };

  const handleApplyGlobalSerial = (startNum: string) => {
    setGlobalSerialStart(startNum);
    setIsGlobalMode(true);
    // Clear overrides when switching to global mode to ensure "AUTO FILL" consistency
    setInvoiceOverrides({});
  };

  const handleAddBooking = (newBooking: BookingRow) => {
    const nextBookings = [...bookings, newBooking];
    setBookings(nextBookings);
    updateCustomerSettings(nextBookings);
  };

  const handleUpdateInfo = (info: Partial<CompanyInfo>) => {
    setCompanyInfo(prev => ({ ...prev, ...info }));
  };

  const handleImportCSV = (data: BookingRow[]) => {
    setBookings(data);
    updateCustomerSettings(data);
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to remove all booking operations?')) {
      setBookings([]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <nav className="w-full md:w-64 bg-slate-900 text-white p-6 space-y-8 no-print shrink-0">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Building2 className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">NILE FLEET</h1>
        </div>

        <div className="space-y-1">
          <button 
            onClick={() => setActiveTab('bookings')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'bookings' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <FileSpreadsheet className="w-5 h-5" />
            <span className="font-medium">Bookings</span>
          </button>
          <button 
            onClick={() => setActiveTab('customers')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'customers' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <Users className="w-5 h-5" />
            <span className="font-medium">Customers</span>
          </button>
          <button 
            onClick={() => setActiveTab('info')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'info' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <Info className="w-5 h-5" />
            <span className="font-medium">My Info</span>
          </button>
        </div>

        <div className="pt-8 border-t border-slate-800">
          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-4">Invoice Theme</p>
          <div className="grid grid-cols-1 gap-2">
            {THEMES.map(theme => (
              <button
                key={theme.id}
                onClick={() => setSelectedTheme(theme.id)}
                className={`text-sm px-3 py-1.5 rounded border transition-all text-left ${selectedTheme === theme.id ? 'border-blue-500 bg-blue-500/10 text-blue-400' : 'border-slate-700 text-slate-400 hover:border-slate-500'}`}
              >
                {theme.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="flex-1 bg-slate-50 p-4 md:p-8 overflow-y-auto no-print">
        <div className="max-w-6xl mx-auto">
          {activeTab === 'bookings' && (
            <BookingScreen 
              invoices={invoices} 
              onPreview={(inv) => setSelectedInvoice(inv)}
              onImport={handleImportCSV}
              onClearAll={handleClearAll}
              onAddBooking={handleAddBooking}
              onLoadSample={() => {
                const parsed = parseCSV(INITIAL_CSV_DATA);
                handleImportCSV(parsed);
              }}
              company={companyInfo}
              theme={selectedTheme}
            />
          )}
          {activeTab === 'customers' && (
            <CustomerScreen 
              settings={customerSettings} 
              onUpdate={handleUpdateCustomer} 
              globalSerialStart={globalSerialStart}
              isGlobalMode={isGlobalMode}
              onApplyGlobalSerial={handleApplyGlobalSerial}
              onToggleGlobalMode={() => setIsGlobalMode(!isGlobalMode)}
            />
          )}
          {activeTab === 'info' && (
            <InfoScreen 
              info={companyInfo} 
              onUpdate={handleUpdateInfo} 
            />
          )}
        </div>
      </main>

      {selectedInvoice && (
        <InvoiceModal 
          invoice={selectedInvoice} 
          theme={selectedTheme} 
          company={companyInfo}
          onUpdateSerial={(newSerial) => handleUpdateInvoiceSerial(selectedInvoice.bookingNo, newSerial)}
          onClose={() => setSelectedInvoice(null)} 
        />
      )}
    </div>
  );
};

export default App;