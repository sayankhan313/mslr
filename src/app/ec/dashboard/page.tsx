"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Plus,
  FileText,
  FilePen,
  FolderOpen,
  FolderCheck,
  Trash2,
} from "lucide-react";

import Sidebar from "@/components/ec/Sidebar";
import Navbar from "@/components/ec/Navbar";
import StatCard from "@/components/ec/StatCard";

interface Referendum {
  _id: string;
  title: string;
  status: "draft" | "open" | "closed";
  totalVotes: number;
}

export default function ECDashboard() {
  const router = useRouter();

  const [referendums, setReferendums] = useState<Referendum[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    draft: 0,
    open: 0,
    closed: 0,
  });

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadDashboard() {
      const res = await fetch("/api/admin/referendums");
      const data = await res.json();

      setReferendums(data);

      setStats({
        total: data.length,
        draft: data.filter((r: Referendum) => r.status === "draft").length,
        open: data.filter((r: Referendum) => r.status === "open").length,
        closed: data.filter((r: Referendum) => r.status === "closed").length,
      });
    }

    loadDashboard();
  }, []);

  async function deleteReferendum() {
    if (!deleteId) return;

    setLoading(true);
    await fetch(`/api/admin/referendums/${deleteId}`, {
      method: "DELETE",
    });

    setDeleteId(null);
    setLoading(false);

    const res = await fetch("/api/admin/referendums");
    const data = await res.json();
    setReferendums(data);
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  }

  const statusBadge = (status: Referendum["status"]) => {
    if (status === "open")
      return "bg-green-100 text-green-700 border border-green-300";
    if (status === "closed")
      return "bg-red-100 text-red-700 border border-red-300";
    return "bg-slate-100 text-slate-600 border border-slate-300";
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />

      <main className="flex-1 flex flex-col">
        <Navbar
          subtitle="Dashboard"
          title="Election Commission Dashboard"
          onLogout={handleLogout}
        />

        <div className="p-10 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Referendums"
              value={stats.total}
              icon={<FileText className="w-5 h-5" />}
              link="/ec/referendum"
            />
            <StatCard
              title="Draft Referendums"
              value={stats.draft}
              icon={<FilePen className="w-5 h-5" />}
              link="/ec/referendum/draft"
            />
            <StatCard
              title="Open Referendums"
              value={stats.open}
              highlight="green"
              icon={<FolderOpen className="w-5 h-5" />}
              link="/ec/referendum/open"
            />
            <StatCard
              title="Closed Referendums"
              value={stats.closed}
              highlight="red"
              icon={<FolderCheck className="w-5 h-5" />}
              link="/ec/referendum/closed"
            />
          </div>


          <div className="flex justify-between items-center">
            <div className="flex gap-3">
              <Link
                href="/ec/referendum"
                className="px-5 py-2.5 bg-white border rounded-xl text-sm hover:bg-indigo-600 hover:text-white transition"
              >
                All Referendums
              </Link>
              <Link
                href="/ec/referendum/open"
                className="px-5 py-2.5 bg-white border rounded-xl text-sm hover:bg-indigo-600 hover:text-white transition"
              >
                Open
              </Link>
              <Link
                href="/ec/referendum/closed"
                className="px-5 py-2.5 bg-white border rounded-xl text-sm hover:bg-indigo-600 hover:text-white transition"
              >
                Closed
              </Link>
            </div>

            <Link
              href="/ec/referendum/create"
              className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create Referendum
            </Link>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-6">
              Recent Referendums
            </h2>

            <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-4 text-left text-sm">Title</th>
                    <th className="px-4 py-4 text-left text-sm">Status</th>
                    <th className="px-4 py-4 text-center text-sm">Total Votes</th>
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

                      <td className="px-4 py-6 text-sm text-center">
                        {ref.totalVotes}
                      </td>

                      <td className="px-4 py-6 text-center">
                        <div className="flex justify-center gap-2">
                          <Link
                            href={`/ec/referendum/${ref._id}`}
                            className="px-3 py-2 border rounded-md text-sm hover:bg-indigo-600 hover:text-white transition"
                          >
                            View
                          </Link>

                          {ref.status === "draft" && (
                            <Link
                              href={`/ec/referendum/${ref._id}/edit`}
                              className="px-3 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 transition"
                            >
                              Edit
                            </Link>
                          )}

                          {(ref.status === "draft" ||
                            ref.status === "closed") && (
                            <button
                              onClick={() => setDeleteId(ref._id)}
                              className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-red-600">
              Delete Referendum?
            </h3>

            <p className="mt-2 text-sm text-slate-600">
              This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                disabled={loading}
                onClick={deleteReferendum}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
