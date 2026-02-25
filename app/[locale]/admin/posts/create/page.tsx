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

export default function CreatePostPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  // State form
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    thumbnail: "", // Lưu chuỗi Base64 ảnh
  });

  // State preview ảnh để hiển thị
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // --- HÀM XỬ LÝ ẢNH (Quan trọng) ---
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 1. Tạo URL để preview ngay lập tức
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      // 2. Chuyển file sang Base64 để gửi về Server
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

  // --- HÀM SUBMIT ---
  const handleSubmit = async () => {
    // 1. Kiểm tra Tiêu đề & Nội dung
    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error("Vui lòng nhập tiêu đề và nội dung bài viết!");
      return;
    }

    // 2. Kiểm tra Ảnh đại diện (Mới thêm)
    if (!formData.thumbnail) {
      toast.error("Thiếu ảnh đại diện! Bài viết sẽ xấu nếu thiếu ảnh.");
      return;
    }

    // 3. Kiểm tra Mô tả SEO (Mới thêm)
    if (!formData.description.trim()) {
      toast.error("Thiếu mô tả ngắn! Google sẽ không thích điều này.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Đăng bài thành công!");
        router.push("/admin/posts");
      } else {
        toast.error("Có lỗi xảy ra, vui lòng thử lại.");
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
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
          >
            <FaArrowLeft />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Viết bài mới</h1>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium text-sm text-white transition-all shadow-lg shadow-blue-500/30 cursor-pointer ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 hover:scale-[1.02] active:scale-[0.98]"
          }`}
        >
          <FaSave />
          {loading ? "Đang lưu..." : "Đăng bài ngay"}
        </button>
      </div>

      {/* --- MAIN GRID LAYOUT --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
        {/* CỘT TRÁI (NỘI DUNG CHÍNH - 70%) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Ô Nhập Tiêu Đề (Style to đẹp như Medium) */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
              Tiêu đề bài viết <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Nhập tiêu đề bài viết tại đây..."
              className="w-full text-2xl font-bold text-gray-800 placeholder-gray-300 border-none outline-none focus:ring-0 bg-transparent leading-tight p-0"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          {/* Editor */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 min-h-125 flex flex-col">
            <SimpleEditor
              content={formData.content}
              onChange={(html) => setFormData({ ...formData, content: html })}
            />
          </div>
        </div>

        {/* CỘT PHẢI (SIDEBAR - 30%) */}
        <div className="space-y-6">
          {/* 1. Card Upload Ảnh Thumbnail */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <FaImage className="text-blue-500" /> Ảnh đại diện
              <span className="text-red-500">*</span>
            </h3>

            <div className="relative group">
              {/* Vùng hiển thị ảnh hoặc nút upload */}
              {previewUrl ? (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-gray-200">
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    fill
                    className="w-full h-full object-cover"
                  />

                  {/* Nút xóa ảnh */}
                  <button
                    onClick={removeThumbnail}
                    className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full text-red-500 hover:text-red-600 hover:bg-white shadow-sm transition-all opacity-0 group-hover:opacity-100"
                    title="Xóa ảnh"
                  >
                    <FaTimes size={14} />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full aspect-video border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50/50 transition-all gap-2 group/upload"
                >
                  <div className="p-3 bg-gray-50 rounded-full text-gray-400 group-hover/upload:text-blue-500 group-hover/upload:bg-white transition-colors">
                    <FaCloudUploadAlt size={24} />
                  </div>
                  <span className="text-sm text-gray-500 font-medium">
                    Tải ảnh lên
                  </span>
                  <span className="text-xs text-gray-400">
                    PNG, JPG, WEBP (Max 2MB)
                  </span>
                </div>
              )}

              {/* Input file ẩn */}
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>

          {/* 2. Card SEO / Mô tả ngắn */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-700 mb-3">
              Mô tả ngắn <span className="text-red-500">*</span>
            </h3>
            <textarea
              rows={4}
              placeholder="Viết một đoạn tóm tắt ngắn để thu hút người đọc và tốt cho Google..."
              className="w-full p-3 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none text-gray-600"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
            <div className="flex justify-between mt-2 text-xs text-gray-400">
              <span>Khuyên dùng: 150-160 ký tự</span>
              <span
                className={`${formData.description.length > 160 ? "text-red-500" : ""}`}
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
