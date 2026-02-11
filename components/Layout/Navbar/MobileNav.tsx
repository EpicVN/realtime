"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@/i18n/navigation"; // 1. Link chuẩn
import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import {
  FaChevronDown,
  FaCloud,
  FaHeadset,
  FaPhone,
  FaRobot,
  FaSimCard,
  FaUsersGear,
} from "react-icons/fa6";
import { RiFileMusicFill } from "react-icons/ri";
import { useTranslations } from "next-intl"; // 2. Import hook

// --- TYPE DEFINITIONS ---
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

type Props = {
  showNav: boolean;
  closeNav: () => void;
  currentUser?: {
    name?: string | null;
    email?: string | null;
    role?: string;
  } | null;
};

const MobileNav = ({ closeNav, showNav, currentUser }: Props) => {
  const t = useTranslations("Navbar"); // 3. Namespace (Dùng chung với Navbar)
  const navOpen = showNav ? "translate-x-0" : "translate-x-[-100%]";
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);

  const toggleSubmenu = (id: number) => {
    if (activeSubmenu === id) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(id);
    }
  };

  // 4. DỮ LIỆU NAV_DATA DÙNG t()
  const NAV_DATA: NavLink[] = [
    { id: 1, label: t("home"), url: "/" },
    {
      id: 2,
      label: t("products"),
      url: "#",
      layout: "simple",
      submenu: [
        {
          title: "RealtimeCX",
          desc: t("prod_cx_desc"),
          icon: <FaUsersGear />,
          url: "/products/cx",
        },
        {
          title: "RealtimeAutoDialer",
          desc: t("prod_autodialer_desc"),
          icon: <FaRobot />,
          url: "/products/autodialer",
        },
        {
          title: "RealtimeAI (Text To Speech)",
          desc: t("prod_tts_desc"),
          icon: <RiFileMusicFill />,
          url: "/products/texttospeech",
        },
        {
          title: "RealtimeBPO",
          desc: t("prod_bpo_desc"),
          icon: <FaHeadset />,
          url: "/products/bpo",
        },
        {
          title: "RealtimeCLOUD",
          desc: t("prod_cloud_desc"),
          icon: <FaCloud />,
          url: "/products/cloud",
        },
        {
          title: "RealtimePBX",
          desc: t("prod_pbx_desc"),
          icon: <FaPhone />,
          url: "/products/pbx",
        },
        {
          title: "Voice VAS",
          desc: t("prod_vas_desc"),
          icon: <FaSimCard />,
          url: "/products/voicevas",
        },
      ],
    },
    {
      id: 3,
      label: t("solutions"),
      url: "#",
      layout: "grid",
      submenu: [
        {
          heading: t("sol_heading_industry"),
          items: [
            { title: t("sol_collection"), url: "/solutions/collection" },
            { title: t("sol_cskh"), url: "/solutions/cskh" },
            { title: t("sol_recruitment"), url: "/solutions/recruitment" },
            { title: t("sol_realestate"), url: "/solutions/realestate" },
            { title: t("sol_education"), url: "/solutions/education" },
          ],
        },
        {
          heading: t("sol_heading_scale"),
          items: [
            { title: t("sol_startup"), url: "/solutions/startup" },
            { title: t("sol_sme"), url: "/solutions/sme" },
            { title: t("sol_enterprise"), url: "/solutions/enterprise" },
          ],
        },
      ],
    },
    { id: 4, label: t("partners"), url: "/partners" },
    { id: 5, label: t("contact"), url: "/contact" },
  ];

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
                          )
                        )}
                      </div>
                    ) : (
                      // 2. RENDER CHO SIMPLE (SẢN PHẨM)
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
                          )
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
            {currentUser ? (
              <Link
                href="/admin"
                onClick={closeNav}
                className="flex items-center justify-center gap-2 w-full bg-green-600 text-white py-3 rounded-lg font-bold shadow-md active:scale-95 transition-transform"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={closeNav}
                className="flex items-center justify-center w-full py-3 bg-white text-blue-900 font-bold rounded-lg shadow-lg active:scale-95 transition-transform"
              >
                {t("login")} {/* Đăng nhập */}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;