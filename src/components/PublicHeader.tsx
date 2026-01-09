"use client";

import Link from "next/link";

export default function PublicHeader() {
  return (
    <header className="absolute top-6 left-0 w-full z-20">
      <div className="mx-auto max-w-6xl px-8 h-20 flex items-center justify-between bg-black/35 backdrop-blur-sm rounded-xl">
        <div className="flex items-center gap-3">
          <div className="h-13 w-13 rounded-full bg-white flex items-center justify-center">
            <img src="/button.png" alt="Vote Icon" className="h-8 w-8" />
          </div>
          <span className="text-white font-semibold text-lg tracking-tight">
            MSLR
          </span>
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="/auth?mode=login"
            className="text-sm font-medium text-white/90 hover:text-white transition"
          >
            Login
          </Link>

          <Link
            href="/auth?mode=register"
            className="px-6 py-2.5 rounded-md bg-blue-700 text-sm font-medium text-white hover:bg-blue-800 transition"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}
