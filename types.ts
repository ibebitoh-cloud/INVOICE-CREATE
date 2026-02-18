export interface BookingRow {
  Customer: string;
  BookingNo: string;
  UnitNumber: string;
  PortGo: string;
  PortGi: string;
  Trucker: string;
  Shipper: string;
  Rate: number;
  Date: string;
}

export interface CustomerSettings {
  name: string;
  dueDateDays: number;
  serialPrefix: string;
  startingSerial: number;
}

export interface CompanyInfo {
  name: string;
  subName: string;
  address: string;
  email: string;
  phone: string;
  authName: string;
  authJobTitle: string;
  authPhone: string;
  authEmail: string;
  logo: string | null;
  signature: string | null;
  watermark: string | null;
}

export type InvoiceTheme = 
  | 'minimal' 
  | 'corporate' 
  | 'elegant' 
  | 'modern-serif'
  | 'ledger-pro'
  | 'bold' 
  | 'dark' 
  | 'grid' 
  | 'classic' 
  | 'soft' 
  | 'industrial' 
  | 'compact';

export interface Invoice {
  id: string;
  bookingNo: string;
  customer: string;
  date: string;
  dueDate: string;
  serialNumber: string;
  items: BookingRow[];
  total: number;
  isStatement?: boolean;
  period?: string;
}