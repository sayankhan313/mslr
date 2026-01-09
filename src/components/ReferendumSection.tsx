"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function ReferendumSection() {
  const router = useRouter();
  const [refId, setRefId] = useState("");

  return (
    <section className="w-full bg-slate-100 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl px-10 py-16 shadow-sm">
          <div className="mb-14 text-center">
            <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900">
              Referendum Services
            </h2>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
              Access public referendums, voting records, and official council decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                Browse Referendums
              </h3>

              <p className="text-slate-600 mb-6">
                View all public referendums issued by the Shangri-La council.
              </p>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => router.push("/mslr/referendums")}
                  className="w-full rounded-md border border-slate-300 bg-white text-slate-800 py-2.5 text-sm font-medium hover:bg-blue-600 hover:text-white hover:border-blue-600 transition"
                >
                  View All Referendums
                </button>

                <button
                  onClick={() => router.push("/mslr/referendums?status=open")}
                  className="w-full rounded-md border border-slate-300 bg-white text-slate-800 py-2.5 text-sm font-medium hover:bg-blue-600 hover:text-white hover:border-blue-600 transition"
                >
                  View Open Referendums
                </button>

                <button
                  onClick={() => router.push("/mslr/referendums?status=closed")}
                  className="w-full rounded-md border border-slate-300 bg-white text-slate-800 py-2.5 text-sm font-medium hover:bg-blue-600 hover:text-white hover:border-blue-600 transition"
                >
                  View Closed Referendums
                </button>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                Find Referendum by ID
              </h3>

              <p className="text-slate-600 mb-6">
                Enter a referendum ID to view details of Referendum"
              </p>

              <div className="flex flex-col gap-4">
                <input
                  value={refId}
                  onChange={(e) => setRefId(e.target.value)}
                  placeholder="Enter Referendum ID"
                  className="w-full rounded-md border border-slate-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 "
                  
                />

                <button
                  onClick={() => {
                    if (refId.trim()) {
                      router.push(`/mslr/referendums/${refId}`);
                    }
                  }}
                  className="w-full rounded-md bg-blue-600 text-white py-2.5 text-sm font-medium hover:bg-blue-700 transition"
                >
                  
                  Search Referendum
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
