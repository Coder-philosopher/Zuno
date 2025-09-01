"use client";

import { Space_Grotesk, Audiowide } from "next/font/google";
import { motion } from "framer-motion";
import { FiCheck, FiArrowUpRight } from "react-icons/fi";
import Link from "next/link";
import Navbar from "@/components/navbar";
const clash = Space_Grotesk({ subsets: ["latin"], weight: "600" });
const au = Audiowide({ subsets: ["latin"], weight: "400" });

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Get started at no cost, perfect for hobby projects and testing.",
    features: [
      "Max 2 projects",
      "1M tokens total",
      "Basic chatbot builder",
      "Community support",
      "No multilingual bots",
    ],
    cta: "Start Free",
    href: "/signup",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$15",
    description: "Advanced features for developers & growing teams.",
    features: [
      "Max 10 projects",
      "2M tokens per project",
      "Multilingual bot support",
      "Web scraping + PDF uploads",
      "Bring your own API keys & models",
      "Priority support",
    ],
    cta: "Upgrade to Pro",
    href: "/signup",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Tailored solutions for enterprises with scale & compliance needs.",
    features: [
      "Unlimited projects",
      "Custom token limits",
      "Dedicated infrastructure",
      "Advanced security & compliance",
      "Dedicated account manager",
      "Custom integrations",
    ],
    cta: "Contact Sales",
    href: "/contact",
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <section
      className={`${clash.className} relative overflow-hidden bg-black text-white min-h-screen flex flex-col items-center pt-28 px-6`}
    >
      <Navbar/>
      {/* Background Glow */}
      <motion.div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-purple-600/20 blur-3xl"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
          style={{ top: "20%", left: "5%" }}
        />
        <motion.div
          className="absolute w-[30rem] h-[30rem] rounded-full bg-blue-500/20 blur-3xl"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 90, ease: "linear" }}
          style={{ top: "40%", right: "5%" }}
        />
      </motion.div>

      {/* Heading */}
      <div className="relative z-10 text-center max-w-3xl mb-14">
        <h1 className={`${clash.className} text-4xl md:text-5xl font-extrabold`}>
          Simple, Transparent Pricing
        </h1>
        <p className="mt-4 text-gray-400 text-lg">
          Choose the plan that fits your needs. Scale as you grow with{" "}
          <span className={au.className}>zuno</span>.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {plans.map((plan, idx) => (
          <motion.div
            key={plan.name}
            whileHover={{ scale: 1.03 }}
            className={`rounded-2xl border shadow-xl p-8 flex flex-col justify-between transition 
              ${
                plan.highlight
                  ? "border-purple-500 bg-gradient-to-b from-purple-900/30 to-transparent"
                  : "border-white/10 bg-white/5"
              }`}
          >
            <div>
              <h2 className="text-2xl font-bold">{plan.name}</h2>
              <p className="mt-2 text-gray-400">{plan.description}</p>
              <div className="mt-6">
                <span className="text-4xl font-extrabold">{plan.price}</span>
                {plan.price !== "Custom" && (
                  <span className="text-gray-400 text-lg"> /month</span>
                )}
              </div>

              {/* Features */}
              <ul className="mt-6 space-y-3 text-gray-300">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <FiCheck className="text-green-400" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <Link
              href={plan.href}
              className={`mt-8 flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold shadow-lg transition 
                ${
                  plan.highlight
                    ? "bg-gradient-to-r from-purple-400 to-blue-500 text-black hover:opacity-90"
                    : "border border-white/30 text-white hover:bg-white hover:text-black"
                }`}
            >
              {plan.cta} <FiArrowUpRight />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
