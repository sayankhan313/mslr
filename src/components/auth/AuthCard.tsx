"use client";

import { motion } from "framer-motion";
import AuthVisual from "./AuthVisual";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

interface Props {
  mode: "login" | "register";
  setMode: (mode: "login" | "register") => void;
}

export default function AuthCard({ mode, setMode }: Props) {
  return (
    <motion.div
      layout
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="w-full max-w-6xl min-h-[680px] grid grid-cols-1 md:grid-cols-[1fr_1.3fr] rounded-3xl overflow-hidden shadow-2xl bg-white/70 backdrop-blur-xl"
    >
      {mode === "register" && <AuthVisual />}

      <div className="flex items-center justify-center px-16 py-20">
        <div className="w-full max-w-lg">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="w-full"
          >
            {mode === "login" ? (
              <LoginForm onSwitch={() => setMode("register")} />
            ) : (
              <RegisterForm onSwitch={() => setMode("login")} />
            )}
          </motion.div>
        </div>
      </div>

      {mode === "login" && <AuthVisual />}
    </motion.div>
  );
}
