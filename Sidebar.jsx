import React, { useState } from "react";
import {
  LayoutDashboard,
  Wallet,
  CreditCard,
  BarChart3,
  User,
  LogOut,
  Menu,
  ChevronLeft,
} from "lucide-react";
import SidebarItem from "./SidebarItem";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  
  const navigate = useNavigate(); // 2. Get the navigate function
  const handleLogout = () => {
    // 3. Clear any session data (Optional)
    // localStorage.removeItem("user_token"); 
    
    // 4. Redirect to login
    navigate("/login"); 
  };

  return (
    <div
      className={`h-screen fixed left-0 top-0 z-50 flex flex-col
        bg-slate-900/95 backdrop-blur-xl border-r border-white/10
        transition-all duration-300 ease-in-out
        ${isOpen ? "w-64" : "w-20"}`}
    >
      {/* --- HEADER SECTION --- */}
      <div className="p-6 flex items-center justify-between">
        {isOpen && (
          <h1 className="font-black text-xl text-white tracking-tight animate-in fade-in duration-500">
            Dept<span className="text-blue-500">Master</span>
          </h1>
        )}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`p-2 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-colors ${!isOpen && "mx-auto"}`}
        >
          {isOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* --- NAV LINKS --- */}
      <nav className="flex-1 px-4 space-y-2 mt-4">
        <SidebarItem icon={LayoutDashboard} label="Dashboard" isOpen={isOpen} to="/dashboard"/>
        <SidebarItem icon={Wallet} label="Debts" isOpen={isOpen} to="/debts" />
        <SidebarItem icon={CreditCard} label="Payments" isOpen={isOpen} to="/payments" />
        <SidebarItem icon={BarChart3} label="Reports" isOpen={isOpen} to="/reports" />
        
        <div className="my-4 border-t border-white/10 mx-2" />
        
        <SidebarItem icon={User} label="Profile" isOpen={isOpen} to="/profile" />
      </nav>

      {/* --- FOOTER SECTION --- */}
      <div className="p-4 border-t border-white/5">
        <SidebarItem
          icon={LogOut}
          label="Logout"
          isOpen={isOpen}
          danger
          onClick={handleLogout} 
          to="/login"// 5. Pass the function
        />
      </div>
    </div>
  );
}