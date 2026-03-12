import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Download, TrendingDown, Calendar } from "lucide-react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const data = [
  { month: "Jan", balance: 450000, paid: 20000 },
  { month: "Feb", balance: 430000, paid: 25000 },
  { month: "Mar", balance: 405000, paid: 22000 },
  { month: "Apr", balance: 383000, paid: 30000 },
];

export default function Reports() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200">
      <Navbar />
      <Sidebar />
      <div className="pt-24 pl-16 md:pl-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-white">Financial Reports</h1>
            <p className="text-slate-400 mt-2">Analyze your debt payoff progress over time.</p>
          </div>
          <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2 rounded-xl transition">
            <Download size={18} /> Export PDF
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* DEBT REDUCTION LINE CHART */}
          <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <TrendingDown className="text-emerald-400" /> Debt Reduction Trend
            </h2>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{backgroundColor: '#1e293b', border: 'none'}} />
                  <Line type="monotone" dataKey="balance" stroke="#6366f1" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* MONTHLY PAYMENTS BAR CHART */}
          <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Calendar className="text-blue-400" /> Monthly Repayments
            </h2>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{backgroundColor: '#1e293b', border: 'none'}} />
                  <Bar dataKey="paid" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}