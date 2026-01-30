"use client";

import Link from "next/link";
import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { FaChevronDown } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCloud,
  FaHeadset,
  FaPhone,
  FaRobot,
  FaSimCard,
  FaUsersGear,
} from "react-icons/fa6";
import { RiFileMusicFill } from "react-icons/ri";

// --- TYPE DEFINITIONS (Đồng bộ với Navbar) ---
interface GridColumn {
  heading: string;
  items: Array<{ title: string; url: string }>;
}

interface SimpleMenuItem {
  title: string;
  desc: string;
  icon: React.ReactNode;
  url: string;
}

type NavSubmenu = GridColumn | SimpleMenuItem;

interface NavLink {
  id: number;
  label: string;
  url: string;
  layout?: "simple" | "grid";
  submenu?: NavSubmenu[];
}

// --- DỮ LIỆU MENU ---
const NAV_DATA: NavLink[] = [
  { id: 1, label: "Trang chủ", url: "/" },
  {
    id: 2,
    label: "Sản phẩm",
    url: "#",
    layout: "simple",
    submenu: [
      {
        title: "RealtimeCX",
        desc: "Nền tảng chăm sóc khách hàng đa kênh",
        icon: <FaUsersGear />,
        url: "/products/cx",
      },
      {
        title: "RealtimeAutoDialer",
        desc: "Hệ thống gọi tự động hàng loạt",
        icon: <FaRobot />,
        url: "/products/autodialer",
      },
      {
        title: "RealtimeAI (Text To Speech)",
        desc: "Chuyển văn bản thành giọng nói",
        icon: <RiFileMusicFill />,
        url: "/products/texttospeech",
      },
      {
        title: "RealtimeBPO",
        desc: "Thuê nhân sự trực Hotline, Telesales & CSKH",
        icon: <FaHeadset />,
        url: "/products/bpo",
      },
      {
        title: "RealtimeCLOUD",
        desc: "Cho thuê máy chủ ảo, server ảo",
        icon: <FaCloud />,
        url: "/products/cloud",
      },
      {
        title: "RealtimePBX",
        desc: "Tổng đài ảo thông minh đa kênh",
        icon: <FaPhone />,
        url: "/products/pbx",
      },
      {
        title: "Voice VAS",
        desc: "Đầu số Telesale, bàn, di động, SMS, ZNS...",
        icon: <FaSimCard />,
        url: "/products/voicevas",
      },
    ],
  },
  {
    id: 3,
    label: "Giải pháp",
    url: "#",
    layout: "grid",
    submenu: [
      {
        heading: "THEO LĨNH VỰC KINH DOANH",
        items: [
          { title: "Giải pháp Thu nhắc nợ / Collection", url: "#" },
          { title: "Giải pháp tổng đài cho CSKH", url: "#" },
          { title: "Giải pháp tổng đài cho Tuyển Dụng", url: "#" },
          { title: "Giải pháp tổng đài cho BĐS", url: "#" },
          { title: "Giải pháp tổng đài cho Giáo Dục", url: "#" },
        ],
      },
      {
        heading: "THEO QUY MÔ DOANH NGHIỆP",
        items: [
          { title: "Giải pháp STARTUP", url: "#" },
          { title: "Giải pháp Doanh nghiệp SME", url: "#" },
          { title: "Giải pháp Doanh nghiệp Lớn", url: "#" },
        ],
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
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);

  const toggleSubmenu = (id: number) => {
    if (activeSubmenu === id) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(id);
    }
  };

  return (
    <div>
      {/* Overlay */}
      <div
        onClick={closeNav}
        className={`fixed ${navOpen} transform transition-all duration-500 inset-0 z-1000 bg-black/70 w-full h-screen`}
      ></div>

      {/* Main Mobile Menu */}
      <div
        className={`text-white ${navOpen} transform transition-all duration-500 delay-300 fixed flex flex-col h-full w-[80%] sm:w-[60%] bg-blue-900 dark:bg-gray-900 space-y-6 z-10000 shadow-2xl overflow-y-auto`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-blue-800 dark:border-gray-800">
          <span className="font-bold text-xl tracking-wide">Menu</span>
          <CgClose
            onClick={closeNav}
            className="w-8 h-8 cursor-pointer hover:text-red-400 transition-colors"
          />
        </div>

        {/* Links */}
        <div className="flex flex-col px-4 pb-10">
          {NAV_DATA.map((link) => (
            <div
              key={link.id}
              className="border-b border-blue-800/50 dark:border-gray-800 last:border-none"
            >
              {/* Main Link */}
              <div
                onClick={() =>
                  link.submenu ? toggleSubmenu(link.id) : closeNav()
                }
                className="flex items-center justify-between py-4 cursor-pointer group"
              >
                {link.submenu ? (
                  <div className="flex items-center justify-between w-full text-[20px] font-medium text-white/90 group-hover:text-white transition-colors">
                    <span>{link.label}</span>
                    <FaChevronDown
                      className={`text-sm transition-transform duration-300 ${
                        activeSubmenu === link.id ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                ) : (
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
                    {/* --- LOGIC RENDER RIÊNG CHO TỪNG LOẠI MENU --- */}

                    {link.layout === "grid" ? (
                      // 1. RENDER CHO GRID (GIẢI PHÁP)
                      <div className="flex flex-col p-4 gap-6">
                        {(link.submenu as GridColumn[]).map(
                          (column, colIdx) => (
                            <div key={colIdx} className="flex flex-col gap-3">
                              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-700 pb-2">
                                {column.heading}
                              </h4>
                              <div className="flex flex-col gap-2 pl-2">
                                {column.items.map((item, itemIdx) => (
                                  <Link
                                    key={itemIdx}
                                    href={item.url}
                                    onClick={closeNav}
                                    className="text-[15px] text-gray-300 hover:text-white hover:translate-x-1 transition-all flex items-center gap-2"
                                  >
                                    <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                                    {item.title}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    ) : (
                      // 2. RENDER CHO SIMPLE (SẢN PHẨM) - CÓ ICON
                      <div className="flex flex-col p-2 space-y-1">
                        {(link.submenu as SimpleMenuItem[]).map(
                          (subItem, idx) => (
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
                          ),
                        )}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          {/* Button Đăng nhập */}
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
