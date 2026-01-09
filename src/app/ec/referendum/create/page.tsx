"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Sidebar from "@/components/ec/Sidebar";
import Navbar from "@/components/ec/Navbar";

interface FormValues {
  title: string;
  description: string;
  eligibleVoters: number;
  endDate: string;
  options: string[];
}

export default function CreateReferendumPage() {
  const router = useRouter();
  const [errorPopup, setErrorPopup] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      eligibleVoters: 0,
      endDate: "",
      options: ["", ""],
    },
  });

  const options = watch("options");

  function updateOption(index: number, value: string) {
    const updated = [...options];
    updated[index] = value;
    setValue("options", updated);
  }

  function addOption() {
    setValue("options", [...options, ""]);
  }

  function removeOption(index: number) {
    if (options.length <= 2) return;
    setValue(
      "options",
      options.filter((_, i) => i !== index)
    );
  }

  async function onSubmit(data: FormValues) {
    if (!data.title.trim() || !data.description.trim()) {
      setErrorPopup("Title and description are required.");
      return;
    }

    if (data.eligibleVoters < 1) {
      setErrorPopup("Eligible voters must be at least 1.");
      return;
    }

    if (!data.endDate) {
      setErrorPopup("End date is required.");
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const end = new Date(data.endDate);

    if (end <= today) {
      setErrorPopup("End date must be in the future.");
      return;
    }

    if (data.options.some((o) => !o.trim())) {
      setErrorPopup("All voting options must be filled.");
      return;
    }

    const res = await fetch("/api/admin/referendums", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      setErrorPopup("Failed to create referendum.");
      return;
    }

    router.push("/ec/referendum/draft");
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />

      <main className="flex-1 flex flex-col">
        <Navbar
          title="Create Referendum"
          subtitle="Election Commission"
          onLogout={handleLogout}
        />

        <div className="p-10">
          <div className="max-w-3xl mx-auto bg-white border rounded-2xl shadow-sm">
            <div className="px-8 py-6 border-b">
              <h1 className="text-2xl font-bold text-indigo-700">
                New Referendum
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                This referendum will be saved as a draft and can be edited before opening.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-8 space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  {...register("title")}
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  {...register("description")}
                  className="w-full border rounded-lg px-4 py-3 min-h-30"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-3">
                  Voting Options
                </label>

                <div className="space-y-3">
                  {options.map((opt, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        value={opt}
                        onChange={(e) => updateOption(i, e.target.value)}
                        className="flex-1 border rounded-lg px-4 py-2"
                      />
                      {options.length > 2 && (
                        <button
                          type="button"
                          onClick={() => removeOption(i)}
                          className="px-3 border rounded-lg text-sm"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={addOption}
                  className="mt-3 text-sm text-indigo-600"
                >
                  + Add option
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Eligible Voters
                  </label>
                  <input
                    type="number"
                    {...register("eligibleVoters")}
                    className="w-full border rounded-lg px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    {...register("endDate")}
                    className="w-full border rounded-lg px-4 py-2"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-6 border-t">
                <Link
                  href="/ec/referendum"
                  className="px-5 py-2.5 border rounded-lg"
                >
                  Cancel
                </Link>

                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg disabled:opacity-50"
                >
                  {isSubmitting ? "Creating..." : "Create Draft"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {errorPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-red-600">
              Invalid Form
            </h3>
            <p className="mt-3 text-sm text-slate-600">
              {errorPopup}
            </p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setErrorPopup(null)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
