"use client";

import Link from "next/link";
import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { FaChevronDown } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCloud,
  FaHeadset,
  FaNetworkWired,
  FaPhone,
  FaRobot,
  FaServer,
} from "react-icons/fa6";
import { RiFileMusicFill } from "react-icons/ri";

// --- DỮ LIỆU MENU (ĐỒNG BỘ VỚI NAVBAR) ---
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
        title: "Cloud Service",
        desc: "Lưu trữ đám mây",
        icon: <FaCloud />,
        url: "#",
      },
      {
        title: "Network Solutions",
        desc: "Giải pháp mạng doanh nghiệp",
        icon: <FaNetworkWired />,
        url: "#",
      },
      {
        title: "Server Dedicated",
        desc: "Máy chủ vật lý riêng",
        icon: <FaServer />,
        url: "#",
      },
    ],
  },
  { id: 4, label: "Đối tác", url: "/partners" },
  { id: 5, label: "Liên hệ", url: "/contact" },
];

type Props = {
  showNav: boolean;
  closeNav: () => void;
};

const MobileNav = ({ closeNav, showNav }: Props) => {
  const navOpen = showNav ? "translate-x-0" : "translate-x-[-100%]";

  // State để quản lý submenu nào đang mở (Accordion)
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);

  // Hàm toggle submenu
  const toggleSubmenu = (id: number) => {
    if (activeSubmenu === id) {
      setActiveSubmenu(null); // Đóng nếu đang mở
    } else {
      setActiveSubmenu(id); // Mở mục mới
    }
  };

  return (
    <div>
      {/* Overlay (Lớp phủ mờ) */}
      <div
        onClick={closeNav}
        className={`fixed ${navOpen} transform transition-all duration-500 inset-0 z-1000 bg-black/70 w-full h-screen`}
      ></div>

      {/* Main Mobile Menu */}
      <div
        className={`text-white ${navOpen} transform transition-all duration-500 delay-300 fixed flex flex-col h-full w-[80%] sm:w-[60%] bg-blue-900 dark:bg-gray-900 space-y-6 z-10000 shadow-2xl overflow-y-auto`}
      >
        {/* Header của Menu */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-blue-800 dark:border-gray-800">
          <span className="font-bold text-xl tracking-wide">Menu</span>
          <CgClose
            onClick={closeNav}
            className="w-8 h-8 cursor-pointer hover:text-red-400 transition-colors"
          />
        </div>

        {/* Danh sách Links */}
        <div className="flex flex-col px-4 pb-10">
          {NAV_DATA.map((link) => (
            <div
              key={link.id}
              className="border-b border-blue-800/50 dark:border-gray-800 last:border-none"
            >
              {/* Main Link Item */}
              <div
                onClick={() =>
                  link.submenu ? toggleSubmenu(link.id) : closeNav()
                }
                className="flex items-center justify-between py-4 cursor-pointer group"
              >
                {link.submenu ? (
                  // Nếu có submenu thì dùng thẻ div để trigger toggle
                  <div className="flex items-center justify-between w-full text-[20px] font-medium text-white/90 group-hover:text-white transition-colors">
                    <span>{link.label}</span>
                    <FaChevronDown
                      className={`text-sm transition-transform duration-300 ${activeSubmenu === link.id ? "rotate-180" : ""}`}
                    />
                  </div>
                ) : (
                  // Nếu không có submenu thì là Link thường
                  <Link
                    href={link.url}
                    className="w-full text-[20px] font-medium text-white/90 group-hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                )}
              </div>

              {/* Submenu Accordion */}
              <AnimatePresence>
                {link.submenu && activeSubmenu === link.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden bg-blue-950/50 dark:bg-gray-950/50 rounded-lg mb-2"
                  >
                    <div className="flex flex-col p-2 space-y-1">
                      {link.submenu.map((subItem, idx) => (
                        <Link
                          key={idx}
                          href={subItem.url}
                          onClick={closeNav}
                          className="flex items-center gap-3 p-3 rounded-md hover:bg-white/10 transition-colors"
                        >
                          <div className="text-blue-400 dark:text-blue-300 text-lg">
                            {subItem.icon}
                          </div>
                          <div>
                            <div className="text-[15px] font-medium text-white">
                              {subItem.title}
                            </div>
                            <div className="text-[12px] text-white/50 line-clamp-1">
                              {subItem.desc}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          {/* Button Đăng nhập Mobile */}
          <div className="mt-8 px-2">
            <Link
              href="/login"
              onClick={closeNav}
              className="flex items-center justify-center w-full py-3 bg-white text-blue-900 font-bold rounded-lg shadow-lg active:scale-95 transition-transform"
            >
              Đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
