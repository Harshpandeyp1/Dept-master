import React, { useState } from "react";
import { 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock,
  Plus
} from "lucide-react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Payments() {
  // Sample payment data
  const [payments, setPayments] = useState([
    { id: 1, recipient: "HDFC Home Loan", date: "2024-03-10", amount: 25000, status: "Completed", type: "EMI" },
    { id: 2, recipient: "ICICI Car Loan", date: "2024-03-08", amount: 12000, status: "Completed", type: "EMI" },
    { id: 3, recipient: "SBI Credit Card", date: "2024-03-05", amount: 5000, status: "Pending", type: "Credit" },
  ]);

  const [form, setForm] = useState({ recipient: "", amount: "", type: "EMI" });

  const handlePayment = (e) => {
    e.preventDefault();
    if (!form.recipient || !form.amount) return;
    
    const newPayment = {
      id: Date.now(),
      recipient: form.recipient,
      date: new Date().toISOString().split('T')[0],
      amount: parseFloat(form.amount),
      status: "Completed",
      type: form.type
    };

    setPayments([newPayment, ...payments]);
    setForm({ recipient: "", amount: "", type: "EMI" });
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200">
      <Navbar />
      <Sidebar />

      <div className="pt-24 pl-16 md:pl-64 p-8 transition-all duration-300">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Payments</h1>
          <p className="text-slate-400 mt-2">Manage your loan repayments and transaction history.</p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* --- LEFT: MAKE A PAYMENT FORM --- */}
          <div className="xl:col-span-1 space-y-6">
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <CreditCard className="text-blue-400" /> Record Payment
              </h2>
              
              <form onSubmit={handlePayment} className="space-y-4">
                <div>
                  <label className="text-sm text-slate-400 block mb-2">Recipient / Loan Account</label>
                  <input 
                    type="text"
                    value={form.recipient}
                    onChange={(e) => setForm({...form, recipient: e.target.value})}
                    placeholder="e.g. HDFC Home Loan"
                    className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 ring-blue-500 outline-none transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-slate-400 block mb-2">Amount (₹)</label>
                    <input 
                      type="number"
                      value={form.amount}
                      onChange={(e) => setForm({...form, amount: e.target.value})}
                      placeholder="0.00"
                      className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 ring-blue-500 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-400 block mb-2">Category</label>
                    <select 
                      value={form.type}
                      onChange={(e) => setForm({...form, type: e.target.value})}
                      className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 ring-blue-500 outline-none transition appearance-none"
                    >
                      <option value="EMI">EMI</option>
                      <option value="Credit">Credit Card</option>
                      <option value="Overdue">Overdue</option>
                    </select>
                  </div>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2">
                  <Plus size={20} /> Confirm Payment
                </button>
              </form>
            </div>

            {/* QUICK STATS */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-500/20">
              <p className="text-slate-400 text-sm">Monthly Paid Out</p>
              <h3 className="text-3xl font-black text-white mt-1">₹42,000</h3>
              <div className="flex items-center gap-2 text-emerald-400 text-sm mt-2">
                <ArrowUpRight size={16} />
                <span>8% more than last month</span>
              </div>
            </div>
          </div>

          {/* --- RIGHT: TRANSACTION HISTORY --- */}
          <div className="xl:col-span-2">
            <div className="rounded-3xl bg-white/5 border border-white/10 overflow-hidden shadow-2xl backdrop-blur-md">
              <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-xl font-bold text-white">Recent Transactions</h2>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input 
                    placeholder="Search payments..." 
                    className="w-full bg-slate-800/50 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:ring-1 ring-blue-500"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-white/5 text-slate-400 uppercase text-xs font-bold tracking-widest">
                    <tr>
                      <th className="px-6 py-4">Recipient</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Type</th>
                      <th className="px-6 py-4 text-right">Amount</th>
                      <th className="px-6 py-4 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {payments.map((p) => (
                      <tr key={p.id} className="hover:bg-white/5 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                              <ArrowDownLeft size={16} />
                            </div>
                            <span className="font-semibold text-white">{p.recipient}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-400 text-sm">{p.date}</td>
                        <td className="px-6 py-4">
                          <span className="text-xs bg-slate-800 px-2 py-1 rounded border border-white/10">{p.type}</span>
                        </td>
                        <td className="px-6 py-4 text-right font-mono text-white font-bold">
                          ₹{p.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center">
                            {p.status === "Completed" ? (
                              <span className="flex items-center gap-1 text-emerald-400 text-xs bg-emerald-400/10 px-2 py-1 rounded-full">
                                <CheckCircle2 size={12} /> Success
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-amber-400 text-xs bg-amber-400/10 px-2 py-1 rounded-full">
                                <Clock size={12} /> Pending
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {payments.length === 0 && (
                <div className="p-20 text-center text-slate-500">
                  No payment history found.
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}