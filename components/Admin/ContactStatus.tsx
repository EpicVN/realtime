// components/Admin/ContactStatus.tsx
"use client";

import { useTransition } from "react";
import { updateContactStatus } from "@/app/actions/contact";

export default function ContactStatus({
  id,
  currentStatus,
}: {
  id: string;
  currentStatus: string;
}) {
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    startTransition(() => {
      updateContactStatus(id, newStatus);
    });
  };

  const statusColors = {
    PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
    CALLED: "bg-blue-100 text-blue-800 border-blue-200",
    CLOSED: "bg-green-100 text-green-800 border-green-200",
  };

  return (
    <select
      value={currentStatus}
      onChange={handleStatusChange}
      disabled={isPending}
      className={`text-xs font-bold rounded px-2 py-1 outline-none cursor-pointer border transition-opacity ${
        statusColors[currentStatus as keyof typeof statusColors] ||
        statusColors.PENDING
      } ${isPending ? "opacity-50" : ""}`}
    >
      <option value="PENDING">Chờ xử lý</option>
      <option value="CALLED">Đã gọi</option>
      <option value="CLOSED">Đã xử lý</option>
    </select>
  );
}
