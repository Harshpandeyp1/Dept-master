import { Target } from "lucide-react";
import React from "react";
export default function Navbar() {
  return (
    <header className="h-24 bg-white/40 backdrop-blur-md border-b flex items-center justify-center px-70 z-10">
      <div className="flex items-center gap-4">
        <div className="bg-blue-600 p-2.5 rounded-2xl">
          <Target size={28} className="text-white" />
        </div>
        <h1 className="text-2xl font-black italic text-black ">
          Dept Master <span className="text-blue-600">India</span>
          <p className="text-sm mt-1 text-blue-600">Financial freedom is a goal and today is where you start</p>
        </h1>
      </div>
    </header>
  );
}
