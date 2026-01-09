"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  User,
  LogOut,
  CheckCircle,
  Calendar,
} from "lucide-react";

interface VotedReferendum {
  referendum_id: string;
  title: string;
  description: string;
  status: string;
  voted_option: string;
  voted_at: string;
}

interface UserType {
  name: string;
}

export default function MyVotedReferendumsPage() {
  const [referendums, setReferendums] = useState<VotedReferendum[]>([]);
  const [user, setUser] = useState<UserType | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function loadData() {
      const userRes = await fetch("/api/auth/me");
      setUser(await userRes.json());

      const res = await fetch("/api/voter/voted-referendums");
      const data = await res.json();
      setReferendums(data.referendums || []);
    }
    loadData();
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  }

  return (
    <div className="min-h-screen bg-[#f4f6fb] flex">

      <aside className="w-72 bg-white border-r px-6 py-8">
        <h2 className="text-xl font-bold mb-8">MSLR</h2>

        <nav className="space-y-1 text-slate-600">
          <Link href="/voter/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100">
            <LayoutDashboard size={18} /> Dashboard
          </Link>

          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-50 text-indigo-600 font-medium">
            <FileText size={18} /> My Voted Referendums
          </div>

          <Link href="/voter/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100">
            <User size={18} /> Profile
          </Link>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col">

        <header className="h-20 bg-white border-b flex items-center justify-between px-10">
          <div>
            <p className="text-xs text-slate-500">Voter</p>
            <h1 className="text-2xl font-semibold">My Voted Referendums</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-xl">
              <div className="h-9 w-9 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold">
                {user?.name?.[0] || "V"}
              </div>
              <span className="font-medium">{user?.name}</span>
            </div>

            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500 text-white">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </header>

        <div className="p-10 space-y-6">
          {referendums.map(ref => (
            <div key={ref.referendum_id} className="bg-white rounded-2xl border p-6">
              <h3 className="text-lg font-semibold">{ref.title}</h3>
              <p className="text-slate-600">{ref.description}</p>

              <div className="mt-6 grid grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-slate-500">Status</p>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    ref.status === "open" ? "bg-green-100 text-green-700" : "bg-slate-200"
                  }`}>
                    {ref.status.toUpperCase()}
                  </span>
                </div>

                <div>
                  <p className="text-sm flex items-center gap-1">
                    <CheckCircle size={14} /> Your Vote
                  </p>
                  <p className="font-semibold text-indigo-600">{ref.voted_option}</p>
                </div>

                <div>
                  <p className="text-sm flex items-center gap-1">
                    <Calendar size={14} /> Voted On
                  </p>
                  <p>{new Date(ref.voted_at).toDateString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}


