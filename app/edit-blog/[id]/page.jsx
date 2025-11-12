// app/edit-blog/%5Bid%5D/page.jsx
"use client";
import { useEffect, useState } from "react";
import BlogEditor from "../../../components/BlogEditor";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostById, updatePost } from "../../../redux/slices/postSlice";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { PulseLoader } from "react-spinners";
import toast from "react-hot-toast"; // ✅ Add toast

export default function EditPost() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const { current, loading } = useSelector((s) => s.posts);
  const { token } = useSelector((s) => s.auth);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!token) {
      toast.error("Please log in to edit your blog ⚠️");
      router.push("/login");
    }
    if (id) dispatch(fetchPostById(id));
  }, [id, token, dispatch, router]);

  useEffect(() => {
    if (current) {
      setTitle(current.title);
      setContent(current.content);
    }
  }, [current]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const res = await dispatch(updatePost({ id, payload: { title, content } }));
    setSaving(false);

    if (res.type === "posts/update/fulfilled" || res.meta.requestStatus === "fulfilled") {
      toast.success("Blog updated successfully");
      router.push(`/post-blog/${id}`);
    } else {
      toast.error("Failed to update blog ❌");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <PulseLoader color="#7C3AED" size={12} />
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto py-10 px-4"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-4">✏️ Edit Your Blog</h2>

      <form
        onSubmit={onSubmit}
        className="bg-white rounded-xl shadow p-6 space-y-5 border border-gray-100"
      >
        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Blog Title"
          className="w-full text-lg font-medium border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none"
        />

        <BlogEditor value={content} onChange={setContent} />

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2 bg-yellow-400 text-black rounded-lg font-medium hover:bg-yellow-500 transition flex justify-center items-center gap-2 disabled:opacity-50"
        >
          {saving ? <PulseLoader color="#000" size={8} /> : "Save Changes"}
        </button>
      </form>
    </motion.div>
  );
}
