"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaFacebookF, FaPhone } from "react-icons/fa6";
import { ImArrowUp } from "react-icons/im";

// Component con hiển thị Tooltip (Nhãn chữ)
const Tooltip = ({ text }: { text: string }) => (
  <span className="absolute right-[130%] top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-900/90 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 group-hover:right-[115%] transition-all duration-300 whitespace-nowrap shadow-lg pointer-events-none backdrop-blur-sm z-10">
    {text}
    {/* Mũi tên nhỏ trỏ vào nút */}
    <span className="absolute top-1/2 -right-1 -translate-y-1/2 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 border-l-gray-900/90"></span>
  </span>
);

const FloatingContact = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) setShowTopBtn(true);
      else setShowTopBtn(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hàm cuộn mượt thủ công (như đã làm ở bước trước)
  const scrollToTop = () => {
    const duration = 800;
    const start = window.scrollY;
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      window.scrollTo(0, start * (1 - ease));
      if (timeElapsed < duration) requestAnimationFrame(animateScroll);
    };
    requestAnimationFrame(animateScroll);
  };

  return (
    <div className="fixed bottom-6 right-6 z-9999 flex flex-col items-end gap-3 pointer-events-none">
      {/* --- BACK TO TOP --- */}
      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            onClick={scrollToTop}
            className="pointer-events-auto group relative flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white shadow-lg shadow-blue-500/40 border border-blue-500 hover:bg-primary-dark dark:hover:bg-white dark:hover:text-gray-900  hover:scale-110 transition-transform duration-300"
          >
            <ImArrowUp className="text-sm" />
            {/* Tooltip cho nút lên đầu trang */}
            <Tooltip text="Lên đầu trang" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Spacer nhỏ để tách nhóm liên hệ ra */}
      <div className="h-1" />

      {/* --- FACEBOOK --- */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        className="pointer-events-auto relative group"
      >
        <Link
          href="https://facebook.com/Realtime.vn?_rdc=1&_rdr#"
          target="_blank"
          className="flex items-center justify-center w-11 h-11 rounded-full bg-[#1877F2] text-white shadow-lg hover:scale-110 transition-transform relative overflow-hidden"
        >
          <FaFacebookF className="text-lg z-20" />
          {/* Hiệu ứng bóng sáng lướt qua */}
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </Link>
        {/* Tooltip */}
        <Tooltip text="Chat Facebook" />
      </motion.div>

      {/* --- ZALO --- */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 }}
        className="pointer-events-auto relative group"
      >
        <Link
          href="https://zalo.me/0933119056"
          target="_blank"
          // Giữ nguyên các class của Link để tạo hình tròn xanh và shadow
          className="flex items-center justify-center w-11 h-11 rounded-full bg-[#0068FF] text-white shadow-lg hover:scale-110 transition-transform"
        >
          <svg
            viewBox="0 0 48 48" // Giữ nguyên ViewBox để icon không bị méo
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7" // Mình để w-7 h-7 (28px) cho to rõ hơn chút vì icon này nhiều chi tiết
          >
            {/* Paste toàn bộ các thẻ path từ file SVG của bạn vào đây */}
            <path
              fill="#2962ff"
              d="M15,36V6.827l-1.211-0.811C8.64,8.083,5,13.112,5,19v10c0,7.732,6.268,14,14,14h10 c4.722,0,8.883-2.348,11.417-5.931V36H15z"
            />
            <path
              fill="#eee"
              d="M29,5H19c-1.845,0-3.601,0.366-5.214,1.014C10.453,9.25,8,14.528,8,19 c0,6.771,0.936,10.735,3.712,14.607c0.216,0.301,0.357,0.653,0.376,1.022c0.043,0.835-0.129,2.365-1.634,3.742 c-0.162,0.148-0.059,0.419,0.16,0.428c0.942,0.041,2.843-0.014,4.797-0.877c0.557-0.246,1.191-0.203,1.729,0.083 C20.453,39.764,24.333,40,28,40c4.676,0,9.339-1.04,12.417-2.916C42.038,34.799,43,32.014,43,29V19C43,11.268,36.732,5,29,5z"
            />
            <path
              fill="#2962ff"
              d="M36.75,27C34.683,27,33,25.317,33,23.25s1.683-3.75,3.75-3.75s3.75,1.683,3.75,3.75 S38.817,27,36.75,27z M36.75,21c-1.24,0-2.25,1.01-2.25,2.25s1.01,2.25,2.25,2.25S39,24.49,39,23.25S37.99,21,36.75,21z"
            />
            <path
              fill="#2962ff"
              d="M31.5,27h-1c-0.276,0-0.5-0.224-0.5-0.5V18h1.5V27z"
            />
            <path
              fill="#2962ff"
              d="M27,19.75v0.519c-0.629-0.476-1.403-0.769-2.25-0.769c-2.067,0-3.75,1.683-3.75,3.75 S22.683,27,24.75,27c0.847,0,1.621-0.293,2.25-0.769V26.5c0,0.276,0.224,0.5,0.5,0.5h1v-7.25H27z M24.75,25.5 c-1.24,0-2.25-1.01-2.25-2.25S23.51,21,24.75,21S27,22.01,27,23.25S25.99,25.5,24.75,25.5z"
            />
            <path
              fill="#2962ff"
              d="M21.25,18h-8v1.5h5.321L13,26h0.026c-0.163,0.211-0.276,0.463-0.276,0.75V27h7.5 c0.276,0,0.5-0.224,0.5-0.5v-1h-5.321L21,19h-0.026c0.163-0.211,0.276-0.463,0.276-0.75V18z"
            />
          </svg>
        </Link>
        <Tooltip text="Chat Zalo" />
      </motion.div>

      {/* --- PHONE (HOTLINE) --- */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="pointer-events-auto relative group mt-1"
      >
        <Link
          href="tel:0933119056"
          className="flex items-center justify-center w-14 h-14 rounded-full bg-red-600 text-white shadow-[0_4px_20px_rgba(220,38,38,0.5)] relative z-20 hover:scale-105 transition-transform"
        >
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatDelay: 2.5,
              ease: "easeInOut",
            }}
          >
            <FaPhone className="text-2xl" />
          </motion.div>
        </Link>

        {/* Tooltip đặc biệt cho Hotline */}
        <span className="absolute right-[125%] top-1/2 -translate-y-1/2 px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-full opacity-0 group-hover:opacity-100 group-hover:right-[110%] transition-all duration-300 whitespace-nowrap shadow-lg pointer-events-none z-10">
          Hotline: 0933 119 056
          {/* Mũi tên đỏ */}
          <span className="absolute top-1/2 -right-1 -translate-y-1/2 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 border-l-red-600"></span>
        </span>

        {/* Pulse Effect */}
        <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-20 animate-ping top-0 left-0 -z-10"></span>
        <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-20 top-0 left-0 -z-10 animate-pulse delay-75 scale-125"></span>
      </motion.div>
    </div>
  );
};

export default FloatingContact;
