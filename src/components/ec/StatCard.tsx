"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: number | string;
  link: string;
  icon?: React.ReactNode;
  highlight?: "green" | "red";
}

export default function StatCard({
  title,
  value,
  link,
  icon,
  highlight,
}: StatCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const borderColor =
    isHovered
      ? "#16a34a"
      : highlight === "green"
      ? "#86efac"
      : highlight === "red"
      ? "#fca5a5"
      : "#e2e8f0";

  return (
    <Link href={link}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 200 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="rounded-2xl bg-white p-8 shadow-sm border-2 cursor-pointer min-h-40"
        style={{ borderColor }}
      >
        <div className="flex items-start justify-between mb-3">
          <p className="text-sm text-slate-500 font-medium">{title}</p>
          <div className="text-indigo-600">{icon}</div>
        </div>

        <p className="text-4xl font-bold text-slate-800">{value}</p>
      </motion.div>
    </Link>
  );
}
