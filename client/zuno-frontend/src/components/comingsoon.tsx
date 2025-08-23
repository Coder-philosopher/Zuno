"use client"
import React from 'react'
const tomorrow = Tomorrow({ subsets: ["latin"], weight: ["400", "600", "800"] });

import { useState } from "react";
import { Tomorrow } from "next/font/google";
import Link from "next/link";
import { FaGithub, FaTwitter } from "react-icons/fa";

function Page() {
    
const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
   <div className={`${tomorrow.className} min-h-screen bg-black text-[#c6cceb] flex flex-col`}>
      {/* Navbar */}
      <nav className="flex justify-between items-center flex-wrap gap-4 px-4 sm:px-6 py-4 mx-4 mt-5 rounded-full border border-[#9765db]/30">
        <div
          className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-[#3ee828] to-[#30b1e9] bg-clip-text text-transparent"
        >
          ZUNO
        </div>
        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href="https://github.com/coder-philosopher/zuno"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-[#c6cceb] hover:text-[#f682a0] transition-colors"
          >
            <FaGithub className="text-2xl" />
          </Link>
          <Link
            href="https://x.com/abdsbit"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter / X"
            className="text-[#c6cceb] hover:text-[#f682a0] transition-colors"
          >
            <FaTwitter className="text-2xl" />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center flex-grow px-4 text-center">
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-[#3ee828] to-[#30b1e9]    via-[#22d79b] bg-clip-text text-transparent break-words">
          Zuno
        </h1>
        <p className="text-base sm:text-xl md:text-2xl text-[#c6cceb]/80 max-w-2xl mb-8 sm:mb-12 leading-relaxed">
          Zuno is an AI-powered, fully customizable chatbot platform that
          integrates with your data to deliver intelligent, real-time customer
          interactions.
          <br />
          COMING&nbsp;SOON.
        </p>

        {/* Waitlist Form */}
        <div className="w-full max-w-md">
          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 mb-4"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 bg-[#031f56] text-[#c6cceb] placeholder-[#c6cceb]/50 border border-[#9765db] rounded-md focus:outline-none focus:ring-2 focus:ring-[#f682a0] w-full"
              />
              <button
                type="submit"
                className="px-6 py-3 font-semibold rounded-md bg-gradient-to-r from-[#3ee828] to-[#30b1e9] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#f682a0] transition w-full sm:w-auto"
              >
                Join&nbsp;Waitlist
              </button>
            </form>
          ) : (
            <div className="bg-[#9765db]/20 border border-[#9765db] rounded-md p-4 text-center text-[#c6cceb] mb-4">
              Thanks&nbsp;for&nbsp;joining! We’ll&nbsp;be&nbsp;giving&nbsp;you&nbsp;access&nbsp;soon.
            </div>
          )}

          {/* Social Proof */}
          <p className="text-sm text-[#f682a0] mb-8">
            10+&nbsp;developers already&nbsp;joined
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="flex flex-col sm:flex-row justify-between items-center gap-3 px-4 sm:px-6 py-4 text-sm text-[#c6cceb]/80 text-center">
        <span>CREATED&nbsp;BY&nbsp;THE&nbsp;ABDULLAH</span>
        <div className="flex items-center gap-2">
          <span>Powered&nbsp;by</span>
          <span className="font-bold ">Next.js</span>
        </div>
      </footer>
    </div>
  )
}

export default Page