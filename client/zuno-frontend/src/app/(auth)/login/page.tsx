"use client";

import { SignedOut, SignInButton } from "@clerk/nextjs";
import { Space_Grotesk, Audiowide } from "next/font/google";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiCheck } from "react-icons/fi";

const clash = Space_Grotesk({ subsets: ["latin"], weight: "600" });
const au = Audiowide({ subsets: ["latin"], weight: "400" });

export default function SignInCardPage() {
  return (
    <section
      className={`${clash.className} relative overflow-hidden bg-black text-white min-h-screen flex flex-col items-center justify-center px-6`}
    >
      {/* Background Glow */}
      <motion.div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-purple-600/20 blur-3xl"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
          style={{ top: "30%", left: "10%" }}
        />
        <motion.div
          className="absolute w-[30rem] h-[30rem] rounded-full bg-blue-500/20 blur-3xl"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 90, ease: "linear" }}
          style={{ top: "40%", right: "5%" }}
        />
      </motion.div>

      {/* Card */}
      <div className="relative z-10 max-w-md w-full bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-4">Welcome Back</h2>
        <p className="text-gray-400 text-center mb-8">
          Sign in to access your dashboard and continue building with{" "}
          <span className={au.className}>zuno</span>.
        </p>

        <SignedOut>
          <SignInButton mode="modal">
            <button className="w-full bg-white hover:cursor-pointer text-black text-sm font-semibold px-5 py-3 rounded-full hover:bg-gray-200 transition shadow-md flex items-center justify-center gap-2">
              Sign In <FiArrowUpRight />
            </button>
          </SignInButton>
        </SignedOut>

        {/* Optional features list */}
        <ul className="mt-8 text-gray-300 text-sm space-y-3">
          <li className="flex items-center gap-2">
            <FiCheck className="text-green-400" />
            Secure & Fast Authentication
          </li>
          <li className="flex items-center gap-2">
            <FiCheck className="text-green-400" />
            Access all projects & bots
          </li>
          <li className="flex items-center gap-2">
            <FiCheck className="text-green-400" />
            Personalized Dashboard
          </li>
        </ul>
      </div>
    </section>
  );
}
