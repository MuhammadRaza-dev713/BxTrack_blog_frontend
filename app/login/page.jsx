// app/login/page.jsx
"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { PulseLoader } from "react-spinners";
import toast from "react-hot-toast"; // ✅ Import toast

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading } = useSelector((s) => s.auth);
  const [form, setForm] = useState({ email: "", password: "" });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Please fill in all fields ⚠️");
      return;
    }

    const res = await dispatch(loginUser(form));

    if (res.type === "auth/login/fulfilled") {
      toast.success("Logged in successfully");
      router.push("/");
    } else {
      toast.error(res.payload?.message || "Invalid email or password ❌");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-white p-4"
    >
      <div className="bg-white w-full max-w-md shadow-lg rounded-2xl p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Log in to continue your blogging journey.
        </p>

        <form onSubmit={onSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="john@example.com"
              className="w-full mt-1 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              required
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••"
              className="w-full mt-1 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 mt-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition flex justify-center items-center gap-2 disabled:opacity-60"
          >
            {loading ? <PulseLoader color="#fff" size={8} /> : "Login"}
          </button>
        </form>

        {/* Redirect to Register */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-purple-600 font-medium hover:underline"
          >
            Register here
          </a>
        </p>
      </div>
    </motion.div>
  );
}
