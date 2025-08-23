import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
} from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zuno AI Chatbot Toolkit ",
  description: "Developed by Abdullah",
  icons: {
    icon: '/icon/favicon.ico',
    shortcut: '/icon/favicon-32x32.png',
    apple: '/icon/apple-touch-icon.png',
    other: [
      { rel: 'icon', url: '/icon/favicon-16x16.png', sizes: '16x16' },
      { rel: 'icon', url: '/icon/favicon-32x32.png', sizes: '32x32' },
      { rel: 'icon', url: '/icon/android-chrome-192x192.png', sizes: '192x192' },
      { rel: 'icon', url: '/icon/android-chrome-512x512.png', sizes: '512x512' },
    ],
  },
  manifest: '/icon/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
            
        {children}
      </body>
    </html>
    </ClerkProvider>
        
  );
}
