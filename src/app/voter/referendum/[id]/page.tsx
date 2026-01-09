"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface Option {
  optionIndex: number;
  text: string;
  votes: number;
}

interface ReferendumDetail {
  referendum_id: string;
  title: string;
  description: string;
  status: string;
  start_date: string;
  end_date: string;
  options: Option[];
}

export default function ReferendumVotePage() {
  const { id } = useParams();
  const router = useRouter();

  const [data, setData] = useState<ReferendumDetail | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/voter/referendums/${id}`)
      .then(res => res.json())
      .then(setData);
  }, [id]);

  async function submitVote() {
    if (selected === null) return;

    setLoading(true);
    const res = await fetch("/api/vote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        referendumId: id,
        optionIndex: selected,
      }),
    });

    if (res.ok) {
      router.push("/voter/dashboard");
    } else {
      alert("You have already voted or voting is closed.");
    }
    setLoading(false);
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-[#f4f6fb] flex">
      
      
      <aside className="w-72 bg-white border-r px-6 py-8">
        <h2 className="text-xl font-bold mb-8">MSLR</h2>
        <Link href="/voter/dashboard" className="text-indigo-600 font-medium">
          ← Back to Dashboard
        </Link>
      </aside>

      
      <main className="flex-1 p-10 space-y-8">

       
        <div className="bg-white rounded-2xl p-8 shadow-sm border">
          <h1 className="text-2xl font-semibold">{data.title}</h1>
          <span className="inline-block mt-2 px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
            {data.status.toUpperCase()}
          </span>

          <p className="mt-4 text-slate-600">{data.description}</p>

          <div className="mt-6 grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-slate-500">Start Date</p>
              <p className="font-medium">
                {new Date(data.start_date).toDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-500">End Date</p>
              <p className="font-medium">
                {new Date(data.end_date).toDateString()}
              </p>
            </div>
          </div>
        </div>

        
        <div className="bg-white rounded-2xl p-8 shadow-sm border">
          <h2 className="text-xl font-semibold mb-6">Cast Your Vote</h2>

          <div className="space-y-4">
            {data.options.map(opt => (
              <label
                key={opt.optionIndex}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="radio"
                  name="vote"
                  checked={selected === opt.optionIndex}
                  onChange={() => setSelected(opt.optionIndex)}
                  className="h-4 w-4 text-indigo-600"
                />
                <span className="text-slate-700">{opt.text}</span>
              </label>
            ))}
          </div>

          <button
            onClick={submitVote}
            disabled={loading || selected === null}
            className="mt-6 px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            Submit Vote →
          </button>

          <p className="mt-4 text-sm text-slate-500">
            • You can vote only once.<br />
            • This action cannot be undone.
          </p>
        </div>

        
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 text-sm text-yellow-800">
          Please review your choice carefully before submitting. Your vote is final.
        </div>

      </main>
    </div>
  );
}
