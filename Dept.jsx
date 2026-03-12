import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Debt() {
  const [debts, setDebts] = useState([
    { name: "Home Loan", amount: 200000, interest: 8 },
    { name: "Car Loan", amount: 120000, interest: 9 },
  ]);

  // State for the new debt input form
  const [newDebt, setNewDebt] = useState({ name: "", amount: "", interest: "" });

  const handleAddDebt = (e) => {
    e.preventDefault();
    if (!newDebt.name || !newDebt.amount) return; // Basic validation

    // Add new debt to the list and reset the form
    setDebts([...debts, { ...newDebt, amount: parseFloat(newDebt.amount), interest: parseFloat(newDebt.interest) || 0 }]);
    setNewDebt({ name: "", amount: "", interest: "" });
  };

  const handleDelete = (index) => {
    const updated = debts.filter((_, i) => i !== index);
    setDebts(updated);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />
      <Sidebar />

      <div className="pt-24 pl-16 md:pl-64 p-8">
        <h1 className="text-3xl font-bold mb-8">Debt Management</h1>

        {/* --- ADD DEBT FORM --- */}
        <form 
          onSubmit={handleAddDebt}
          className="mb-8 p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-wrap gap-4 items-end"
        >
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white/60">Debt Name</label>
            <input
              type="text"
              placeholder="e.g. Credit Card"
              value={newDebt.name}
              onChange={(e) => setNewDebt({ ...newDebt, name: e.target.value })}
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ring-blue-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white/60">Amount (₹)</label>
            <input
              type="number"
              placeholder="0.00"
              value={newDebt.amount}
              onChange={(e) => setNewDebt({ ...newDebt, amount: e.target.value })}
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ring-blue-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white/60">Interest (%)</label>
            <input
              type="number"
              placeholder="%"
              value={newDebt.interest}
              onChange={(e) => setNewDebt({ ...newDebt, interest: e.target.value })}
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ring-blue-500 w-24"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg transition-all"
          >
            + Add Debt
          </button>
        </form>

        {/* --- DEBT TABLE --- */}
        <div className="overflow-hidden rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/10 text-white/80 uppercase text-xs tracking-wider">
                <th className="px-6 py-4 font-semibold">Debt Name</th>
                <th className="px-6 py-4 font-semibold">Interest Rate</th>
                <th className="px-6 py-4 font-semibold text-right">Amount</th>
                <th className="px-6 py-4 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {debts.map((debt, index) => (
                <tr key={index} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4 font-medium">{debt.name}</td>
                  <td className="px-6 py-4 text-white/60">{debt.interest}%</td>
                  <td className="px-6 py-4 text-right font-mono text-emerald-400">
                    ₹{debt.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleDelete(index)}
                      className="px-3 py-1 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white border border-red-500/50 transition-all text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {debts.length === 0 && (
            <div className="p-12 text-center text-white/40">
              <p>No debts added yet. Start by adding one above!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}