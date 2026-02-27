"use client";

import Logo from "@/components/Helper/Logo";
import ThemeToggler from "@/components/Helper/ThemeToggler";
import { AnimatePresence, motion } from "framer-motion";
import { Link, usePathname } from "@/i18n/navigation";
import { useEffect, useState } from "react";
import {
  FaChevronDown,
  FaCloud,
  FaHeadset,
  FaPhone,
  FaRobot,
  FaSimCard,
  FaUsersGear,
} from "react-icons/fa6";
import { HiBars3BottomRight } from "react-icons/hi2";
import { RiFileMusicFill } from "react-icons/ri";
import LangSwitcher from "@/components/Helper/LangSwitcher";
import { useTranslations } from "next-intl";

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
  openNav: () => void;
  currentUser?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  } | null;
};

const Navbar = ({ openNav, currentUser }: Props) => {
  const t = useTranslations("Navbar");
  const [navBar, setNavBar] = useState(false);
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const handler = () => {
      if (window.scrollY >= 90) setNavBar(true);
      else setNavBar(false);
    };
    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const showBackground = navBar || pathname !== "/";

  // --- DỮ LIỆU NAV_DATA ---
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
    
    // --- THÊM MỤC BLOG ---
    { id: 5, label: t("blog"), url: "/posts" }, // Nhớ thêm key "blog" vào file ngôn ngữ
    
    { id: 6, label: t("contact"), url: "/contact" },
  ];

  return (
    <div
      className={`transition-all duration-200 h-25 z-100 fixed w-full ${
        // SỬA: Giảm chiều cao xuống h-20 (80px)
        showBackground
          ? "bg-primary shadow-md dark:bg-gray-900/90 dark:backdrop-blur-md border-b border-transparent dark:border-gray-800"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center h-full justify-between w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Logo type="white" />
        </Link>

        {/* --- NAVLINKS (DESKTOP) --- */}
        {/* SỬA: Giảm gap xuống gap-5 */}
        <div className="hidden lg:flex items-center gap-5 h-full">
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
                  // SỬA: Thêm text-[15px] và font-medium
                  className="flex items-center gap-1 text-white font-semibold transition-all duration-200 py-6 hover:text-cyan-300 dark:hover:text-orange-400"
                >
                  <p>{link.label}</p>
                  {link.submenu && (
                    <FaChevronDown
                      className={`text-[10px] transition-transform duration-300 ${
                        hoveredIndex === link.id ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </Link>

                {/* --- DROPDOWN MENU --- */}
                <AnimatePresence>
                  {link.submenu && hoveredIndex === link.id && (
                    <motion.div
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
                      className={`absolute top-16 left-1/2 -translate-x-1/2 pt-4 ${
                         // Sửa top-16 cho khớp với chiều cao mới
                        link.layout === "grid" ? "w-150" : "w-85"
                      }`}
                    >
                      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-t-4 border-blue-500 overflow-hidden relative">
                        {/* Mũi tên trang trí */}
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-500 rotate-45 transform"></div>

                        {/* RENDER LOGIC */}
                        {link.layout === "grid" ? (
                          <div className="grid grid-cols-2 gap-8 p-6">
                            {(link.submenu as GridColumn[]).map(
                              (column: GridColumn, colIdx: number) => (
                                <div
                                  key={colIdx}
                                  className="flex flex-col gap-3"
                                >
                                  <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1 border-b border-gray-100 dark:border-gray-700 pb-2">
                                    {column.heading}
                                  </h4>
                                  <div className="flex flex-col gap-1">
                                    {column.items.map(
                                      (
                                        item: { title: string; url: string },
                                        itemIdx: number
                                      ) => (
                                        <Link
                                          key={itemIdx}
                                          href={item.url}
                                          className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-blue-400 py-1.5 transition-colors flex items-center gap-2 hover:translate-x-1 transform duration-200"
                                        >
                                          <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-blue-500 transition-colors"></span>
                                          {item.title}
                                        </Link>
                                      )
                                    )}
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        ) : (
                          <div className="p-2 flex flex-col gap-1 relative z-10">
                            {(link.submenu as SimpleMenuItem[]).map(
                              (subItem: SimpleMenuItem, idx: number) => (
                                <Link
                                  key={idx}
                                  href={subItem.url}
                                  className="flex items-start gap-4 p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors group/item"
                                >
                                  <div className="mt-1 p-2.5 bg-blue-100 dark:bg-blue-900/30 text-primary dark:text-primary-light rounded-lg group-hover/item:bg-blue-600 group-hover/item:text-white transition-all shadow-sm">
                                    {subItem.icon}
                                  </div>
                                  <div>
                                    <h4 className="font-bold text-gray-800 dark:text-gray-100 text-[15px] group-hover/item:text-primary transition-colors">
                                      {subItem.title}
                                    </h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                                      {subItem.desc}
                                    </p>
                                  </div>
                                </Link>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Buttons & Toggler */}
        {/* SỬA: Giảm space-x xuống 3 */}
        <div className="flex items-center space-x-3">
          {currentUser ? (
            <Link
              href="/admin"
              // SỬA: Giảm padding px-4 py-2, bo tròn rounded-full cho hiện đại
              className="box-border relative z-20 items-center justify-center w-auto px-4 py-2 overflow-hidden font-bold text-white transition-all duration-300 bg-linear-to-r from-green-500 to-emerald-600 rounded-full cursor-pointer hover:shadow-lg hover:scale-105 ease focus:outline-none hidden sm:inline-flex gap-2 text-sm"
            >
              <span className="relative z-20 flex items-center text-center">
                Dashboard
              </span>
            </Link>
          ) : (
            <Link
              href="/login"
              // SỬA: Tương tự như trên
              className="box-border relative z-20 items-center justify-center w-auto px-4 py-2 overflow-hidden font-bold text-gray-900 transition-all duration-300 bg-white rounded-full cursor-pointer hover:bg-gray-50 hover:text-primary hover:shadow-lg ease focus:outline-none hidden sm:inline-flex text-sm"
            >
              <span className="relative z-20 flex items-center text-center">
                {t("login")}
              </span>
            </Link>
          )}
          
          {/* SỬA: Thu nhỏ cụm chức năng phụ */}
          <div className="flex items-center gap-1 sm:gap-2">
            <LangSwitcher />
            <ThemeToggler />
          </div>

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