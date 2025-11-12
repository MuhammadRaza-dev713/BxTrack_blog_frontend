// app/post-blog/%5Bid%5D/page.jsx
"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostById, deletePost } from "../../../redux/slices/postSlice";
import Link from "next/link";
import { motion } from "framer-motion";
import { PulseLoader } from "react-spinners";
import { ArrowLeft, Edit2, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export default function PostDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const { current, loading } = useSelector((s) => s.posts);
  const { user } = useSelector((s) => s.auth);
  const [deleting, setDeleting] = useState(false);

  // Fetch post data
  useEffect(() => {
    if (id) dispatch(fetchPostById(id));
  }, [id, dispatch]);

  // Delete confirmation toast
  const handleDelete = () => {
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <span>Are you sure you want to delete this blog?</span>
          <div className="flex justify-end gap-2">
            <button
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
            <button
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={async () => {
                toast.dismiss(t.id);
                setDeleting(true);
                const res = await dispatch(deletePost(id));
                setDeleting(false);

                if (res.meta.requestStatus === "fulfilled") {
                  toast.success("Post deleted successfully");
                  router.push("/");
                } else {
                  toast.error("Failed to delete post ❌");
                }
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  };

  // Back navigation
  const handleBack = () => router.back();

  const isOwner = user && current?.author && user._id === current.author._id;

  // Data loader
  if (loading || !current) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <PulseLoader color="#7C3AED" size={12} />
      </div>
    );
  }

  return (
    <div className="mx-auto py-10 px-4">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="mb-6 inline-flex items-center gap-2 text-purple-600 font-medium hover:text-purple-800 transition cursor-pointer"
      >
        <ArrowLeft size={20} /> Back
      </button>

      {/* Post Title */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
        {current.title}
      </h1>

      {/* Author Info */}
      <p className="text-sm text-gray-500 mb-6">
        By{" "}
        <span className="text-purple-600 font-semibold">
          {current.author?.name || "Unknown"}
        </span>{" "}
        • {new Date(current.createdAt).toLocaleDateString()}
      </p>

      {/* Post Content */}
      <div
        className="prose prose-purple max-w-none text-gray-800 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: current.content }}
      />

      {/* Owner Controls */}
      {isOwner && (
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={`/edit-blog/${current._id}`}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black font-medium rounded-lg hover:bg-yellow-500 transition"
          >
            <Edit2 size={18} /> Edit
          </Link>

          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition disabled:opacity-50 cursor-pointer"
          >
            {deleting ? (
              <>
                <PulseLoader color="#fff" size={6} /> Deleting...
              </>
            ) : (
              <>
                <Trash2 size={18} /> Delete
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
