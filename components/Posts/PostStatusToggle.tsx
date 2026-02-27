"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {
  id: string; // Sửa slug -> id
  initialStatus: boolean;
};

export default function PostStatusToggle({ id, initialStatus }: Props) {
  const router = useRouter();
  const [published, setPublished] = useState(initialStatus);
  const [loading, setLoading] = useState(false);

  const togglePublish = async () => {
    setLoading(true);
    const newStatus = !published;

    try {
      // Gọi vào API theo ID: /api/posts/[id]
      const res = await fetch(`/api/posts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: newStatus }),
      });

      if (res.ok) {
        setPublished(newStatus);
        toast.success(newStatus ? "Đã xuất bản!" : "Đã chuyển về nháp!");
        router.refresh(); // Refresh để cập nhật lại UI Admin nếu cần
      } else {
        toast.error("Lỗi cập nhật.");
        setPublished(!newStatus); // Quay xe nếu lỗi
      }
    } catch (error) {
      console.error(error);
      toast.error("Lỗi kết nối.");
      setPublished(!newStatus);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        onClick={togglePublish}
        disabled={loading}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          published ? "bg-green-500" : "bg-gray-300"
        }`}
      >
        <span
          className={`${
            published ? "translate-x-6" : "translate-x-1"
          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
        />
      </button>
      <span
        className={`text-[10px] font-medium ${published ? "text-green-600" : "text-gray-400"}`}
      >
        {published ? "Đã đăng" : "Nháp"}
      </span>
    </div>
  );
}
