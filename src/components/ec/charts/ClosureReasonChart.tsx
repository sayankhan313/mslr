"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  majority: number;
  manual: number;
}

export default function ClosureReasonChart({
  majority,
  manual,
}: Props) {

  const rawData = [
    { name: "Closed by Majority (50%+)", value: majority, color: "#4f46e5" },
    { name: "Closed Manually", value: manual, color: "#f59e0b" },
  ];


  const data = rawData.filter(d => d.value > 0);

  return (
    <div className="bg-white rounded-xl border p-6">
      <h3 className="text-lg font-semibold mb-6">
        Closure Reason Analysis
      </h3>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={110}   // 🔵 full pie
              paddingAngle={2}
            >
              {data.map((d, i) => (
                <Cell key={i} fill={d.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center gap-6 mt-4 text-sm flex-wrap">
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
