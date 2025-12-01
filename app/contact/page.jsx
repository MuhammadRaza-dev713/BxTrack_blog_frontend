// app/contact/page.jsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { PulseLoader } from "react-spinners";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!form.firstName || !form.lastName || !form.phone || !form.email) {
      toast.error("Please fill in all fields ⚠️");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast.error("Please enter a valid email address ❌");
      return;
    }

    // Phone validation (basic)
    const phoneRegex = /^[0-9+\-\s()]{10,}$/;
    if (!phoneRegex.test(form.phone)) {
      toast.error("Please enter a valid phone number ❌");
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Message sent successfully! We'll get back to you soon 📧");
      setForm({ firstName: "", lastName: "", phone: "", email: "" });
      setLoading(false);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-white p-4"
    >
      <div className="bg-white w-full max-w-md shadow-lg rounded-2xl p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
          Get In Touch 📬
        </h2>
        <p className="text-center text-gray-500 mb-6">
          We'd love to hear from you. Send us a message!
        </p>

        <form onSubmit={onSubmit} className="space-y-4">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              required
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              placeholder="John"
              className="w-full mt-1 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              required
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              placeholder="Doe"
              className="w-full mt-1 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              required
              type="tel"
              name="phoneNumber"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+1 (555) 123-4567"
              className="w-full mt-1 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="john@example.com"
              className="w-full mt-1 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 mt-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition flex justify-center items-center gap-2 disabled:opacity-60"
          >
            {loading ? <PulseLoader color="#fff" size={8} /> : "Send Message"}
          </button>
        </form>

        {/* Back to Home */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Want to go back?{" "}
          <a
            href="/"
            className="text-purple-600 font-medium hover:underline"
          >
            Return home
          </a>
        </p>
      </div>
    </motion.div>
  );
}