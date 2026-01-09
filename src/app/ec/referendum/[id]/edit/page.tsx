"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Sidebar from "@/components/ec/Sidebar";
import Navbar from "@/components/ec/Navbar";

interface FormValues {
  title: string;
  description: string;
  eligibleVoters: number;
  endDate: string;
  options: string[];
}

export default function EditReferendumPage() {
  const params = useParams();
  const router = useRouter();
  const [errorPopup, setErrorPopup] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      eligibleVoters: 0,
      endDate: "",
      options: [],
    },
  });

  const options = watch("options");

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/admin/referendums/${params.id}`, {
        cache: "no-store",
      });
      const data = await res.json();

      reset({
        title: data.title,
        description: data.description,
        eligibleVoters: data.eligibleVoters,
        endDate: data.endDate?.slice(0, 10) || "",
        options: data.results.map((r: any) => r.option),
      });
    }

    load();
  }, [params.id, reset]);

  function updateOption(index: number, value: string) {
    const next = [...options];
    next[index] = value;
    setValue("options", next);
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

    await fetch(`/api/admin/referendums/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    router.push(`/ec/referendum/${params.id}`);
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
          subtitle="Election Commission"
          title="Edit Referendum"
          onLogout={handleLogout}
        />

        <div className="p-10">
          <div className="max-w-3xl mx-auto space-y-8">
            <Link
              href={`/ec/referendum/${params.id}`}
              className="inline-block px-4 py-2 border rounded-lg bg-white hover:bg-indigo-600 hover:text-white transition"
            >
              ← Back
            </Link>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white rounded-2xl border shadow-sm p-10 space-y-8"
            >
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  {...register("title")}
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  {...register("description")}
                  rows={4}
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Eligible Voters
                </label>
                <input
                  type="number"
                  {...register("eligibleVoters")}
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  {...register("endDate")}
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium">Options</label>

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
                        className="px-3 py-2 border rounded-lg hover:bg-red-50"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addOption}
                  className="px-4 py-2 border rounded-lg hover:bg-slate-100"
                >
                  + Add Option
                </button>
              </div>

              <div className="flex gap-4">
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
                >
                  Save Changes
                </button>

                <Link
                  href={`/ec/referendum/${params.id}`}
                  className="px-6 py-2.5 border rounded-lg hover:bg-slate-100 transition"
                >
                  Cancel
                </Link>
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
