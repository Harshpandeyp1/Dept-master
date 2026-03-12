import React from "react";
import { Link } from "react-router-dom";

export default function SidebarItem({
  icon: Icon,
  label,
  isOpen,
  to,
  danger,
  onClick, // ✅ accept onClick
}) {

  const baseClasses = `
    flex items-center gap-4 p-3 rounded-xl transition-all duration-200
    ${danger 
      ? "hover:bg-red-500/20 text-red-400" 
      : "hover:bg-blue-600/10 text-slate-400 hover:text-white"}
    ${!isOpen && "justify-center px-0"}
  `;

  // ✅ If "to" exists → render Link
  if (to) {
    return (
      <Link to={to} className={baseClasses}>
        <Icon size={22} className="shrink-0" />
        {isOpen && (
          <span className="font-medium whitespace-nowrap">
            {label}
          </span>
        )}
      </Link>
    );
  }

  // ✅ Otherwise render Button (for logout)
  return (
    <button onClick={onClick} className={baseClasses}>
      <Icon size={22} className="shrink-0" />
      {isOpen && (
        <span className="font-medium whitespace-nowrap">
          {label}
        </span>
      )}
    </button>
  );
}
