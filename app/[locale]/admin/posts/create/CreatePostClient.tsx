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
  FaGlobe,
} from "react-icons/fa";
import Link from "next/link";
import { toast } from "sonner";

// 1. ĐỊNH NGHĨA ẢNH MẶC ĐỊNH
const DEFAULT_THUMBNAIL = "/images/logo_bg_white.png";

export default function CreatePostClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State form
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    thumbnail: "",
    language: "vi",
  });

  // --- HÀM UPLOAD ẢNH LOCAL ---
  const handleThumbnailUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File quá lớn! Vui lòng chọn ảnh dưới 5MB.");
      return;
    }

    setUploading(true);
    const data = new FormData();
    data.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Upload thất bại");

      const result = await res.json();

      setFormData((prev) => ({ ...prev, thumbnail: result.url }));
      toast.success("Tải ảnh lên thành công!");
    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi tải ảnh lên server.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // --- HÀM SUBMIT BÀI VIẾT ---
  const handleSubmit = async () => {
    if (loading) return;

    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error("Vui lòng nhập tiêu đề và nội dung bài viết!");
      return;
    }

    if (!formData.description.trim()) {
      toast.error("Thiếu mô tả ngắn!");
      return;
    }

    setLoading(true);
    try {
      const submitData = {
        ...formData,
        thumbnail: formData.thumbnail || DEFAULT_THUMBNAIL,
      };

      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      if (res.ok) {
        toast.success("Đăng bài thành công!");
        router.push("/admin/posts");
      } else {
        toast.error("Có lỗi xảy ra, vui lòng thử lại.");
        setLoading(false);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Lỗi kết nối server.");
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
              Viết bài mới
            </h1>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading || uploading}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium text-sm text-white transition-all shadow-lg shadow-blue-500/30 ${
            loading || uploading
              ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
              : "bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          }`}
        >
          <FaSave />
          {loading ? "Đang lưu..." : "Đăng bài ngay"}
        </button>
      </div>

      {/* --- MAIN GRID LAYOUT --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
        {/* CỘT TRÁI (NỘI DUNG CHÍNH) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Ô Nhập Tiêu Đề */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-2">
              Tiêu đề bài viết <span className="text-red-500">*</span>
            </label>
            <span
              className={`text-xs font-mono font-bold ${
                formData.title.length >= 100
                  ? "text-red-600"
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
          <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-sm border bomrder-gray-100 dark:border-gray-700 min-h-125 flex flex-col dark:text-gray-900">
            <SimpleEditor
              content={formData.content}
              onChange={(html) => setFormData({ ...formData, content: html })}
            />
          </div>
        </div>

        {/* CỘT PHẢI (SIDEBAR) */}
        <div className="space-y-6">
          {/* MỤC CHỌN NGÔN NGỮ */}
          <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-3 flex items-center gap-2">
              <FaGlobe className="text-blue-500" /> Ngôn ngữ hiển thị
            </h3>
            <div className="grid grid-cols-2 gap-2 bg-gray-50 dark:bg-gray-900/50 p-1 rounded-xl border border-gray-100 dark:border-gray-700">
              <button
                onClick={() => setFormData({ ...formData, language: "vi" })}
                className={`py-2 px-3 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                  formData.language === "vi"
                    ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm border border-gray-100 dark:border-gray-600"
                    : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                🇻🇳 Tiếng Việt
              </button>
              <button
                onClick={() => setFormData({ ...formData, language: "en" })}
                className={`py-2 px-3 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                  formData.language === "en"
                    ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm border border-gray-100 dark:border-gray-600"
                    : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                🇬🇧 English
              </button>
            </div>
          </div>

          {/* --- KHU VỰC UPLOAD ẢNH --- */}
          <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-3 flex items-center gap-2">
              <FaImage className="text-blue-500" /> Ảnh đại diện
            </h3>

            <div className="relative group">
              {/* TRƯỜNG HỢP 1: ĐÃ CÓ ẢNH */}
              {formData.thumbnail ? (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                  <Image
                    src={formData.thumbnail}
                    alt="Thumbnail"
                    fill
                    className="w-full h-full object-cover"
                    unoptimized={formData.thumbnail.startsWith("/uploads/")}
                  />
                  <button
                    onClick={() => setFormData({ ...formData, thumbnail: "" })}
                    className="absolute top-2 right-2 bg-white/90 dark:bg-gray-900/90 p-1.5 rounded-full text-red-500 hover:text-red-600 hover:bg-white dark:hover:bg-gray-800 shadow-sm transition-all opacity-0 group-hover:opacity-100"
                    title="Xóa ảnh"
                  >
                    <FaTimes size={14} />
                  </button>
                </div>
              ) : (
                /* TRƯỜNG HỢP 2: CHƯA CÓ ẢNH -> NÚT UPLOAD LOCAL */
                <>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`w-full aspect-video border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-all gap-2 group/upload ${
                      uploading ? "opacity-50 pointer-events-none" : ""
                    }`}
                  >
                    {uploading ? (
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    ) : (
                      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-full text-gray-400 dark:text-gray-500 group-hover/upload:text-blue-500 group-hover/upload:bg-white dark:group-hover/upload:bg-gray-800 transition-colors">
                        <FaCloudUploadAlt size={24} />
                      </div>
                    )}
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                      {uploading ? "Đang tải lên..." : "Tải ảnh từ máy"}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500 text-center px-4">
                      (Không bắt buộc - Mặc định sẽ lấy Logo)
                    </span>
                  </div>

                  {/* Input ẩn để chọn file */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleThumbnailUpload}
                    className="hidden"
                    accept="image/*"
                  />
                </>
              )}
            </div>
          </div>

          {/* Mô tả ngắn */}
          <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-3">
              Mô tả ngắn <span className="text-red-500">*</span>
            </h3>
            <textarea
              rows={4}
              placeholder="Viết một đoạn tóm tắt ngắn..."
              className="w-full p-3 text-sm border border-gray-200 dark:border-gray-600 bg-transparent rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none text-gray-600 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500"
              value={formData.description}
              maxLength={160}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
            <div className="flex justify-between mt-2 text-xs text-gray-400 dark:text-gray-500">
              <span>Khuyên dùng: 150-160 ký tự</span>
              <span
                className={`${
                  formData.description.length >= 160
                    ? "text-red-600 dark:text-red-400"
                    : ""
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
