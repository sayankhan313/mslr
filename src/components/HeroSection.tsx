"use client";

import Image from "next/image";
import Link from "next/link";
import PublicHeader from "./PublicHeader";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <PublicHeader />

      <Image
        src="/Shangri-La.jpg"
        alt="Shangri-La"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/60" />

      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-40 sm:pt-48 lg:pt-56">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white max-w-5xl drop-shadow-lg">
          My Shangri-La Referendum
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-gray-100 max-w-3xl drop-shadow">
          An official online platform enabling Shangri-La citizens to securely
          participate in public referendums.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <Link
            href="/auth?mode=register"
            className="px-10 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-lg"
          >
            Register to Vote
          </Link>

          <Link
            href="/auth?mode=login"
            className="px-10 py-3 rounded-lg border border-white/70 text-white font-semibold hover:bg-white/10 transition"
          >
            Login
          </Link>
        </div>
      </div>
    </section>
  );
}
