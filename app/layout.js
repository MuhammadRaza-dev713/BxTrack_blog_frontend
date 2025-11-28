// // File: app/layout.js
// "use client";
// import "./globals.css";
// import Providers from "../components/Providers";
// import Navbar from "../components/Navbar";
// import NextTopLoader from "nextjs-progressbar";

// //  const metadata = {
// //   title: "Blog App",
// //   description: "Interview project - Blog App"
// // };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body>
//         <Providers>
//           <NextTopLoader height={3} />
//           <Navbar />
//           <main className="container mx-auto px-4 py-6">{children}</main>
//         </Providers>
//       </body>
//     </html>
//   );
// }

// without toaster
// "use client";
// import "./globals.css";
// import Providers from "../components/Providers";
// import Navbar from "../components/Navbar";
// import { useState, useEffect } from "react";
// import { usePathname } from "next/navigation";
// import { PulseLoader } from "react-spinners";
// import { motion, AnimatePresence } from "framer-motion";
// import NextTopLoader from "nextjs-progressbar";

// export default function RootLayout({ children }) {
//   const [loading, setLoading] = useState(true);
//   const pathname = usePathname();

//   useEffect(() => {
//     // Simulate loader on route change
//     setLoading(true);
//     const timer = setTimeout(() => setLoading(false), 600);
//     return () => clearTimeout(timer);
//   }, [pathname]);

//   return (
//     <html lang="en">
//       <body className="min-h-screen bg-gradient-to-br from-purple-100 to-white text-gray-900">
//         <Providers>
//           <NextTopLoader color="#7C3AED" height={3} />
//           <Navbar />
//           <AnimatePresence mode="wait">
//             {loading ? (
//               <motion.div
//                 key="loader"
//                 className="flex items-center justify-center h-[60vh]"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//               >
//                 <PulseLoader color="#7C3AED" size={12} />
//               </motion.div>
//             ) : (
//               <motion.main
//                 key={pathname}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 transition={{ duration: 0.4 }}
//                 className="container mx-auto px-4 py-12"
//               >
//                 {children}
//               </motion.main>
//             )}
//           </AnimatePresence>
//         </Providers>
//       </body>
//     </html>
//   );
// }


// // with toaster

// "use client";
// import "./globals.css";
// import Providers from "../components/Providers";
// import Navbar from "../components/Navbar";
// import { useState, useEffect } from "react";
// import { usePathname } from "next/navigation";
// import { PulseLoader } from "react-spinners";
// import { motion, AnimatePresence } from "framer-motion";
// import NextTopLoader from "nextjs-progressbar";
// import { Toaster } from "react-hot-toast";

// export default function RootLayout({ children }) {
//   const [loading, setLoading] = useState(true);
//   const pathname = usePathname();

//   useEffect(() => {
//     // Simulate loader on route change
//     setLoading(true);
//     const timer = setTimeout(() => setLoading(false), 600);
//     return () => clearTimeout(timer);
//   }, [pathname]);

//   return (
//     <html lang="en">
//       <body className="min-h-screen bg-gradient-to-br from-purple-100 to-white text-gray-900">
//         <Providers>
//           {/* 🟣 Top Progress Bar */}
//           <NextTopLoader color="#7C3AED" height={3} />

//           {/* 🟣 Global Navbar */}
//           <Navbar />

//           {/* 🟣 Route Transition Loader */}
//           <AnimatePresence mode="wait">
//             {loading ? (
//               <motion.div
//                 key="loader"
//                 className="flex items-center justify-center h-[60vh]"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//               >
//                 <PulseLoader color="#7C3AED" size={12} />
//               </motion.div>
//             ) : (
//               <motion.main
//                 key={pathname}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 transition={{ duration: 0.4 }}
//                 className="container mx-auto px-4 py-12"
//               >
//                 {children}
//               </motion.main>
//             )}
//           </AnimatePresence>

//           {/* 🟣 Global Toast Notification System */}
//           <Toaster
//             position="bottom-right"
//             toastOptions={{
//               style: {
//                 background: "#fff",
//                 color: "#333",
//                 borderRadius: "10px",
//                 boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
//                 padding: "12px 16px",
//                 fontSize: "0.95rem",
//               },
//               success: {
//                 iconTheme: { primary: "#7C3AED", secondary: "#fff" },
//               },
//               error: {
//                 iconTheme: { primary: "#EF4444", secondary: "#fff" },
//               },
//             }}
//           />
//         </Providers>
//       </body>
//     </html>
//   );
// }


// "use client";
// import "./globals.css";
// import Providers from "../components/Providers";
// import Navbar from "../components/Navbar";
// import { useState, useEffect } from "react";
// import { usePathname } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import NextTopLoader from "nextjs-progressbar";
// import { Toaster } from "react-hot-toast";

// export default function RootLayout({ children }) {
//   const [routeChanging, setRouteChanging] = useState(false);
//   const pathname = usePathname();

//   useEffect(() => {
//     // Trigger loader only on route change
//     setRouteChanging(true);
//     const timer = setTimeout(() => setRouteChanging(false), 400); // small fade duration
//     return () => clearTimeout(timer);
//   }, [pathname]);

//   return (
//     <html lang="en">
//       <body className="min-h-screen bg-gradient-to-br from-purple-100 to-white text-gray-900">
//         <Providers>
//           {/* Top Progress Bar */}
//           <NextTopLoader color="#7C3AED" height={3} />

//           {/* Navbar */}
//           <Navbar />

//           {/* Page Content with fade-in */}
//           <AnimatePresence mode="wait">
//             <motion.main
//               key={pathname}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               transition={{ duration: 0.3 }}
//               className="container mx-auto px-4 py-12"
//             >
//               {children}
//             </motion.main>
//           </AnimatePresence>

//           {/* Global Toast Notifications */}
//           <Toaster
//             position="bottom-right"
//             toastOptions={{
//               style: {
//                 background: "#fff",
//                 color: "#333",
//                 borderRadius: "10px",
//                 boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
//                 padding: "12px 16px",
//                 fontSize: "0.95rem",
//               },
//               success: { iconTheme: { primary: "#7C3AED", secondary: "#fff" } },
//               error: { iconTheme: { primary: "#EF4444", secondary: "#fff" } },
//             }}
//           />
//         </Providers>
//       </body>
//     </html>
//   );
// }



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
          data-site-id="site_c29wp1ckSt"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
