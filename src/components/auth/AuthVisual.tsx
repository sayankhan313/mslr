import Image from "next/image";

export default function AuthVisual() {
  return (
    <div className="relative hidden md:flex items-center justify-center">
      <div className="absolute inset-0">
        <div className="absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full bg-indigo-300/40 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-[420px] w-[420px] rounded-full bg-blue-300/40 blur-3xl" />
      </div>
      <Image
        src="/auth.png" 
        alt="Voting illustration"
        width={560}
        height={560}
        priority
        className="relative z-10 scale-110"
      />
    </div>
  );
}
