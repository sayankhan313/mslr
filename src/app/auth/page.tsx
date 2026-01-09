"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import AuthCard from "@/components/auth/AuthCard";

function AuthContent() {
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const modeParam = searchParams.get("mode");
    if (modeParam === "register") {
      setMode("register");
    } else {
      setMode("login");
    }
  }, [mounted, searchParams]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <AuthCard mode={mode} setMode={setMode} />
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={null}>
      <AuthContent />
    </Suspense>
  );
}
