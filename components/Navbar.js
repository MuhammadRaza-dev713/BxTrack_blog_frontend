
"use client";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

export default function Navbar() {
  const auth = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

//   const handleLogout = () => {
//     dispatch(logout());
//     router.push("/login");
//   };

const handleLogout = () => {
  toast(
    (t) => (
      <div className="flex flex-col gap-2">
        <span>Are you sure you want to logout?</span>
        <div className="flex justify-end gap-2">
          <button
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
          <button
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={() => {
              toast.dismiss(t.id);
              dispatch(logout());
              router.push("/login");
              toast.success("Logged out successfully");
            }}
          >
            Logout
          </button>
        </div>
      </div>
    ),
    { duration: Infinity } // keeps toast open until action
  );
};

  const toggleMenu = () => setIsOpen((p) => !p);

  // Helper for active link
  const isActive = (path) => pathname === path;

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-white"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4 py-4">
        <Link
          href="/"
          className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent"
        >
          BXTrack Blog
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 items-center text-gray-700 font-medium">
          <Link
            href="/"
            className={`transition ${
              isActive("/")
                ? "text-purple-600 font-semibold border-b-2 border-purple-600 pb-1"
                : "hover:text-purple-600"
            }`}
          >
            Home
          </Link>

          {mounted && auth?.user ? (
            <>
              <Link
                href="/create-blog"
                className={`px-2 py-1 rounded-full transition ${
                  isActive("/create-blog")
                    ? "bg-purple-700 text-white"
                    : "bg-purple-500 text-white hover:bg-purple-700"
                }`}
              >
                Create +
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm hover:text-red-500 transition cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className={`transition ${
                  isActive("/login")
                    ? "text-purple-600 font-semibold border-b-2 border-purple-600 pb-1"
                    : "hover:text-purple-600"
                }`}
              >
                Login
              </Link>
              <Link
                href="/register"
                className={`px-2 py-1 rounded-full transition ${
                  isActive("/register")
                    ? "bg-purple-700 text-white"
                    : "bg-purple-600 text-white hover:bg-purple-700"
                }`}
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-700 text-2xl"
          aria-label="Toggle menu"
        >
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white border-t border-gray-200 shadow-lg"
          >
            <div className="flex flex-col items-center gap-4 py-4 text-gray-700 font-medium">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className={`${
                  isActive("/")
                    ? "text-purple-600 font-semibold border-b-2 border-purple-600 pb-1"
                    : "hover:text-purple-600"
                }`}
              >
                Home
              </Link>

              {mounted && auth?.user ? (
                <>
                  <Link
                    href="/create-blog"
                    onClick={() => setIsOpen(false)}
                    className={`w-[80%] text-center px-4 py-2 rounded-lg transition ${
                      isActive("/create-blog")
                        ? "bg-purple-700 text-white"
                        : "bg-purple-600 text-white hover:bg-purple-700"
                    }`}
                  >
                    + Create
                  </Link>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                    className="hover:text-red-500"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className={`${
                      isActive("/login")
                        ? "text-purple-600 font-semibold border-b-2 border-purple-600 pb-1"
                        : "hover:text-purple-600"
                    }`}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className={`w-[80%] text-center px-4 py-2 rounded-lg transition ${
                      isActive("/register")
                        ? "bg-purple-700 text-white"
                        : "bg-purple-600 text-white hover:bg-purple-700"
                    }`}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
