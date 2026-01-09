"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LayoutDashboard, FileText, User, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

interface Referendum {
  referendum_id: string;
  title: string;
  description: string;
  status: string;
  total_votes: number;
  eligible_voters: number;
  has_voted?: boolean;
}

interface UserType {
  name: string;
  email: string;
}

export default function VoterDashboard() {
  const [referendums, setReferendums] = useState<Referendum[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [user, setUser] = useState<UserType | null>(null);
  const router = useRouter();

  useEffect(() => {
    let interval: NodeJS.Timeout;

    async function loadData() {
      const userRes = await fetch("/api/auth/me", { cache: "no-store" });
      const userData = await userRes.json();
      setUser(userData);

      const refRes = await fetch("/api/voter/referendums", {
        cache: "no-store",
      });
      const refData = await refRes.json();
      setReferendums(refData.referendums || []);
    }

    loadData();
    interval = setInterval(loadData, 10000);

    return () => clearInterval(interval);
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  }

  return (
    <div className="min-h-screen bg-[#f4f6fb] flex">
      <aside className="w-72 bg-white border-r flex flex-col justify-between px-6 py-8">
        <div>
          <div className="flex items-center gap-3 mb-12">
            <div className="h-11 w-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg">
              M
            </div>
            <h2 className="text-xl font-bold text-slate-800">MSLR</h2>
          </div>

          <nav className="space-y-1 text-slate-600">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-50 text-indigo-600 font-medium">
              <LayoutDashboard size={18} />
              Dashboard
            </div>

            <Link
              href="/voter/voted-referendums"
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 transition"
            >
              <FileText size={18} />
              My Voted Referendums
            </Link>

            <Link
              href="/voter/profile"
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 transition"
            >
              <User size={18} />
              Profile
            </Link>
          </nav>
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="h-20 bg-white border-b flex items-center justify-between px-10">
          <div>
            <p className="text-xs text-slate-500">Dashboard</p>
            <h1 className="text-2xl font-semibold text-slate-800">
              Voter Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-xl">
              <div className="h-9 w-9 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold">
                {user?.name?.[0] || "V"}
              </div>
              <span className="font-medium text-slate-700">
                {user?.name || "Voter"}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </header>

        <div className="p-10 space-y-10">
          <div className="rounded-3xl bg-linear-to-r from-indigo-100 to-blue-100 p-8">
            <h2 className="text-2xl font-semibold text-slate-800">
              Welcome back, {user?.name || "Voter"} 👋
            </h2>
            <p className="text-slate-600 mt-1">
              Participate in active referendums securely
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-6">
              Active Referendums
            </h2>

            <div className="space-y-6">
              {referendums.map((ref) => (
                <div
                  key={ref.referendum_id}
                  className="bg-white rounded-2xl shadow-sm border hover:shadow-md transition"
                >
                  <div className="p-6 flex justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{ref.title}</h3>
                      <p className="text-slate-600 mt-1">
                        {ref.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                        OPEN
                      </span>

                      <button
                        onClick={() =>
                          setExpanded(
                            expanded === ref.referendum_id
                              ? null
                              : ref.referendum_id
                          )
                        }
                        className="text-indigo-600 font-medium"
                      >
                        {expanded === ref.referendum_id
                          ? "Hide"
                          : "View Details"}
                      </button>
                    </div>
                  </div>

                  {expanded === ref.referendum_id && (
                    <div className="border-t px-6 py-5 grid grid-cols-4 items-center gap-4">
                      <div>
                        <p className="text-sm text-slate-500">Total Votes</p>
                        <p className="font-semibold">{ref.total_votes}</p>
                      </div>

                      <div>
                        <p className="text-sm text-slate-500">
                          Eligible Voters
                        </p>
                        <p className="font-semibold">
                          {ref.eligible_voters}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-slate-500">Your Vote</p>
                        <p
                          className={`font-semibold ${
                            ref.has_voted
                              ? "text-green-600"
                              : "text-red-400"
                          }`}
                        >
                          {ref.has_voted ? "Voted" : "Not voted"}
                        </p>
                      </div>

                      <div className="text-right">
                        {ref.has_voted ? (
                          <button
                            disabled
                            className="px-6 py-2 rounded-lg bg-slate-300 text-slate-600 cursor-not-allowed"
                          >
                            Already Voted
                          </button>
                        ) : (
                          <Link
                            href={`/voter/referendum/${ref.referendum_id}`}
                            className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
                          >
                            Vote Now →
                          </Link>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
