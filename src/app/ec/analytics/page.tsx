"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/components/ec/Sidebar";
import Navbar from "@/components/ec/Navbar";

import StatusDistributionChart from "@/components/ec/charts/StatusDistributionChart";
import ClosureReasonChart from "@/components/ec/charts/ClosureReasonChart";
import ClosedResultsChart from "@/components/ec/charts/ClosedResultsChart";
import VoterRegistrationTimeline from "@/components/ec/charts/VoterRegistrationTimeline";

export default function AnalyticsPage() {
  const router = useRouter();

  const [statusData, setStatusData] = useState({
    draft: 0,
    open: 0,
    closed: 0,
  });

  const [closureData, setClosureData] = useState({
    majority: 0,
    manual: 0,
  });

  const [closedResults, setClosedResults] = useState<any[]>([]);
  const [voterTimeline, setVoterTimeline] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const [
          statusRes,
          closureRes,
          resultsRes,
          voterRes,
        ] = await Promise.all([
          fetch("/api/admin/analytics/status"),
          fetch("/api/admin/analytics/closure-reasons"),
          fetch("/api/admin/analytics/closed-results"),
          fetch("/api/admin/analytics/voter-registration"), 
        ]);

        const statusJson = await statusRes.json();
        const closureJson = await closureRes.json();
        const resultsJson = await resultsRes.json();
        const voterJson = await voterRes.json();

       
        const last7Days = voterJson.slice(-7);

        setStatusData(statusJson);
        setClosureData(closureJson);
        setClosedResults(resultsJson);
        setVoterTimeline(last7Days);
      } catch (error) {
        console.error("Analytics load error:", error);
      }
    }

    load();
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />

      <main className="flex-1 flex flex-col">
        <Navbar
          subtitle="Election Commission"
          title="Analytics"
          onLogout={handleLogout}
        />

        <div className="p-10 space-y-8">
         
          <div className="grid grid-cols-2 gap-6">
            <StatusDistributionChart
              draft={statusData.draft}
              open={statusData.open}
              closed={statusData.closed}
            />

            <ClosureReasonChart
              majority={closureData.majority}
              manual={closureData.manual}
            />
          </div>

          
          <div className="w-full">
            <ClosedResultsChart data={closedResults} />
          </div>

          
          <div className="w-full">
            <VoterRegistrationTimeline data={voterTimeline} />
          </div>
        </div>
      </main>
    </div>
  );
}
