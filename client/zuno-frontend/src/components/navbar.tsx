'use client';

import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { Space_Grotesk, Audiowide } from 'next/font/google';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
  useSession,
} from '@clerk/nextjs';

const clash = Space_Grotesk({ subsets: ['latin'], weight: '600' });
const au = Audiowide({ subsets: ['latin'], weight: '400' });

const Navbar = () => {
  const [stars, setStars] = useState<number | null>(null);
  const { user } = useUser();
  const { session } = useSession();

  // Fetch GitHub stars
  useEffect(() => {
    fetch('https://api.github.com/repos/coder-philosopher/zuno')
      .then((res) => res.json())
      .then((data) => setStars(data.stargazers_count))
      .catch(() => setStars(null));
  }, []);

  // Notify backend on sign-in
  useEffect(() => {
    const notifyBackend = async () => {
      if (!user) return;

      try {
        const token = await session?.getToken();
        await fetch('http://localhost:3000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: user.id,
            email: user.emailAddresses[0].emailAddress,
            fullName: user.fullName,
          }),
        });
      } catch (err) {
        console.error('Error notifying backend:', err);
      }
    };

    notifyBackend();
  }, [user, session]);

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] md:w-[85%] lg:w-[70%]">
      <div
        className={`${clash.className} flex justify-between items-center px-6 py-4 rounded-2xl 
        backdrop-blur-sm bg-black/50 border border-white/10 shadow-xl`}
      >
        {/* Logo */}
        <Link
          href="/"
          className={`${au.className} text-2xl md:text-3xl tracking-wide text-white`}
        >
          zuno
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex gap-10 text-[16px] font-medium text-gray-300">
          <Link href="#product" className="hover:text-white transition">Product</Link>
          <Link href="#pricing" className="hover:text-white transition">Pricing</Link>
          <Link href="#contact" className="hover:text-white transition">Contact</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-5">
          {/* GitHub Stars */}
          <Link
            href="https://github.com/coder-philosopher/zuno"
            target="_blank"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition text-gray-200 text-sm"
          >
            <FaGithub className="text-lg" />
            <span>{stars !== null ? stars.toLocaleString() : '-'} ⭐</span>
          </Link>

          {/* Auth Buttons */}
          <SignedOut>
            <SignInButton mode="modal">
              <button className="text-sm font-medium hover:text-white transition">Sign In</button>
            </SignInButton>

            <SignUpButton mode="modal">
              <button className="bg-white text-black text-sm font-semibold px-5 py-2 rounded-full hover:bg-gray-200 transition shadow-sm">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            {/* Single user dropdown */}
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
