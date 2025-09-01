// app/product/page.tsx
"use client";

import { Space_Grotesk, Audiowide } from "next/font/google";
import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import Navbar from "@/components/navbar";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

const clash = Space_Grotesk({ subsets: ["latin"], weight: "600" });
const au = Audiowide({ subsets: ["latin"], weight: "400" });

const features = [
  {
    title: "AI-Powered Chatbot",
    desc: "Custom AI pipelines to deliver intelligent conversational experiences.",
  },
  {
    title: "Secure Authentication",
    desc: "User authentication and session handling with modern security standards.",
  },
  {
    title: "Subscription & Billing",
    desc: "Integrated billing and subscription management for scaling businesses.",
  },
  {
    title: "Project Dashboards",
    desc: "Create, manage, and monitor chatbot projects with rich dashboards.",
  },
  {
    title: "Automated Scraping",
    desc: "Fetch and update dynamic content seamlessly with automated scraping.",
  },
  {
    title: "Vector Search",
    desc: "Integration with Pinecone / Weaviate for semantic search & conversational memory.",
  },
  {
    title: "CI/CD Automation",
    desc: "GitHub Actions + Vercel enable seamless testing and deployments.",
  },
];

const architecture = [
  {
    title: "Backend (AWS)",
    desc: "Microservices for AI pipelines, scraping, authentication, billing, and project management.",
  },
  {
    title: "Frontend (Next.js)",
    desc: "Responsive client app with Clerk authentication, dashboards, and project management.",
  },
  {
    title: "Vector DB",
    desc: "Pinecone / Weaviate used for semantic search and conversational memory.",
  },
  {
    title: "CI/CD",
    desc: "GitHub Actions + Vercel ensure seamless testing and deployments.",
  },
];

export default function ProductPage() {
  return (
    <section
      className={`${clash.className} relative overflow-hidden bg-black text-white min-h-screen flex flex-col items-center pt-28 px-6`}
    >
      <Navbar />

      {/* Background Glow */}
      <motion.div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />
        <motion.div
          className="absolute w-[28rem] h-[28rem] rounded-full bg-purple-600/20 blur-3xl"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
          style={{ top: "15%", left: "8%" }}
        />
        <motion.div
          className="absolute w-[32rem] h-[32rem] rounded-full bg-blue-500/20 blur-3xl"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 90, ease: "linear" }}
          style={{ top: "40%", right: "5%" }}
        />
      </motion.div>

      {/* Hero Section */}
      <div className="relative z-10 text-center max-w-4xl mb-16">
        <h1 className={` text-4xl md:text-6xl font-extrabold`}>
          <span className={` ${au.className} `}>Zuno </span> AI Powered Chatbot Provider
        </h1>
        <p className="mt-4 text-gray-400 text-lg">
          Deliver intelligent conversational experiences with advanced AI,
          vector search, and scalable cloud infrastructure.
        </p>
      </div>

      {/* Features Section */}
      <div className="relative z-10 max-w-5xl w-full mb-20">
        <h2 className="text-2xl font-semibold mb-8">Key Features</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <motion.div key={i} whileHover={{ scale: 1.03 }}>
              <Card className="rounded-2xl border border-white/10 bg-white/5 shadow-lg">
                <CardHeader className="flex items-center gap-2">
                  <FiCheck className="text-green-400" />
                  <CardTitle><p className="text-white">{feature.title} </p> </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">{feature.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Architecture Section */}
      <div className="relative z-10 max-w-5xl w-full mb-20">
        <h2 className="text-2xl font-semibold mb-8">Platform Architecture</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {architecture.map((item, i) => (
            <motion.div key={i} whileHover={{ scale: 1.02 }}>
              <Card className="rounded-2xl border border-white/10 bg-white/5 shadow-lg">
                <CardHeader>
                  <CardTitle><p className="text-white"> {item.title}</p></CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">{item.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="relative z-10 max-w-4xl text-center mb-20">
        <h2 className={`${au.className} text-3xl font-bold mb-4`}>
          Start Building with Zuno
        </h2>
        <p className="text-gray-400 mb-6">
          Sign up today and create your first AI-powered chatbot project.
        </p>
        <a
          href="/signup"
          className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 text-black font-semibold shadow-lg hover:opacity-90 transition"
        >
          Get Started
        </a>
      </div>
    </section>
  );
}
