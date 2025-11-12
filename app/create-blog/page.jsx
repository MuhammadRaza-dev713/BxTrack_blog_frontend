// app/create-blog/page.jsx
"use client";
import { useState, useEffect } from "react";
import BlogEditor from "../../components/BlogEditor";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../redux/slices/postSlice";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { PulseLoader } from "react-spinners";
import { FileText, Send } from "lucide-react";
import toast from "react-hot-toast"; // ✅ import toast

export default function CreatePost() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { token } = useSelector((s) => s.auth);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [publishing, setPublishing] = useState(false);

  useEffect(() => {
    if (!token) {
      toast.error("Please log in to create a blog ⚠️");
      router.push("/login");
    }
  }, [token, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("Please fill in both title and content ⚠️");
      return;
    }

    setPublishing(true);
    const res = await dispatch(createPost({ title, content }));
    setPublishing(false);

    if (res.type === "posts/create/fulfilled" || res.meta.requestStatus === "fulfilled") {
      toast.success("Blog published successfully 📝");
      router.push("/");
    } else {
      toast.error("Failed to publish blog ❌");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto py-10 px-4"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <FileText size={24} /> Create New Blog
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow p-6 space-y-5 border border-gray-100"
      >
        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your blog title"
          className="w-full text-lg font-medium border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none"
        />

        <BlogEditor value={content} onChange={setContent} />

        <button
          type="submit"
          disabled={publishing}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition flex justify-center items-center gap-2 disabled:opacity-50"
        >
          {publishing ? (
            <PulseLoader color="#fff" size={8} />
          ) : (
            <>
              <Send size={18} /> Publish
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}

