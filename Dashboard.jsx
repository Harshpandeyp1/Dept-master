import React, { useState, useMemo } from "react";
import {
  Wallet,
  CreditCard,
  BarChart3,
  ShieldCheck,
  AlertTriangle,
  TrendingUp,
  PlusCircle,
  Calculator,
  RefreshCcw,
  Trash2,
  Banknote,
} from "lucide-react";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Dashboard() {
  /* ================= STATE ================= */
  const [debts, setDebts] = useState([
    { name: "Home Loan", amount: 200000, interest: 8 },
    { name: "Car Loan", amount: 120000, interest: 9 },
    { name: "Personal Loan", amount: 80000, interest: 14 },
    { name: "Credit Card", amount: 50000, interest: 24 },
  ]);

  const [formData, setFormData] = useState({ name: "", amount: "", interest: "" });

  /* ================= CALCULATIONS ================= */
  const totalDebt = useMemo(() => debts.reduce((sum, d) => sum + d.amount, 0), [debts]);
  const totalInterest = useMemo(() => debts.reduce((sum, d) => sum + (d.amount * d.interest) / 100, 0), [debts]);
  const monthlyEMI = Math.round(totalDebt / 24);

  /* ================= ACTIONS ================= */
  const handleAddDebt = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.amount) return;
    setDebts([...debts, { ...formData, amount: Number(formData.amount), interest: Number(formData.interest) }]);
    setFormData({ name: "", amount: "", interest: "" });
  };

  const deleteDebt = (index) => {
    setDebts(debts.filter((_, i) => i !== index));
  };

  const COLORS = ["#6366F1", "#F59E0B", "#10B981", "#EF4444", "#8B5CF6"];

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200">
      <Navbar />
      <Sidebar />

      <div className="pt-24 pl-16 md:pl-64 p-8">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Debt Management</h1>
          <p className="text-slate-400 mt-2">Track, analyze, and optimize your liabilities.</p>
        </header>

        {/* --- TOP SUMMARY CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <SummaryCard title="Total Debt" value={`₹${totalDebt.toLocaleString()}`} icon={Wallet} color="text-rose-400" bg="bg-rose-400/10" />
          <SummaryCard title="Estimated EMI" value={`₹${monthlyEMI.toLocaleString()}`} icon={CreditCard} color="text-amber-400" bg="bg-amber-400/10" />
          <SummaryCard title="Active Loans" value={debts.length} icon={BarChart3} color="text-blue-400" bg="bg-blue-400/10" />
          <SummaryCard title="Risk Level" value={totalDebt < 500000 ? "Low" : "High"} icon={ShieldCheck} color="text-emerald-400" bg="bg-emerald-400/10" />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* LEFT COLUMN */}
          <div className="xl:col-span-2 space-y-8">
            
            {/* --- ADD DEBT FORM --- */}
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <PlusCircle className="text-indigo-400" /> Quick Add
              </h2>
              <form onSubmit={handleAddDebt} className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <input 
                   placeholder="Loan Name" 
                   className="bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 ring-indigo-500 outline-none transition"
                   value={formData.name}
                   onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                <input 
                   type="number" placeholder="Amount (₹)" 
                   className="bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 ring-indigo-500 outline-none transition"
                   value={formData.amount}
                   onChange={(e) => setFormData({...formData, amount: e.target.value})}
                />
                <input 
                   type="number" placeholder="Interest %" 
                   className="bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 ring-indigo-500 outline-none transition"
                   value={formData.interest}
                   onChange={(e) => setFormData({...formData, interest: e.target.value})}
                />
                <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/20">
                  Add Asset
                </button>
              </form>
            </div>

            {/* --- DEBT TABLE --- */}
            <div className="rounded-3xl bg-white/5 border border-white/10 overflow-hidden shadow-2xl">
              <table className="w-full text-left">
                <thead className="bg-white/5 text-slate-400 uppercase text-xs font-bold tracking-widest">
                  <tr>
                    <th className="px-6 py-4">Loan Source</th>
                    <th className="px-6 py-4 text-center">Rate</th>
                    <th className="px-6 py-4 text-right">Balance</th>
                    <th className="px-6 py-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {debts.map((debt, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-semibold text-white">{debt.name}</td>
                      <td className="px-6 py-4 text-center"><span className="bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded-md text-sm">{debt.interest}%</span></td>
                      <td className="px-6 py-4 text-right text-emerald-400 font-mono">₹{debt.amount.toLocaleString()}</td>
                      <td className="px-6 py-4 text-center">
                        <button onClick={() => deleteDebt(i)} className="text-slate-500 hover:text-red-400 transition">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-8">
            {/* --- DONUT CHART --- */}
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl h-[400px]">
              <h2 className="text-xl font-bold text-white mb-2">Liability Split</h2>
              <ResponsiveContainer width="100%" height="90%">
                <PieChart>
                  <Pie
                    data={debts}
                    dataKey="amount"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={5}
                  >
                    {debts.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{backgroundColor: '#1e293b', border: 'none', borderRadius: '12px'}} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <InsightAlerts totalInterest={totalInterest} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* --- REUSABLE COMPONENTS --- */

function SummaryCard({ title, value, icon: Icon, color, bg }) {
  return (
    <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:scale-[1.02] transition-transform duration-300">
      <div className={`w-12 h-12 ${bg} rounded-2xl flex items-center justify-center mb-4`}>
        <Icon className={`${color} w-6 h-6`} />
      </div>
      <p className="text-sm text-slate-400 font-medium">{title}</p>
      <h2 className="text-2xl font-black text-white mt-1">{value}</h2>
    </div>
  );
}

function InsightAlerts({ totalInterest }) {
  return (
    <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/20">
      <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <TrendingUp className="text-indigo-400" /> AI Insights
      </h2>
      <div className="space-y-4">
        <div className="flex gap-3">
          <div className="mt-1"><AlertTriangle className="text-amber-400" size={18} /></div>
          <p className="text-sm text-slate-300">You are paying <strong className="text-white">₹{Math.round(totalInterest).toLocaleString()}</strong> in interest annually. Consider refinancing.</p>
        </div>
        <div className="flex gap-3">
          <div className="mt-1"><Banknote className="text-emerald-400" size={18} /></div>
          <p className="text-sm text-slate-300">Increasing your monthly payment by 10% could clear your debt 6 months earlier.</p>
        </div>
      </div>
    </div>
  );
}