"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/ec/Sidebar";
import Navbar from "@/components/ec/Navbar";
import { useRouter } from "next/navigation";

interface ResultOption {
  option: string;
  count: number;
}

interface ClosedReferendum {
  _id?: string;
  title: string;
  description: string;
  closureReason: "MAJORITY" | "MANUAL" | "END_DATE" | null;
  eligibleVoters: number;
  totalVotes: number;
  results: ResultOption[];
}

export default function ResultsPage() {
  const router = useRouter();
  const [data, setData] = useState<ClosedReferendum[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/admin/results", { cache: "no-store" });
      const json = await res.json();
      setData(json);
      setLoading(false);
    }
    load();
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-600">
        Loading results…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <Sidebar />

      <main className="flex-1 flex flex-col">
        <Navbar
          subtitle="Election Commission"
          title="Referendum Results"
          onLogout={handleLogout}
        />

        <div className="p-10">
          {data.map((ref, refIndex) => {
            const maxVotes =
              ref.results.length > 0
                ? Math.max(...ref.results.map((r) => r.count))
                : 0;

            const winners = ref.results.filter(
              (r) => r.count === maxVotes && maxVotes > 0
            );

            const isTie = winners.length > 1;

            return (
              <div
                key={ref._id || refIndex}
                className="bg-white rounded-3xl border shadow-lg p-8 mb-14"
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-slate-800">
                    {ref.title}
                  </h2>
                  <p className="text-slate-600">
                    {ref.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="rounded-xl bg-indigo-50 p-4 text-center">
                    <p className="text-xs uppercase text-indigo-600">
                      Closure Reason
                    </p>
                    <p className="font-bold text-indigo-900">
                      {ref.closureReason
                        ? ref.closureReason.replace("_", " ")
                        : "Unknown"}
                    </p>
                  </div>

                  <div className="rounded-xl bg-emerald-50 p-4 text-center">
                    <p className="text-xs uppercase text-emerald-600">
                      Eligible Voters
                    </p>
                    <p className="font-bold text-emerald-900">
                      {ref.eligibleVoters}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  {ref.results.map((r, i) => {
                    const percentage =
                      ref.eligibleVoters > 0
                        ? Math.round(
                            (r.count / ref.eligibleVoters) * 100
                          )
                        : 0;

                    return (
                      <div
                        key={`${r.option}-${i}`}
                        className="border rounded-xl p-4 bg-slate-50"
                      >
                        <div className="flex justify-between text-sm font-medium mb-2">
                          <span>{r.option}</span>
                          <span>
                            {r.count} votes ({percentage}%)
                          </span>
                        </div>

                        <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-indigo-600 transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {maxVotes === 0 ? (
                  <div className="rounded-xl bg-slate-100 p-4 text-slate-600 font-medium">
                    No votes were cast
                  </div>
                ) : isTie ? (
                  <div className="rounded-xl bg-yellow-50 border border-yellow-400 p-4 font-bold text-yellow-800">
                    🤝 Tie Result
                  </div>
                ) : (
                  <div className="rounded-xl bg-green-50 border border-green-500 p-4 font-bold text-green-800">
                    🏆 {winners[0].option} wins with{" "}
                    {winners[0].count} votes
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
