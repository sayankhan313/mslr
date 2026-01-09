"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, SignInInput } from "@/schemas/signInSchema";
import { useRouter } from "next/navigation";

export default function LoginForm({ onSwitch }: { onSwitch: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
  });

  const router = useRouter();

  async function onSubmit(data: SignInInput) {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      alert("Invalid email or password");
      return;
    }

    const { role } = await res.json();
    router.push(role === "EC" ? "/ec/dashboard" : "/voter/dashboard");
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full space-y-7 bg-white rounded-2xl p-10 shadow-lg"
    >
      <div>
        <h2 className="text-4xl font-bold tracking-tight">Login</h2>
        <p className="text-slate-500 mt-3 mb-10 text-lg">
          Secure access to the MSLR voting system
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Email
        </label>
        <input {...register("email")} className="input" />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Password
        </label>
        <input
          {...register("password")}
          type="password"
          className="input"
        />
        {errors.password && (
          <p className="text-sm text-red-500 mt-1">
            {errors.password.message}
          </p>
        )}
      </div>

      <button disabled={isSubmitting} className="btn-primary">
        {isSubmitting ? "Logging in..." : "Login"}
      </button>

      <p className="text-sm text-center">
        No account?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="text-indigo-600 font-medium hover:underline"
        >
          Register
        </button>
      </p>
    </form>
  );
}
