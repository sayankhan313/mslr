"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";

import Sidebar from "@/components/ec/Sidebar";
import Navbar from "@/components/ec/Navbar";

interface Referendum {
  _id: string;
  title: string;
  status: "draft" | "open" | "closed";
  totalVotes: number;
}

export default function AllReferendumsPage() {
  const router = useRouter();
  const [referendums, setReferendums] = useState<Referendum[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function loadReferendums() {
    const res = await fetch("/api/admin/referendums");
    const data = await res.json();
    setReferendums(data);
  }

  useEffect(() => {
    loadReferendums();
  }, []);

  async function deleteReferendum() {
    if (!deleteId) return;

    setLoading(true);
    await fetch(`/api/admin/referendums/${deleteId}`, {
      method: "DELETE",
    });

    setDeleteId(null);
    setLoading(false);
    loadReferendums();
  }

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
          title="All Referendums"
          onLogout={handleLogout}
        />

        <div className="p-10 space-y-8">
          <div className="flex items-center justify-between">
            <Link
              href="/ec/dashboard"
              className="px-4 py-2 text-sm border rounded-lg bg-white hover:bg-indigo-600 hover:text-white transition"
            >
              ← Dashboard
            </Link>

            <Link
              href="/ec/referendum/create"
              className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create Referendum
            </Link>
          </div>

          <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-4 text-left text-sm font-semibold">
                    Title
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-semibold">
                    Status
                  </th>
                  <th className="px-4 py-4 text-center text-sm font-semibold">
                    Total Votes
                  </th>
                  <th className="px-4 py-4 text-center text-sm font-semibold w-40">
                    Actions
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

                    <td className="px-4 py-6 text-center flex justify-center gap-2">
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
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
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
              This action is permanent and cannot be undone.
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
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
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
