"use client";

import Logo from "@/components/Helper/Logo";
import ThemeToggler from "@/components/Helper/ThemeToggler";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaChevronDown,
  FaCloud,
  FaHeadset,
  FaNetworkWired,
  FaPhone,
  FaRobot,
  FaServer,
} from "react-icons/fa6";
import { HiBars3BottomRight } from "react-icons/hi2";
import { RiFileMusicFill } from "react-icons/ri";

// --- 1. DỮ LIỆU MENU MỚI (Thay thế NAVLINKS cũ để có submenu) ---
const NAV_DATA = [
  { id: 1, label: "Trang chủ", url: "/" },
  {
    id: 2,
    label: "Sản phẩm",
    url: "#",
    submenu: [
      {
        title: "RealtimeCX",
        desc: "Nền tảng chăm sóc khách hàng đa kênh",
        icon: <FaHeadset />,
        url: "/products/cx",
      },
      {
        title: "Autodialer",
        desc: "Hệ thống gọi tự động hàng loạt",
        icon: <FaRobot />,
        url: "/products/autodialer",
      },
      {
        title: "Text to Speech",
        desc: "Chuyển văn bản thành giọng nói",
        icon: <RiFileMusicFill />,
        url: "/products/texttospeech",
      },
      {
        title: "Realtime PBX",
        desc: "Tổng đài ảo thông minh đa kênh",
        icon: <FaPhone />,
        url: "/products/pbx",
      },
    ],
  },
  {
    id: 3,
    label: "Dịch vụ",
    url: "#",
    submenu: [
      {
        title: "1",
        desc: "Description 1",
        icon: <FaCloud />,
        url: "#",
      },
      {
        title: "2",
        desc: "Description 2",
        icon: <FaNetworkWired />,
        url: "#",
      },
      {
        title: "3",
        desc: "Description 3",
        icon: <FaServer />,
        url: "#",
      },
    ],
  },
  { id: 4, label: "Đối tác", url: "/partners" },
  { id: 5, label: "Liên hệ", url: "/contact" },
];

type Props = {
  openNav: () => void;
};

const Navbar = ({ openNav }: Props) => {
  const [navBar, setNavBar] = useState(false);
  const pathname = usePathname();

  // State để theo dõi menu nào đang được hover
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // --- Logic cuộn trang giữ nguyên của bạn ---
  useEffect(() => {
    const handler = () => {
      if (window.scrollY >= 90) setNavBar(true);
      if (window.scrollY < 90) setNavBar(false);
    };

    handler();

    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const showBackground = navBar || pathname !== "/";

  return (
    <div
      className={`transition-all duration-200 h-25 z-100 fixed w-full ${
        showBackground
          ? "bg-primary shadow-md dark:bg-gray-900/90 dark:backdrop-blur-md border-b border-transparent dark:border-gray-800"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center h-full justify-between w-[90%] xl:w-[80%] mx-auto">
        {/* Logo */}
        <Link href="/">
          <Logo />
        </Link>

        {/* --- NAVLINKS (DESKTOP) --- */}
        <div className="hidden lg:flex items-center gap-8 h-full">
          {NAV_DATA.map((link) => {
            return (
              <div
                key={link.id}
                className="relative h-full flex items-center group cursor-pointer"
                onMouseEnter={() => setHoveredIndex(link.id)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Main Link Text */}
                <Link
                  href={link.url}
                  className="flex items-center gap-1.5 text-white font-semibold transition-all duration-200 py-6 hover:text-cyan-300 dark:hover:text-orange-400"
                >
                  <p>{link.label}</p>
                  {/* Mũi tên chỉ hiện nếu có submenu */}
                  {link.submenu && (
                    <FaChevronDown
                      className={`text-[10px] transition-transform duration-300 ${
                        hoveredIndex === link.id ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </Link>

                {/* --- DROPDOWN ANIMATION --- */}
                <AnimatePresence>
                  {link.submenu && hoveredIndex === link.id && (
                    <motion.div
                      // Animation xuất hiện: Trượt lên và hiện rõ
                      initial={{
                        opacity: 0,
                        y: 15,
                        clipPath: "inset(0% 0% 100% 0%)",
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        clipPath: "inset(0% 0% 0% 0%)",
                      }}
                      exit={{
                        opacity: 0,
                        y: 15,
                        clipPath: "inset(0% 0% 100% 0%)",
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      // Căn chỉnh vị trí Dropdown
                      className="absolute top-15 left-1/2 -translate-x-1/2 w-85 pt-4"
                    >
                      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-t-4 border-blue-500 overflow-hidden relative">
                        {/* Mũi tên trang trí trỏ lên navbar */}
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-500 rotate-45 transform"></div>

                        {/* Nội dung Submenu */}
                        <div className="p-2 flex flex-col gap-1 relative z-10">
                          {link.submenu.map((subItem, idx) => (
                            <Link
                              key={idx}
                              href={subItem.url}
                              className="flex items-start gap-4 p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors group/item"
                            >
                              {/* Icon có nền */}
                              <div className="mt-1 p-2.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg group-hover/item:bg-blue-600 group-hover/item:text-white transition-all shadow-sm">
                                {subItem.icon}
                              </div>

                              {/* Text info */}
                              <div>
                                <h4 className="font-bold text-gray-800 dark:text-gray-100 text-[15px] group-hover/item:text-blue-600 transition-colors">
                                  {subItem.title}
                                </h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                                  {subItem.desc}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Buttons & Toggler */}
        <div className="flex items-center space-x-6">
          <a
            href="#_"
            className="box-border relative z-20 items-center justify-center w-auto px-4 py-2 sm:px-6 sm:py-2.5 overflow-hidden font-bold text-gray-900 transition-all duration-300 bg-white rounded-md cursor-pointer hover:bg-primary-dark hover:text-white hover:shadow-lg ease focus:outline-none dark:bg-white dark:text-gray-900 dark:hover:bg-primary-dark dark:hover:shadow-lg dark:focus:ring-0 dark:focus:outline-none dark:hover:text-white hidden sm:inline-flex"
          >
            <span className="relative z-20 flex items-center text-center text-sm">
              Đăng nhập
            </span>
          </a>

          {/* ThemeToggler */}
          <ThemeToggler />

          {/* Buger menu */}
          <HiBars3BottomRight
            onClick={openNav}
            className="w-8 h-8 cursor-pointer text-white lg:hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
