"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
 
  ResponsiveContainer,
} from "recharts";

interface OptionResult {
  label: string;
  votes: number;
}

interface ClosedReferendum {
  title: string;
  options: OptionResult[];
}

const COLORS = [
  "#4f46e5",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#06b6d4",
  "#8b5cf6",
];

export default function ClosedResultsChart({
  data,
}: {
  data: ClosedReferendum[];
}) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-xl border p-6">
        <h3 className="font-semibold">Closed Referendum Results</h3>
        <p className="text-sm text-slate-500 mt-2">
          No closed referendums yet
        </p>
      </div>
    );
  }

  
  const chartData = data.map((ref) => {
    const row: Record<string, any> = { name: ref.title };

    ref.options.forEach((opt) => {
      row[opt.label] = opt.votes;
    });

    return row;
  });

  const allOptions = Array.from(
    new Set(data.flatMap((r) => r.options.map((o) => o.label)))
  );

  return (
    <div className="bg-white rounded-xl border p-6">
      <h3 className="font-semibold mb-6">
        Closed Referendum Results
      </h3>

      <ResponsiveContainer width="100%" height={420}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ left: 40 }}
        >
          <XAxis type="number" />
          <YAxis
            type="category"
            dataKey="name"
            width={200}
          />
          <Tooltip />
      

          {allOptions.map((opt, i) => (
            <Bar
              key={opt}
              dataKey={opt}
              stackId="votes"
              fill={COLORS[i % COLORS.length]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
