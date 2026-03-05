// components/Helper/AdminFloatingIcon.tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ImArrowUp } from "react-icons/im";

export default function AdminFloatingIcon() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    // 1. Tìm cái thẻ đang thực sự được cuộn (trong Layout Admin)
    const scrollableContainer = document.getElementById(
      "admin-main-scroll-area",
    );

    if (!scrollableContainer) return;

    // 2. Lắng nghe sự kiện scroll trên CÁI THẺ ĐÓ, thay vì window
    const handleScroll = () => {
      if (scrollableContainer.scrollTop > 300) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };

    scrollableContainer.addEventListener("scroll", handleScroll);
    return () =>
      scrollableContainer.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    // Tìm lại cái thẻ đó để bắt nó cuộn lên
    const scrollableContainer = document.getElementById(
      "admin-main-scroll-area",
    );
    if (!scrollableContainer) return;

    // Dùng phương thức scrollTo mượt có sẵn của trình duyệt cho nhẹ code
    scrollableContainer.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-9999 flex flex-col items-end gap-3 pointer-events-none">
      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            onClick={scrollToTop}
            className="pointer-events-auto group relative flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white shadow-lg shadow-blue-500/40 border border-blue-500 hover:bg-blue-700 dark:hover:bg-white dark:hover:text-gray-900 hover:scale-110 transition-transform duration-300"
          >
            <ImArrowUp className="text-sm" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
