'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Space_Grotesk, Audiowide } from 'next/font/google';
import Navbar from '@/components/navbar';
const clash = Space_Grotesk({ subsets: ['latin'], weight: '500' });
const au = Audiowide({ subsets: ['latin'], weight: '400' });

const PrivacyPolicy = () => {
  return (
    <section
      className={`${clash.className} relative bg-black text-white min-h-screen py-28 px-6 md:px-16 lg:px-32`}
    >
      <Navbar/>
      {/* Background Accent */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />
        <motion.div
          className="absolute w-80 h-80 rounded-full bg-purple-500/20 blur-3xl"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 60, ease: 'linear' }}
          style={{ top: '20%', left: '10%' }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-blue-500/15 blur-3xl"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 80, ease: 'linear' }}
          style={{ bottom: '10%', right: '15%' }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto">
        <h1
          className={`${au.className} text-4xl md:text-5xl font-bold mb-8 text-center`}
        >
          Privacy Policy
        </h1>
        <p className="text-gray-300 text-lg mb-10 text-center">
          Last updated: 24/8/2025
        </p>

        <div className="space-y-10 text-gray-300 leading-relaxed">
          {/* Intro */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Overview</h2>
            <p>
              Zuno is an open-source project released under the MIT License. We
              believe in transparency, developer freedom, and responsible data
              practices. This Privacy Policy explains how we handle your data
              when you use our platform, SDK, and services.
            </p>
          </section>

          {/* Data Collection */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              Data We Collect
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <span className="text-white font-medium">Account Data:</span>{' '}
                When you sign in with Clerk, we receive your name, email
                address, and authentication tokens.
              </li>
              <li>
                <span className="text-white font-medium">Usage Data:</span> We
                collect minimal analytics to understand product usage and
                improve user experience.
              </li>
              <li>
                <span className="text-white font-medium">GitHub Data:</span> We
                fetch GitHub repository stars and public project metadata for
                display purposes only.
              </li>
            </ul>
          </section>

          {/* Web Scraping Consent */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              Web Scraping & Data Use
            </h2>
            <p>
              Zuno allows developers to integrate web-scraping modules for AI
              chatbot training. By using these modules, you confirm that:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You have the legal right to scrape or access the data.</li>
              <li>
                You are responsible for obtaining user consent where applicable.
              </li>
              <li>
                Zuno is not liable for misuse of scraping tools by developers.
              </li>
            </ul>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              Cookies & Authentication
            </h2>
            <p>
              Authentication is handled securely using{' '}
              <span className="text-white">Clerk</span>. We use cookies or
              session storage only to maintain authentication and user state.
              We do not use tracking cookies for ads.
            </p>
          </section>

          {/* Data Sharing */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              Data Sharing
            </h2>
            <p>
              We do not sell or rent your personal information. Limited data may
              be shared with:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <span className="text-white">Service Providers</span> (e.g.,
                Clerk for authentication).
              </li>
              <li>
                <span className="text-white">Open Source Community</span> for
                contributions, under MIT licensing.
              </li>
            </ul>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              Your Rights
            </h2>
            <p>
              You have the right to request deletion of your account data,
              access your stored information, or revoke permissions at any time.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              Contact Us
            </h2>
            <p>
              If you have questions about this Privacy Policy, please contact us
              at{' '}
              <Link
                href="mailto:privacy@zuno.dev"
                className="text-blue-400 hover:underline"
              >
                privacy@zuno.dev
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
