"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Sidebar from "@/components/ec/Sidebar";
import Navbar from "@/components/ec/Navbar";
import { useRouter } from "next/navigation";

interface Referendum {
  _id: string;
  title: string;
  status: "draft" | "open" | "closed";
  totalVotes: number;
}

export default function ClosedReferendumsPage() {
  const router = useRouter();
  const [referendums, setReferendums] = useState<Referendum[]>([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/admin/referendums");
      const data = await res.json();
      setReferendums(data.filter((r: Referendum) => r.status === "closed"));
    }
    load();
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  }

  const statusBadge = (status: Referendum["status"]) => {
    if (status === "open") {
      return "bg-green-100 text-green-700 border border-green-300";
    }
    if (status === "closed") {
      return "bg-red-100 text-red-700 border border-red-300";
    }
    return "bg-slate-100 text-slate-600 border border-slate-300";
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />

      <main className="flex-1 flex flex-col">
        <Navbar
          subtitle="Election Commission"
          title="Closed Referendums"
          onLogout={handleLogout}
        />

        <div className="p-10 space-y-6">
        <div className="flex items-center gap-4">
              <Link
                href="/ec/dashboard"
                className="px-4 py-2 text-sm border rounded-lg bg-white hover:bg-indigo-600  hover:text-white  transition"
              >
                ← Dashboard
              </Link>

            </div>

          <div className="bg-white rounded-xl border overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-4 text-left text-sm">Title</th>
                  <th className="px-4 py-4 text-left text-sm">Status</th>
                  <th className="px-4 py-4 text-center text-sm">
                    Total Votes
                  </th>
                  <th className="px-4 py-4 text-center text-sm w-28">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {referendums.map((ref) => (
                  <motion.tr
                    key={ref._id}
                    whileHover={{ backgroundColor: "#f8fafc" }}
                  >
                    <td className="px-4 py-6 text-sm font-medium">
                      {ref.title}
                    </td>

                    <td className="px-4 py-6">
                      <span
                        className={`px-4 py-1 rounded-full text-xs font-semibold uppercase ${statusBadge(
                          ref.status
                        )}`}
                      >
                        {ref.status}
                      </span>
                    </td>

                    <td className="px-4 py-6 text-center text-sm">
                      {ref.totalVotes}
                    </td>

                    <td className="px-4 py-6 text-center">
                      <Link
                        href={`/ec/referendum/${ref._id}`}
                        className="px-4 py-2 border rounded-md text-sm"
                      >
                        View
                      </Link>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
