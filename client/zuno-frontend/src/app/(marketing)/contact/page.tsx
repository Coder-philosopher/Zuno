"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import Navbar from "@/components/navbar";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Space_Grotesk, Audiowide } from "next/font/google";

const clash = Space_Grotesk({ subsets: ["latin"], weight: "600" });
const au = Audiowide({ subsets: ["latin"], weight: "400" });

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  return (
    <section
      className={`${clash.className} relative overflow-hidden bg-black text-white min-h-screen flex flex-col items-center pt-28 px-6`}
    >
      <Navbar />

      {/* Background Glow */}
      <motion.div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />
        <motion.div
          className="absolute w-[26rem] h-[26rem] rounded-full bg-purple-600/20 blur-3xl"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
          style={{ top: "20%", left: "10%" }}
        />
        <motion.div
          className="absolute w-[30rem] h-[30rem] rounded-full bg-blue-500/20 blur-3xl"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 90, ease: "linear" }}
          style={{ bottom: "10%", right: "5%" }}
        />
      </motion.div>

      {/* Title */}
      <div className="relative z-10 max-w-3xl text-center mb-12">
        <h1 className={` text-4xl md:text-5xl font-extrabold mb-4`}>
          Contact <span className={` ${au.className} `} >Zuno </span>
        </h1>
        <p className="text-gray-400">
          Have questions, ideas, or just want to say hi? Reach out via the form
          or through our socials below.
        </p>
      </div>

      {/* Social Icons */}
      <div className="relative z-10 flex justify-center gap-6 mb-12">
        <a
          href="https://x.com/abdsbit"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-black text-white shadow-lg hover:opacity-90 transition"
        >
          <Twitter className="w-5 h-5" />
        </a>
        <a
          href="https://www.linkedin.com/in/your-linkedin"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-black text-white shadow-lg hover:opacity-90 transition"
        >
          <Linkedin className="w-5 h-5" />
        </a>
        <a
          href="mailto:abdullahsknitrr@gmail.com"
          className="p-3 rounded-full bg-black text-white shadow-lg hover:opacity-90 transition"
        >
          <Mail className="w-5 h-5" />
        </a>
        <a
          href="https://github.com/Coder-Philosopher"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-black text-white shadow-lg hover:opacity-90 transition"
        >
          <Github className="w-5 h-5" />
        </a>
      </div>

      {/* Contact Form */}
      <motion.div
        className="relative z-10 max-w-2xl w-full"
        whileHover={{ scale: 1.01 }}
      >
        <Card className="rounded-2xl border border-white/10 bg-white/5 shadow-lg">
          <CardHeader>
            <h2 className="text-xl text-white font-semibold">Send us a message</h2>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Form submission not implemented yet ");
              }}
            >
              <div>
                <label className="block text-sm font-medium text-white mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg bg-black/30 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg bg-black/30 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm text-white font-medium mb-2">Message</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg bg-black/30 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Write your message..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-purple-400 to-blue-500 text-black shadow-lg hover:opacity-90 transition"
              >
                Send Message
              </button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
