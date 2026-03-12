import React from "react";
import { User, Mail, Shield, Bell, Save } from "lucide-react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Profile() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200">
      <Navbar />
      <Sidebar />
      <div className="pt-24 pl-16 md:pl-64 p-8">
        <h1 className="text-4xl font-extrabold text-white mb-8">User Profile</h1>

        <div className="max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* USER INFO CARD */}
          <div className="md:col-span-1 p-8 rounded-3xl bg-white/5 border border-white/10 text-center">
            <div className="w-24 h-24 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-white shadow-xl shadow-blue-600/20">
              JS
            </div>
            <h2 className="text-xl font-bold text-white">John Sharma</h2>
            <p className="text-slate-400 text-sm">Premium Member</p>
            <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
               <div className="flex items-center gap-2 text-sm text-slate-400"><Mail size={14}/> john@example.com</div>
               <div className="flex items-center gap-2 text-sm text-slate-400"><Shield size={14}/> Verified Account</div>
            </div>
          </div>

          {/* EDIT FORM */}
          <div className="md:col-span-2 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
            <h3 className="text-xl font-bold text-white mb-6">Account Settings</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-slate-400">Full Name</label>
                  <input className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-2 outline-none focus:ring-2 ring-blue-500" defaultValue="John Sharma" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-400">Currency</label>
                  <select className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-2 outline-none">
                    <option>INR (₹)</option>
                    <option>USD ($)</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                <div className="flex items-center gap-3">
                  <Bell className="text-yellow-400" />
                  <div>
                    <p className="text-sm font-bold">Payment Reminders</p>
                    <p className="text-xs text-slate-400">Get notified 2 days before EMI</p>
                  </div>
                </div>
                <input type="checkbox" className="w-5 h-5 accent-blue-600" defaultChecked />
              </div>
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-xl transition shadow-lg shadow-blue-600/20">
                <Save size={18} /> Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}