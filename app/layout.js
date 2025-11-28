
"use client";
import "./globals.css";
import Providers from "../components/Providers";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import NextTopLoader from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";
import Script from "next/script";

export default function RootLayout({ children }) {
  const [routeChanging, setRouteChanging] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setRouteChanging(true);
    const timer = setTimeout(() => setRouteChanging(false), 400);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-purple-100 to-white text-gray-900">
        <Providers>
          <NextTopLoader color="#7C3AED" height={3} />

          <Navbar />

          <AnimatePresence mode="wait">
            <motion.main
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="container mx-auto px-4 py-12"
            >
              {children}
            </motion.main>
          </AnimatePresence>

          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#fff",
                color: "#333",
                borderRadius: "10px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                padding: "12px 16px",
                fontSize: "0.95rem",
              },
              success: { iconTheme: { primary: "#7C3AED", secondary: "#fff" } },
              error: { iconTheme: { primary: "#EF4444", secondary: "#fff" } },
            }}
          />
        </Providers>

        {/* Tracking Script */}
        <Script
          src="https://we-track-analytics.vercel.app/tracker/trackmaster.js"
          data-site-id="site_lK1tKo16sf"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
