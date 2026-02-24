"use client";

import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation"; // 1. Link chuẩn
import {
  FaPhone,
  FaEnvelope,
  FaLocationDot,
  FaFacebookF,
  FaTelegram,
} from "react-icons/fa6";
import { SiZalo } from "react-icons/si";
import { useTranslations } from "next-intl"; // 2. Import hook

const Footer = () => {
  const t = useTranslations("Footer"); // 3. Namespace

  return (
    <footer className="bg-primary dark:bg-gray-950 dark:border-t dark:border-blue-400/50 text-white pt-16 pb-8">
      <div className="container mx-auto px-6 lg:px-12">
        {/* --- PHẦN LOGO --- */}
        <div className="mb-8">
          <div className="bg-white inline-block p-4 rounded-sm">
            <Image
              src="/images/logo_bg_white.png"
              alt="Realtime Solutions Logo"
              width={200}
              height={60}
              className="h-10 w-auto object-contain"
            />
          </div>
        </div>

        {/* Đường kẻ ngang mờ */}
        <div className="border-t border-blue-400/50 mb-10"></div>

        {/* --- PHẦN NỘI DUNG CHÍNH (GRID 3 CỘT) --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-8 mb-12">
          {/* CỘT 1: LIÊN KẾT NHANH */}
          <div className="md:col-span-4 lg:col-span-3">
            <h3 className="text-lg font-bold mb-6">
              {t("quick_links")} {/* Liên kết nhanh */}
            </h3>
            <ul className="space-y-3 text-sm lg:text-base font-light">
              <li>
                <Link
                  href="/contact"
                  className="hover:underline hover:text-blue-100 transition-colors"
                >
                  {t("about_us")}
                </Link>
              </li>
              <li>
                <Link
                  href="/products/cx"
                  className="hover:underline hover:text-blue-100 transition-colors"
                >
                  {t("sol_cx")}
                </Link>
              </li>
              <li>
                <Link
                  href="/products/pbx"
                  className="hover:underline hover:text-blue-100 transition-colors"
                >
                  {t("sol_pbx")}
                </Link>
              </li>
              <li>
                <Link
                  href="/products/autodialer"
                  className="hover:underline hover:text-blue-100 transition-colors"
                >
                  {t("sol_autodialer")}
                </Link>
              </li>
            </ul>
          </div>

          {/* CỘT 2: LIÊN HỆ */}
          <div className="md:col-span-5 lg:col-span-5">
            <h3 className="text-lg font-bold mb-6">
              {t("contact")} {/* Liên hệ */}
            </h3>
            <div className="space-y-4 text-sm lg:text-base font-light">
              {/* Hotline */}
              <div className="flex items-start gap-3">
                <FaPhone className="mt-1 shrink-0" />
                <div>
                  <span className="font-semibold mr-1">Hotline:</span>
                  <a
                    href="tel:+842873033888"
                    className="hover:text-blue-200 block sm:inline"
                  >
                    +842873033888
                  </a>
                  <span className="mx-1 hidden sm:inline">|</span>
                  <a
                    href="tel:0933119056"
                    className="hover:text-blue-200 block sm:inline"
                  >
                    0933119056
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <FaEnvelope className="shrink-0" />
                <div>
                  <span className="font-semibold mr-1">Email:</span>
                  <a
                    href="mailto:sales@realtime.vn"
                    className="hover:text-blue-200"
                  >
                    sales@realtime.vn
                  </a>
                </div>
              </div>

              {/* Địa chỉ */}
              <div className="flex items-start gap-3">
                <FaLocationDot className="mt-1 shrink-0" />
                <div>
                  <span className="font-semibold mr-1">
                    {t("address_label")}:
                  </span>
                  <span>
                    108/15/18 Đ. Số 1, Phường An Hội Đông,{" "}
                    <br className="hidden lg:block" />
                    {t("address_city")} {/* Thành phố Hồ Chí Minh, Việt Nam */}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* CỘT 3: MẠNG XÃ HỘI */}
          <div className="md:col-span-3 lg:col-span-4 lg:pl-10">
            <h3 className="text-lg font-bold mb-6">
              {t("social")} {/* Mạng xã hội */}
            </h3>
            <div className="flex gap-4">
              {/* Facebook */}
              <a
                href="https://facebook.com/Realtime.vn?_rdc=1&_rdr#"
                className="h-10 w-10 bg-white/10 hover:bg-white/20 flex items-center justify-center rounded-full transition-all"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF className="text-xl" />
              </a>

              {/* Zalo */}
              <a
                href="https://zalo.me/0933119056"
                className="h-10 w-10 bg-white/10 hover:bg-white/20 flex items-center justify-center rounded-full transition-all font-bold"
                aria-label="Zalo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiZalo className="text-xl" />
              </a>

              {/* Telegram */}
              <a
                href="https://t.me/chau2026"
                className="h-10 w-10 bg-white/10 hover:bg-white/20 flex items-center justify-center rounded-full transition-all"
                aria-label="Telegram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTelegram className="text-xl" />
              </a>
            </div>
          </div>
        </div>

        {/* Đường kẻ ngang cuối */}
        <div className="border-t border-blue-400/50 pt-8 text-center md:text-left">
          <p className="text-sm font-light opacity-80">
            Designed By{" "}
            <span className="font-medium underline decoration-1 underline-offset-2">
              Realtime Solutions
            </span>{" "}
            All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
