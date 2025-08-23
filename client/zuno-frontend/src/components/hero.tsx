'use client';

import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Space_Grotesk, Audiowide } from 'next/font/google';

const clash = Space_Grotesk({ subsets: ['latin'], weight: '600' });
const au = Audiowide({ subsets: ['latin'], weight: '400' });

const Hero = () => {
  return (
    <section
      className={`${clash.className} relative  overflow-hidden bg-black text-white min-h-screen flex items-center pt-28`}
    >
      {/* Animated Background */}
      <motion.div className="absolute inset-0 ">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />

        {/* Purple Orbit */}
        <motion.div
          className="absolute w-72 h-72 rounded-full bg-purple-600/30 blur-3xl"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 50, ease: 'linear' }}
          style={{ top: '20%', left: '12%' }}
        />
        {/* Blue Orbit */}
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-blue-500/20 blur-3xl"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 70, ease: 'linear' }}
          style={{ top: '45%', right: '12%' }}
        />
        {/* Neon Accent */}
        <motion.div
          className="absolute w-40 h-40 rounded-full bg-cyan-400/25 blur-2xl"
          animate={{ y: [0, -30, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
          style={{ bottom: '15%', left: '20%' }}
        />
      </motion.div>

      {/* Content */}
      <div className="max-w-5xl px-6 md:px-12 lg:px-20 z-10">
        <h1
          className={`${clash.className} text-4xl md:text-6xl font-extrabold leading-tight tracking-tight`}
        >
          Build Smarter AI Chatbots <br />
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Faster with <span className={au.className}>zuno</span>
          </span>
        </h1>

        <p className="mt-6 text-lg md:text-xl max-w-2xl text-gray-300">
          Zuno is a modular SDK for building AI chatbots with multimodal features. It offers a customizable client, APIs, and integrations with vector stores, billing, and authentication to speed up development.

        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/get-started"
            className="bg-gradient-to-r from-purple-400 to-blue-500 text-black px-6 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition flex items-center gap-2 shadow-xl"
          >
            Get Started for free
            <FiArrowUpRight className="text-black text-lg" />
          </Link>
          <Link
            href="/pricing"
            className="border border-white/30 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-white hover:text-black transition shadow-lg"
          >
            Pricing
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
