// app/admin/posts/edit/[id]/EditPostClient.tsx
"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { useRouter } from "next/navigation";
import {
  FaCloudUploadAlt,
  FaTimes,
  FaImage,
  FaSave,
  FaArrowLeft,
} from "react-icons/fa";
import Link from "next/link";
import { toast } from "sonner";

interface InitialPostData {
  title: string;
  description: string;
  content: string;
  thumbnail: string;
}

// BỔ SUNG: Nhận postId và initialData từ thẻ cha (Server)
export default function EditPostClient({
  postId,
  initialData,
}: {
  postId: string;
  initialData: InitialPostData;
}) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  // State form lấy trực tiếp data Server truyền vào
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    content: initialData.content || "",
    thumbnail: initialData.thumbnail || "",
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialData.thumbnail || null,
  );

  // --- XỬ LÝ ẢNH ---
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          thumbnail: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeThumbnail = () => {
    setPreviewUrl(null);
    setFormData((prev) => ({ ...prev, thumbnail: "" }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // --- XỬ LÝ CẬP NHẬT (PUT) ---
  const handleUpdate = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error("Vui lòng nhập tiêu đề và nội dung bài viết!");
      return;
    }

    if (formData.title.length > 100) {
      toast.error(`Tiêu đề quá dài (${formData.title.length}/100)!`);
      return;
    }

    if (!formData.thumbnail) {
      toast.error("Thiếu ảnh đại diện!");
      return;
    }

    if (!formData.description.trim()) {
      toast.error("Thiếu mô tả ngắn!");
      return;
    }

    if (formData.description.length > 160) {
      toast.error(`Mô tả quá dài (${formData.description.length}/160)!.`);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/posts/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Cập nhật bài viết thành công!");
        router.push("/admin/posts");
        router.refresh(); // F5 lại trang list
      } else {
        toast.error("Lỗi khi cập nhật, vui lòng thử lại.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Lỗi kết nối server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-20">
      {/* --- HEADER --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 mt-[-6]">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/posts"
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-500 dark:text-gray-400"
          >
            <FaArrowLeft />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Chỉnh sửa bài viết
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              ID: {postId}
            </p>
          </div>
        </div>

        <button
          onClick={handleUpdate}
          disabled={loading}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium text-sm text-white transition-all shadow-lg shadow-blue-500/30 cursor-pointer ${
            loading
              ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
              : "bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 hover:scale-[1.02] active:scale-[0.98]"
          }`}
        >
          <FaSave />
          {loading ? "Đang lưu..." : "Cập nhật ngay"}
        </button>
      </div>

      {/* --- MAIN GRID LAYOUT --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
        {/* CỘT TRÁI */}
        <div className="lg:col-span-2 space-y-6">
          {/* Ô Nhập Tiêu Đề */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-2">
              Tiêu đề bài viết <span className="text-red-500">*</span>
            </label>

            <span
              className={`text-xs font-mono font-bold ${
                formData.title.length >= 100
                  ? "text-red-600 dark:text-red-400"
                  : formData.title.length >= 80
                    ? "text-yellow-500"
                    : "text-gray-400 dark:text-gray-500"
              }`}
            >
              {formData.title.length}/100
            </span>

            <input
              type="text"
              placeholder="Nhập tiêu đề bài viết tại đây..."
              className="w-full text-2xl font-bold text-gray-800 dark:text-white placeholder-gray-300 dark:placeholder-gray-600 border-none outline-none focus:ring-0 bg-transparent leading-tight p-0 mt-1"
              value={formData.title}
              maxLength={100}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          {/* Editor */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 min-h-125 flex flex-col overflow-hidden text-gray-900">
            <SimpleEditor
              content={formData.content}
              onChange={(html) => setFormData({ ...formData, content: html })}
            />
          </div>
        </div>

        {/* CỘT PHẢI */}
        <div className="space-y-6">
          {/* Ảnh đại diện */}
          <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-3 flex items-center gap-2">
              <FaImage className="text-blue-500" /> Ảnh đại diện{" "}
              <span className="text-red-500">*</span>
            </h3>

            <div className="relative group">
              {previewUrl ? (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    fill
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={removeThumbnail}
                    className="absolute top-2 right-2 bg-white/90 dark:bg-gray-900/90 p-1.5 rounded-full text-red-500 hover:text-red-600 hover:bg-white dark:hover:bg-gray-800 shadow-sm transition-all opacity-0 group-hover:opacity-100"
                  >
                    <FaTimes size={14} />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`w-full aspect-video border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all gap-2 group/upload ${
                    !formData.thumbnail
                      ? "border-blue-300 dark:border-blue-700 bg-blue-50/30 dark:bg-blue-900/10"
                      : "border-gray-300 dark:border-gray-600"
                  } hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/20`}
                >
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-full text-gray-400 dark:text-gray-500 group-hover/upload:text-blue-500 group-hover/upload:bg-white dark:group-hover/upload:bg-gray-800 transition-colors">
                    <FaCloudUploadAlt size={24} />
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    Thay ảnh khác
                  </span>
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>

          {/* SEO */}
          <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-3">
              Mô tả ngắn (SEO) <span className="text-red-500">*</span>
            </h3>
            <textarea
              rows={4}
              placeholder="Viết tóm tắt ngắn..."
              className="w-full p-3 text-sm border border-gray-200 dark:border-gray-600 bg-transparent rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none text-gray-600 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500"
              value={formData.description}
              maxLength={160}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
            <div className="flex justify-between mt-2 text-xs text-gray-400 dark:text-gray-500">
              <span>150-160 ký tự</span>
              <span
                className={`${
                  formData.description.length >= 160
                    ? "text-red-600 dark:text-red-400"
                    : formData.description.length >= 140
                      ? "text-yellow-500"
                      : "text-gray-400 dark:text-gray-500"
                }`}
              >
                {formData.description.length}/160
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
