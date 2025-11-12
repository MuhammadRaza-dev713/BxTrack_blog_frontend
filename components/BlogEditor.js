// // Blog Editor
// "use client";
// import dynamic from "next/dynamic";
// import "react-quill-new/dist/quill.snow.css";

// // ✅ Import Quill dynamically so it only renders on client
// const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

// export default function BlogEditor({ value, onChange }) {
//   if (typeof window === "undefined") return null; // 🧩 Skip SSR render
//   return (
//     <div suppressHydrationWarning>
//       <ReactQuill theme="snow" value={value} onChange={onChange} />
//     </div>
//   );
// }


"use client";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { motion } from "framer-motion";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function BlogEditor({ value, onChange }) {
  if (typeof window === "undefined") return null;

  return (
    <motion.div
      suppressHydrationWarning
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden"
    >
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        className="[&_.ql-toolbar]:!border-b [&_.ql-toolbar]:!bg-gray-50 [&_.ql-toolbar]:!p-2 [&_.ql-container]:!border-0"
      />
    </motion.div>
  );
}
