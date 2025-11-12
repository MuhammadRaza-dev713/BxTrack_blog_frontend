// // Path: app/page.js
// "use client";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchPosts } from "../redux/slices/postSlice";
// import Link from "next/link";

// export default function HomePage() {
//   const dispatch = useDispatch();
//   const { list, loading } = useSelector((s) => s.posts);

//   useEffect(() => { dispatch(fetchPosts()); }, [dispatch]);

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">All Posts</h1>
//       {loading && <p>Loading...</p>}
//       <div className="grid md:grid-cols-2 gap-4">
//         {list && list.length === 0 && <p>No posts yet.</p>}
//         {list?.map((post) => (
//           <article key={post._id} className="p-4 border rounded">
//             <h3 className="text-lg font-semibold">{post.title}</h3>
//             <p className="text-sm text-gray-600">By {post.author?.name || "Unknown"}</p>
//             <div className="mt-2">
//               <div dangerouslySetInnerHTML={{ __html: post.content?.slice(0, 200) + (post.content?.length>200 ? "..." : "") }} />
//             </div>
//             <div className="mt-3">
//               <Link href={`/post-blog/${post._id}`} className="text-purple-600">Read more</Link>
//             </div>
//           </article>
//         ))}
//       </div>
//     </div>
//   );
// }


// "use client";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchPosts } from "../redux/slices/postSlice";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { PulseLoader } from "react-spinners";

// export default function HomePage() {
//   const dispatch = useDispatch();
//   const { list, loading } = useSelector((s) => s.posts);

//   useEffect(() => {
//     dispatch(fetchPosts());
//   }, [dispatch]);

//   return (
//     <div className="min-h-screen  py-10">
//       <div className="max-w-6xl mx-auto px-4 py-10">
//         <div className="text-center mb-10">
//           <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
//             Explore Inspiring Blogs ✨
//           </h1>
//           <p className="text-gray-500">Read, learn, and share your thoughts with the world.</p>
//         </div>

//         {loading ? (
//           <div className="flex justify-center items-center py-20">
//             <PulseLoader color="#7C3AED" size={12} />
//           </div>
//         ) : list.length === 0 ? (
//           <p className="text-center text-gray-500">No posts yet. Be the first to create one!</p>
//         ) : (
//           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//             {list.map((post, i) => (
//               <motion.article
//                 key={post._id}
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: i * 0.05 }}
//                 whileHover={{ scale: 1.02 }}
//                 className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col justify-between"
//               >
//                 <div>
//                   <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
//                   <p className="text-sm text-gray-500 mb-3">
//                     By <span className="font-semibold text-purple-600 capitalize">{post.author?.name || "Unknown"}</span>
//                   </p>
//                   <div
//                     className="text-sm text-gray-700 line-clamp-4"
//                     dangerouslySetInnerHTML={{
//                       __html:
//                         post.content?.length > 250
//                           ? post.content.slice(0, 250) + "..."
//                           : post.content,
//                     }}
//                   />
//                 </div>
//                 <div className="mt-4">
//                   <Link
//                     href={`/post-blog/${post._id}`}
//                     className="text-purple-600 font-medium hover:text-purple-800 transition"
//                   >
//                     Read more →
//                   </Link>
//                 </div>
//               </motion.article>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../redux/slices/postSlice";
import Link from "next/link";
import { motion } from "framer-motion";
import { PulseLoader } from "react-spinners";

export default function HomePage() {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((s) => s.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
            Explore Inspiring Blogs ✨
          </h1>
          <p className="text-gray-500">
            Read, learn, and share your thoughts with the world.
          </p>
        </div>

        {/* Loader */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <PulseLoader color="#7C3AED" size={12} />
          </div>
        ) : list.length === 0 ? (
          <p className="text-center text-gray-500 py-20">
            No posts yet. Be the first to create one!
          </p>
        ) : (
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.05,
                },
              },
            }}
          >
            {list.map((post) => (
              <motion.article
                key={post._id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col justify-between"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.02 }}
              >
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    By{" "}
                    <span className="font-semibold text-purple-600 capitalize">
                      {post.author?.name || "Unknown"}
                    </span>
                  </p>
                  <div
                    className="text-sm text-gray-700 line-clamp-4"
                    dangerouslySetInnerHTML={{
                      __html:
                        post.content?.length > 250
                          ? post.content.slice(0, 250) + "..."
                          : post.content,
                    }}
                  />
                </div>
                <div className="mt-4">
                  <Link
                    href={`/post-blog/${post._id}`}
                    className="text-purple-600 font-medium hover:text-purple-800 transition"
                  >
                    Read more →
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
