"use client";

import { useTransition } from "react";
import { toggleLicenseStatusAction } from "@/app/actions/license";
import { toast } from "sonner";

interface ToggleProps {
  id: string;
  isActive: boolean;
}

export default function ToggleLicenseStatus({ id, isActive }: ToggleProps) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    // Nếu sếp muốn cẩn thận thì bật confirm lên, còn em thấy gạt nhanh thì cứ để trơn luôn cho mượt
    // if (!confirm(`Sếp muốn ${isActive ? "KHÓA" : "MỞ KHÓA"} Key này?`)) return;

    startTransition(async () => {
      const res = await toggleLicenseStatusAction(id, isActive);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isActive}
      disabled={isPending}
      onClick={handleToggle}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${
        isPending ? "opacity-50 cursor-wait" : ""
      } ${isActive ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"}`}
      title={isActive ? "Đang hoạt động (Bấm để Khóa)" : "Đã khóa (Bấm để Mở)"}
    >
      <span className="sr-only">Toggle Status</span>
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
          isActive ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}
