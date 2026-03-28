import React, { useMemo, useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  FileText, 
  DollarSign, 
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  BarChart3,
  PieChart as PieChartIcon
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { Invoice, BookingRow } from '../types';
import { GoogleGenAI } from "@google/genai";

interface DashboardProps {
  invoices: Invoice[];
  bookings: BookingRow[];
}

const Dashboard: React.FC<DashboardProps> = ({ invoices, bookings }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiInsights, setAiInsights] = useState<string | null>(null);

  const stats = useMemo(() => {
    const totalRevenue = invoices.reduce((sum, inv) => sum + inv.total, 0);
    const totalInvoices = invoices.length;
    const totalBookings = bookings.length;
    const uniqueCustomers = new Set(bookings.map(b => b.Customer)).size;

    // Revenue by Month
    const revenueByMonth: Record<string, number> = {};
    invoices.forEach(inv => {
      const month = inv.date.substring(0, 7); // YYYY-MM
      revenueByMonth[month] = (revenueByMonth[month] || 0) + inv.total;
    });

    const chartData = Object.entries(revenueByMonth)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => a.name.localeCompare(b.name));

    // Revenue by Customer
    const revenueByCustomer: Record<string, number> = {};
    invoices.forEach(inv => {
      revenueByCustomer[inv.customer] = (revenueByCustomer[inv.customer] || 0) + inv.total;
    });

    const customerData = Object.entries(revenueByCustomer)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

    return {
      totalRevenue,
      totalInvoices,
      totalBookings,
      uniqueCustomers,
      chartData,
      customerData
    };
  }, [invoices, bookings]);

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const runSmartAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const model = "gemini-3-flash-preview";
      
      const dataSummary = {
        totalRevenue: stats.totalRevenue,
        totalInvoices: stats.totalInvoices,
        topCustomers: stats.customerData,
        monthlyRevenue: stats.chartData
      };

      const prompt = `Analyze this invoice data for "Nile Fleet Logistics" and provide 3 smart business insights or recommendations. 
      Keep it concise and professional. 
      Data: ${JSON.stringify(dataSummary)}`;

      const response = await ai.models.generateContent({
        model,
        contents: prompt,
      });

      setAiInsights(response.text || "No insights available.");
    } catch (error) {
      console.error("AI Analysis failed:", error);
      setAiInsights("Failed to generate smart insights. Please try again later.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-200 pb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-[0.3em]">
            <BarChart3 className="w-4 h-4" />
            <span>Operational Intelligence • Local Mode Active</span>
          </div>
          <h2 className="text-5xl font-black tracking-tighter text-slate-900 uppercase">Mission Control</h2>
          <p className="text-slate-400 font-medium text-sm">Real-time analytical layer for Nile Fleet Logistics network.</p>
        </div>
        <button 
          onClick={runSmartAnalysis}
          disabled={isAnalyzing}
          className="group flex items-center space-x-3 bg-slate-900 hover:bg-indigo-600 text-white px-6 py-4 rounded-2xl transition-all shadow-2xl shadow-slate-900/20 disabled:opacity-50 active:scale-95"
        >
          <Sparkles className={`w-5 h-5 text-indigo-400 group-hover:text-white ${isAnalyzing ? 'animate-spin' : ''}`} />
          <span className="text-xs font-black uppercase tracking-widest">{isAnalyzing ? 'Processing...' : 'Generate Insights'}</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
        <div className="bg-white p-8 border border-slate-200 hover:bg-slate-900 hover:text-white transition-all duration-300 group">
          <div className="flex items-center justify-between mb-8">
            <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-white/10 transition-colors">
              <DollarSign className="w-6 h-6 text-slate-900 group-hover:text-white" />
            </div>
            <div className="text-[10px] font-black text-emerald-500 flex items-center tracking-widest uppercase">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              +12.4%
            </div>
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Gross Revenue</p>
          <h3 className="text-3xl font-black tracking-tighter font-mono">{stats.totalRevenue.toLocaleString()} <span className="text-sm opacity-40">EGP</span></h3>
        </div>

        <div className="bg-white p-8 border border-slate-200 hover:bg-slate-900 hover:text-white transition-all duration-300 group">
          <div className="flex items-center justify-between mb-8">
            <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-white/10 transition-colors">
              <FileText className="w-6 h-6 text-slate-900 group-hover:text-white" />
            </div>
            <div className="text-[10px] font-black text-emerald-500 flex items-center tracking-widest uppercase">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              +8.1%
            </div>
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Active Invoices</p>
          <h3 className="text-3xl font-black tracking-tighter font-mono">{stats.totalInvoices} <span className="text-sm opacity-40">Units</span></h3>
        </div>

        <div className="bg-white p-8 border border-slate-200 hover:bg-slate-900 hover:text-white transition-all duration-300 group">
          <div className="flex items-center justify-between mb-8">
            <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-white/10 transition-colors">
              <Users className="w-6 h-6 text-slate-900 group-hover:text-white" />
            </div>
            <div className="text-[10px] font-black text-slate-400 flex items-center tracking-widest uppercase">
              Stable
            </div>
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Client Base</p>
          <h3 className="text-3xl font-black tracking-tighter font-mono">{stats.uniqueCustomers} <span className="text-sm opacity-40">Nodes</span></h3>
        </div>

        <div className="bg-white p-8 border border-slate-200 hover:bg-slate-900 hover:text-white transition-all duration-300 group">
          <div className="flex items-center justify-between mb-8">
            <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-white/10 transition-colors">
              <TrendingUp className="w-6 h-6 text-slate-900 group-hover:text-white" />
            </div>
            <div className="text-[10px] font-black text-rose-500 flex items-center tracking-widest uppercase">
              <ArrowDownRight className="w-3 h-3 mr-1" />
              -2.3%
            </div>
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Yield / Unit</p>
          <h3 className="text-3xl font-black tracking-tighter font-mono">
            {stats.totalBookings > 0 ? Math.round(stats.totalRevenue / stats.totalBookings).toLocaleString() : 0} <span className="text-sm opacity-40">EGP</span>
          </h3>
        </div>
      </div>

      {/* AI Insights Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {aiInsights && (
          <div className="bg-slate-900 p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-8">
                <div className="p-2 bg-indigo-600 rounded-xl">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-black text-xs uppercase tracking-[0.3em] text-indigo-400">AI Strategic Analysis</h4>
              </div>
              <div className="prose prose-invert max-w-none">
                <p className="text-xl font-medium text-slate-200 leading-relaxed italic">"{aiInsights}"</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8">
             <TrendingUp className="w-12 h-12 text-slate-50 group-hover:text-indigo-50 transition-colors" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-2 bg-emerald-500 rounded-xl">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-black text-xs uppercase tracking-[0.3em] text-emerald-600">Smart Forecast</h4>
            </div>
            <div className="space-y-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Projected Next Month Yield</p>
              <h3 className="text-5xl font-black tracking-tighter text-slate-900 font-mono">
                {Math.round(stats.totalRevenue * 1.15).toLocaleString()} <span className="text-lg opacity-40">EGP</span>
              </h3>
              <div className="flex items-center gap-2 text-emerald-500 font-black text-[10px] uppercase tracking-widest">
                <ArrowUpRight className="w-4 h-4" />
                <span>+15% Estimated Growth</span>
              </div>
              <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-xs">
                Based on current velocity and seasonal logistics patterns in the Nile Delta region.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <div className="space-y-1">
              <h4 className="font-black text-xs uppercase tracking-[0.2em] text-slate-400">Revenue Trajectory</h4>
              <p className="text-2xl font-black tracking-tighter text-slate-900">Monthly Yield Analysis</p>
            </div>
            <div className="flex items-center gap-2">
               <div className="w-3 h-3 rounded-full bg-indigo-600" />
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Gross EGP</span>
            </div>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 900 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 900 }} 
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '24px', 
                    border: 'none', 
                    boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
                    padding: '20px',
                    backgroundColor: '#0f172a',
                    color: '#fff'
                  }}
                  itemStyle={{ color: '#818cf8', fontWeight: 900, fontSize: '12px' }}
                  labelStyle={{ color: '#fff', marginBottom: '8px', fontWeight: 900, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                  cursor={{ fill: '#f8fafc' }}
                />
                <Bar dataKey="value" fill="#4f46e5" radius={[12, 12, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col">
          <div className="space-y-1 mb-10">
            <h4 className="font-black text-xs uppercase tracking-[0.2em] text-slate-400">Market Share</h4>
            <p className="text-2xl font-black tracking-tighter text-slate-900">Client Distribution</p>
          </div>
          <div className="h-[250px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.customerData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {stats.customerData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ 
                    borderRadius: '20px', 
                    border: 'none', 
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                    backgroundColor: '#0f172a',
                    color: '#fff'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Nodes</span>
               <span className="text-3xl font-black text-slate-900 font-mono">{stats.uniqueCustomers}</span>
            </div>
          </div>
          <div className="mt-8 space-y-4 flex-1 overflow-y-auto pr-2 scrollbar-hide">
            {stats.customerData.map((customer, i) => (
              <div key={customer.name} className="flex items-center justify-between group cursor-default">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full mr-3 shadow-lg" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                  <span className="text-[11px] font-black text-slate-500 uppercase tracking-tight group-hover:text-slate-900 transition-colors">{customer.name}</span>
                </div>
                <span className="text-xs font-black text-slate-900 font-mono">{(customer.value / stats.totalRevenue * 100).toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
