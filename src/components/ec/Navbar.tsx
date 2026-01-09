"use client";

import Link from "next/link";

interface NavbarProps {
  subtitle:string;
  title: string;
  
  onLogout: () => void;
}

export default function Navbar({ title,subtitle, onLogout }: NavbarProps) {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-8">
 <div>
            <p className="text-xs text-slate-500">{subtitle}</p>
            <h1 className="text-2xl font-semibold text-slate-800">
              {title}
            </h1>
          </div>

      <div className="flex items-center gap-4">
        <div className="px-4 py-2 bg-slate-100 rounded-full text-sm">
          EC
        </div>

        <button
          onClick={onLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
