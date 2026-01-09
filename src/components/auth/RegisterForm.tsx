"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, SignUpInput } from "@/schemas/signUpSchema";
import SccQrScanner from "./SccQrScanner";

export default function RegisterForm({ onSwitch }: { onSwitch: () => void }) {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
  });

  const [showScanner, setShowScanner] = useState(false);

  async function onSubmit(data: SignUpInput) {
    const sccRes = await fetch("/api/scc/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: data.scc }),
    });

    if (!sccRes.ok) {
      const err = await sccRes.json();
      setError("scc", { message: err.message });
      return;
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        dob: data.dob,
        password: data.password,
        sccCode: data.scc,
      }),
    });

    if (!res.ok) {
      alert("Registration failed");
      return;
    }

    onSwitch();
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full space-y-7 bg-white rounded-2xl p-10 shadow-lg"
      >
        <div>
          <h2 className="text-4xl font-bold tracking-tight">Register</h2>
          <p className="text-slate-500 mt-3 mb-10 text-lg">
            Create your voter account
          </p>
        </div>

        <input {...register("name")} placeholder="Full Name" className="input" />
        <input {...register("email")} placeholder="Email" className="input" />
        <input {...register("dob")} type="date" className="input" />
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="input"
        />

        <div className="relative">
          <input
            {...register("scc")}
            placeholder="SCC Code"
            className="input pr-28"
          />
          <button
            type="button"
            onClick={() => setShowScanner(true)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-indigo-600 hover:underline"
          >
            Scan QR
          </button>
        </div>

        {errors.scc && (
          <p className="text-sm text-red-500">{errors.scc.message}</p>
        )}

        <button disabled={isSubmitting} className="btn-primary w-full">
          {isSubmitting ? "Registering..." : "Register"}
        </button>

        <p className="text-sm text-center">
          Already registered?{" "}
          <button
            type="button"
            onClick={onSwitch}
            className="text-indigo-600 hover:underline"
          >
            Login
          </button>
        </p>
      </form>

      {showScanner && (
        <SccQrScanner
          onScan={(value) => setValue("scc", value)}
          onClose={() => setShowScanner(false)}
        />
      )}
    </>
  );
}

