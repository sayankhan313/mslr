"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  List,
  Unlock,
  Lock,
  FileEdit,
} from "lucide-react";

export default function Sidebar() {
  const [openReferendumMenu, setOpenReferendumMenu] = useState(false);

  return (
    <aside className="w-72 bg-white border-r flex flex-col px-6 py-8">
      <div>
        <div className="flex items-center gap-3 mb-12">
          <div className="h-11 w-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg">
            M
          </div>
          <h2 className="text-xl font-bold text-slate-800">MSLR</h2>
        </div>

        <nav className="space-y-1 text-slate-600">
          <Link
            href="/ec/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100"
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>

          <button
            onClick={() => setOpenReferendumMenu(!openReferendumMenu)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-100"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5" />
              Referendums
            </div>
            {openReferendumMenu ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          {openReferendumMenu && (
            <div className="ml-11 space-y-1 text-sm">
              <Link
                href="/ec/referendum"
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100"
              >
                <List className="w-4 h-4 text-slate-500" />
                All Referendums
              </Link>

              <Link
                href="/ec/referendum/open"
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100"
              >
                <Unlock className="w-4 h-4 text-slate-500" />
                Open Referendums
              </Link>

              <Link
                href="/ec/referendum/closed"
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100"
              >
                <Lock className="w-4 h-4 text-slate-500" />
                Closed Referendums
              </Link>

              <Link
                href="/ec/referendum/draft"
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100"
              >
                <FileEdit className="w-4 h-4 text-slate-500" />
                Draft Referendums
              </Link>
            </div>
          )}

          <Link
            href="/ec/analytics"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100"
          >
            <BarChart3 className="w-5 h-5" />
            Analytics
          </Link>

          <Link
            href="/ec/results"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100"
          >
            <CheckCircle className="w-5 h-5" />
            Results
          </Link>
        </nav>
      </div>
    </aside>
  );
}
