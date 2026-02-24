"use client";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";

export default function CreatePostPage() {
  return (
    // Bọc trong khung padding để editor không dính sát lề
    <div className="flex flex-col justify-center items-center min-h-screen max-w-4xl mx-auto mt-[-36]">
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden min-h-125">
        <SimpleEditor />
      </div>
    </div>
  );
}
