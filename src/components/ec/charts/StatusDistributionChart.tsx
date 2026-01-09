"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  draft: number;
  open: number;
  closed: number;
}

export default function StatusDistributionChart({
  draft,
  open,
  closed,
}: Props) {
  const data = [
    { name: "Closed", value: closed, color: "#ef4444" },
    { name: "Draft", value: draft, color: "#6b7280" },
    { name: "Open", value: open, color: "#22c55e" },
  ];

  return (
    <div className="bg-white rounded-xl border p-6">
      <h3 className="text-lg font-semibold mb-6">
        Referendum Status Distribution
      </h3>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={3}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center gap-6 mt-4 text-sm">
        {data.map((d) => (
          <div key={d.name} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: d.color }}
            />
            <span>
              {d.name} ({d.value})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
