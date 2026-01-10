"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-semibold">
                M
              </div>
              <span className="text-lg font-semibold text-white">
                MSLR
              </span>
            </div>

            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              My Shangri-La Referendum is an official online platform enabling
              citizens to securely participate in public referendums and
              democratic decision-making.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">
              Navigation
            </h4>

            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/#top"
                  scroll
                  className="hover:text-white transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/mslr/referendums"
                  className="hover:text-white transition"
                >
                  Referendums
                </Link>
              </li>
              <li>
                <Link
                  href="/auth?mode=login"
                  className="hover:text-white transition"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/auth?mode=register"
                  className="hover:text-white transition"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">
              Information
            </h4>

            <ul className="space-y-3 text-sm">
              <li>
                <span className="text-slate-400">
                  Secure voting system
                </span>
              </li>
              <li>
                <span className="text-slate-400">
                  Coursework Project
                </span>
              </li>
              <li>
                <span className="text-slate-400">
                  Academic Use Only
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-700 pt-6 text-center text-sm text-slate-400">
          © {new Date().getFullYear()} My Shangri-La Referendum. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
