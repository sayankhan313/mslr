"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/components/ec/Sidebar";
import Navbar from "@/components/ec/Navbar";

interface Result {
  option: string;
  count: number;
}

interface Referendum {
  _id: string;
  title: string;
  description: string;
  status: "draft" | "open" | "closed";
  eligibleVoters: number;
  totalVotes: number;
  turnout: number;
  results: Result[];
}

export default function ViewReferendumPage() {
  const params = useParams();
  const router = useRouter();

  const [ref, setRef] = useState<Referendum | null>(null);
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  async function load() {
    const res = await fetch(`/api/admin/referendums/${params.id}`, {
      cache: "no-store",
    });
    const data = await res.json();
    setRef(data);
  }

  useEffect(() => {
    load();
  }, [params.id]);

  async function changeStatus(action: "open" | "close") {
    setLoading(true);
    await fetch(`/api/admin/referendums/${params.id}/${action}`, {
      method: "POST",
    });
    await load();
    setLoading(false);
  }

  async function deleteReferendum() {
    setLoading(true);
    await fetch(`/api/admin/referendums/${params.id}`, {
      method: "DELETE",
    });
    router.push("/ec/referendum");
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  }

  if (!ref) return null;

  const badge =
    ref.status === "open"
      ? "bg-green-100 text-green-700 border-green-300"
      : ref.status === "closed"
      ? "bg-red-100 text-red-700 border-red-300"
      : "bg-slate-100 text-slate-700 border-slate-300";

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />

      <main className="flex-1 flex flex-col">
        <Navbar
          subtitle="Election Commission"
          title="Referendum Details"
          onLogout={handleLogout}
        />

        <div className="p-10">
          <div className="max-w-5xl mx-auto space-y-8">
            <Link
              href="/ec/referendum"
              className="px-4 py-2 border rounded-lg bg-white hover:bg-indigo-600 hover:text-white transition inline-block"
            >
              ← Back
            </Link>

            <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
              <div className="px-10 py-8 border-b">
                <h1 className="text-3xl font-bold text-indigo-700">
                  {ref.title}
                </h1>
                <p className="mt-4 text-slate-600">{ref.description}</p>
              </div>

              <div className="px-10 py-6 grid grid-cols-4 gap-6 border-b text-center">
                <div>
                  <p className="text-sm text-slate-500">Status</p>
                  <span
                    className={`inline-block px-3 py-1 mt-1 rounded-full text-xs font-semibold border ${badge}`}
                  >
                    {ref.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Eligible Voters</p>
                  <p className="text-lg font-semibold">{ref.eligibleVoters}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Total Votes</p>
                  <p className="text-lg font-semibold">{ref.totalVotes}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Turnout</p>
                  <p className="text-lg font-semibold">{ref.turnout}%</p>
                </div>
              </div>

              <div className="px-10 py-8 space-y-5 border-b">
                {ref.results.map((r, i) => {
                  const percent =
                    ref.eligibleVoters > 0
                      ? Math.round(
                          (r.count / ref.eligibleVoters) * 100
                        )
                      : 0;

                  return (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">{r.option}</span>
                        <span>
                          {r.count} / {ref.eligibleVoters}
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-3">
                        <div
                          className="h-3 rounded-full bg-indigo-600"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="px-10 py-8 flex gap-4 flex-wrap">
                {ref.status === "draft" && (
                  <>
                    <Link
                      href={`/ec/referendum/${ref._id}/edit`}
                      className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                    >
                      Edit
                    </Link>

                    <button
                      disabled={loading}
                      onClick={() => setShowConfirm(true)}
                      className="px-5 py-2.5 border rounded-lg hover:bg-green-600 hover:text-white transition disabled:opacity-50"
                    >
                      Open Referendum
                    </button>
                  </>
                )}

                {ref.status === "open" && (
                  <button
                    disabled={loading}
                    onClick={() => changeStatus("close")}
                    className="px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                  >
                    Close Referendum
                  </button>
                )}

                {ref.status === "closed" && (
                  <button
                    disabled={loading}
                    onClick={() => changeStatus("open")}
                    className="px-5 py-2.5 border rounded-lg hover:bg-green-600 hover:text-white transition disabled:opacity-50"
                  >
                    Reopen Referendum
                  </button>
                )}

                {(ref.status === "draft" || ref.status === "closed") && (
                  <button
                    disabled={loading}
                    onClick={() => setShowDeleteConfirm(true)}
                    className="px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                  >
                    Delete Referendum
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold">Open Referendum?</h3>
            <p className="mt-3 text-sm text-slate-600">
              Once opened, this referendum cannot be edited.
              Voting will start immediately.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                disabled={loading}
                onClick={async () => {
                  setShowConfirm(false);
                  await changeStatus("open");
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Open
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-red-600">
              Delete Referendum?
            </h3>
            <p className="mt-3 text-sm text-slate-600">
              This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                disabled={loading}
                onClick={async () => {
                  setShowDeleteConfirm(false);
                  await deleteReferendum();
                }}
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
