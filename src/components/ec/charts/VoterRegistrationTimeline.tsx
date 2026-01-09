"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface DataPoint {
  date: string;
  voters: number;
}

export default function VoterRegistrationTimeline({
  data,
}: {
  data: DataPoint[];
}) {
  return (
    <div className="bg-white rounded-xl border p-6">
      <h3 className="font-semibold mb-6">
        Voter Registrations Over Time
      </h3>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="voters"
            stroke="#4f46e5"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
