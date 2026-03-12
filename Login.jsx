import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ChevronRight,
  Lock,
  Smartphone,
  Sparkles,
  ShieldCheck,
  User,
} from "lucide-react";
import Navbar from "./Navbar";

const deptmasterLogin =
  "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c";

export default function Login() {
  const [mode, setMode] = useState(null); // null | login | signup
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 1200);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 🔹 BACKGROUND IMAGE */}
      <img
        src="micah-williams-lmFJOx7hPc4-unsplash.jpg"
        className="fixed inset-0 w-full h-full object-cover -z-10"
        alt="background"
      />
      <div className="fixed inset-0 bg-black/40 -z-10" />

      <Navbar />

      {/* 🔹 MAIN LAYOUT */}
      <div className="flex h-[calc(100vh-96px)] items-center px-20 gap-16">
        
        {/* 🔹 LEFT CONTENT (only when mode is null) */}
        {!mode && (
          <div className="w-1/2 text-white space-y-6 transition-all duration-500">
            <h1 className="text-5xl font-black">
              Dept Master <span className="text-blue-400">India</span>
            </h1>

            <p className="text-lg text-white/80 max-w-xl">
              Dept Master helps you understand, manage, and eliminate debt
              responsibly. One dashboard. Total clarity.
            </p>

            <ul className="space-y-3 text-white/70">
              <li>✔ Track all debts in one place</li>
              <li>✔ Smart repayment guidance</li>
              <li>✔ Financial confidence, not pressure</li>
            </ul>
          </div>
        )}

        {/* 🔹 AUTH CARD WRAPPER */}
        <div
          className={`transition-all duration-700 ease-in-out ${
            mode ? "mx-auto" : "ml-auto"
          }`}
        >
          <div
            className={`relative z-10 
            bg-white/20 backdrop-blur-2xl 
            border border-white/30 
            rounded-[3rem] 
            shadow-[0_20px_60px_rgba(0,0,0,0.35)] 
            transition-all duration-700 ease-in-out 
            overflow-hidden ${
              mode ? "w-[900px] h-[550px]" : "w-[420px] h-[300px]"
            }`}
          >
            {/* 🔹 COLLAPSED CARD */}
            {!mode && (
              <div className="h-full flex flex-col items-center justify-center gap-6">
                <ShieldCheck size={48} className="text-black" />
                <h2 className="text-2xl font-black ">Welcome</h2>

                <div className="flex gap-4">
                  <button
                    onClick={() => setMode("login")}
                    className="font-bold px-6 py-3 bg-black text-white rounded-xl"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setMode("signup")}
                   className="px-6 font-bold py-3 bg-white/30 backdrop-blur border border-white rounded-xl hover:bg-white/40 transition"
 
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            )}

            {/* 🔹 EXPANDED CARD */}
            {mode && (
              <div className="grid grid-cols-2 h-full border border-black">
                
                {/* IMAGE PANEL */}
                <div className="relative">
                  <img
                    src={deptmasterLogin}
                    className="w-full h-full object-cover"
                    alt="side"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white">
                    <div className="text-center">
                      <Sparkles size={48} />
                      <h2 className="text-4xl font-black mt-4">
                        {mode === "login" ? "Welcome Back" : "Start Fresh"}
                      </h2>
                    </div>
                  </div>
                </div>

                {/* FORM */}
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col justify-center px-16 gap-4"
                >
                  {mode === "signup" && (
                    <Input icon={User} placeholder="Full Name" />
                  )}
                  <Input icon={Smartphone} placeholder="Mobile Number" />
                  <Input icon={Lock} type="password" placeholder="Password" />

                  <button
                    disabled={isLoading}
                    className="mt-6 bg-black text-white py-4 rounded-xl flex justify-center gap-2"
                  >
                    {isLoading
                      ? "Loading..."
                      : mode === "login"
                      ? "Login"
                      : "Sign Up"}
                    <ChevronRight />
                  </button>

                  <button
                    type="button"
                    onClick={() => setMode(null)}
                    className="text-sm mt-4 flex items-center gap-2 justify-center"
                  >
                    <ArrowLeft size={14} /> Back
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* 🔹 INPUT COMPONENT */
function Input({ icon: Icon, type = "text", placeholder }) {
  return (
    <div className="relative">
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 border border-black" />
      <input
        required
        type={type}
        placeholder={placeholder}
       className="w-full pl-12 py-3 rounded-xl 
        bg-white/30 backdrop-blur-md 
        border border-white/40 
        text-black placeholder:text-slate-600 
        outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}
