"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, ShieldCheck, Calendar, LogOut } from "lucide-react";

interface UserProfile {
  name: string;
  email: string;
  role: string;
  dob: string;
  createdAt: string;
}

export default function VoterProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function loadProfile() {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      setUser(data);
    }
    loadProfile();
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#f4f6fb] flex">

      <aside className="w-72 bg-white border-r px-6 py-8">
        <h2 className="text-xl font-bold mb-8">MSLR</h2>

        <nav className="space-y-1 text-slate-600">
          <Link href="/voter/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100">
            Dashboard
          </Link>

          <Link href="/voter/voted-referendums" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100">
            My Voted Referendums
          </Link>

          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-50 text-indigo-600 font-medium">
            Profile
          </div>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col">

        <header className="h-20 bg-white border-b flex items-center justify-between px-10">
          <div>
            <p className="text-xs text-slate-500">Voter</p>
            <h1 className="text-2xl font-semibold text-slate-800">Profile</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-xl">
              <div className="h-9 w-9 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold">
                {user.name[0]}
              </div>
              <span className="font-medium">{user.name}</span>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500 text-white"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </header>

        <div className="p-10 space-y-8">

          <div className="bg-white rounded-2xl p-8 shadow-sm border max-w-2xl">

            <div className="flex items-center gap-4 mb-8">
              <div className="h-16 w-16 rounded-full bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold">
                {user.name[0]}
              </div>
              <div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-slate-500">{user.email}</p>
              </div>
            </div>

            <div className="grid gap-6">
              <div className="flex items-center gap-4">
                <User className="text-indigo-600" />
                <div>
                  <p className="text-sm text-slate-500">Full Name</p>
                  <p className="font-medium">{user.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Mail className="text-indigo-600" />
                <div>
                  <p className="text-sm text-slate-500">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <ShieldCheck className="text-indigo-600" />
                <div>
                  <p className="text-sm text-slate-500">Role</p>
                  <p className="font-medium">{user.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Calendar className="text-indigo-600" />
                <div>
                  <p className="text-sm text-slate-500">Date of Birth</p>
                  <p className="font-medium">{new Date(user.dob).toDateString()}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Calendar className="text-indigo-600" />
                <div>
                  <p className="text-sm text-slate-500">Member Since</p>
                  <p className="font-medium">{new Date(user.createdAt).toDateString()}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
