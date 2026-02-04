import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaPhone,
  FaEnvelope,
  FaLocationDot,
  FaFacebookF,
  FaTelegram,
} from "react-icons/fa6";
import { SiZalo } from "react-icons/si"; // Icon Zalo từ bộ Simple Icons

const Footer = () => {
  return (
    <footer className="bg-primary dark:bg-gray-950 dark:border-t dark:border-blue-400/50 text-white pt-16 pb-8">
      <div className="container mx-auto px-6 lg:px-12">
        {/* --- PHẦN LOGO --- */}
        <div className="mb-8">
          <div className="bg-white inline-block p-4 rounded-sm">
            {/* Thay src bằng đường dẫn logo thực tế của bạn */}
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
          {/* CỘT 1: LIÊN KẾT NHANH (Chiếm 3 phần) */}
          <div className="md:col-span-4 lg:col-span-3">
            <h3 className="text-lg font-bold mb-6">Liên kết nhanh</h3>
            <ul className="space-y-3 text-sm lg:text-base font-light">
              <li>
                <Link
                  href="#"
                  className="hover:underline hover:text-blue-100 transition-colors"
                >
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:underline hover:text-blue-100 transition-colors"
                >
                  Giải pháp RealtimeCX
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:underline hover:text-blue-100 transition-colors"
                >
                  Giải pháp RealtimePBX
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:underline hover:text-blue-100 transition-colors"
                >
                  Giải pháp Realtime Autodialer
                </Link>
              </li>
            </ul>
          </div>

          {/* CỘT 2: LIÊN HỆ (Chiếm 5 phần - Rộng hơn chút để chứa địa chỉ) */}
          <div className="md:col-span-5 lg:col-span-5">
            <h3 className="text-lg font-bold mb-6">Liên hệ</h3>
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
                  <span className="font-semibold mr-1">Địa chỉ:</span>
                  <span>
                    108/15/18 Đ. Số 1, Phường 16, Gò Vấp,{" "}
                    <br className="hidden lg:block" />
                    Thành phố Hồ Chí Minh, Việt Nam
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* CỘT 3: MẠNG XÃ HỘI (Chiếm 4 phần còn lại) */}
          <div className="md:col-span-3 lg:col-span-4 lg:pl-10">
            <h3 className="text-lg font-bold mb-6">Mạng xã hội</h3>
            <div className="flex gap-4">
              {/* Facebook */}
              <a
                href="https://facebook.com/Realtime.vn?_rdc=1&_rdr#"
                className="h-10 w-10 bg-white/10 hover:bg-white/20 flex items-center justify-center rounded-full transition-all"
                aria-label="Facebook"
              >
                <FaFacebookF className="text-xl" />
              </a>

              {/* Zalo (Dùng icon Zalo hoặc placeholder) */}
              <a
                href="https://zalo.me/0933119056"
                className="h-10 w-10 bg-white/10 hover:bg-white/20 flex items-center justify-center rounded-full transition-all font-bold"
                aria-label="Zalo"
              >
                <SiZalo className="text-xl" />
              </a>

              {/* Telegram */}
              <a
                href="https://t.me/chau2026"
                className="h-10 w-10 bg-white/10 hover:bg-white/20 flex items-center justify-center rounded-full transition-all"
                aria-label="Telegram"
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
