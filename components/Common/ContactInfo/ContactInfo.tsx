"use client";

import React from "react";
import {
  FaLocationDot,
  FaPhoneVolume,
  FaEnvelope,
  FaArrowRight,
} from "react-icons/fa6";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl"; // 1. Import hook

const ContactInfo = () => {
  const t = useTranslations("Home.ContactInfo"); // 2. Namespace

  // 3. Đưa dữ liệu vào trong component
  const contactData = [
    {
      id: 1,
      icon: <FaLocationDot />,
      title: t("office_title"),
      description: t("office_desc"),
      info: "108/15/18 Đ. Số 1, Phường An Hội Đông, TP.HCM",
      btnText: t("btn_map"),
      link: "https://maps.google.com/?q=108/15/18+Đ.+Số+1,+Phường+An+Hội+Đông,+TP.+Hồ+Chí+Minh,+Việt+Nam",
      color: "blue",
    },
    {
      id: 2,
      icon: <FaPhoneVolume />,
      title: t("hotline_title"),
      description: t("hotline_desc"),
      info: "+84 28 7303 3888\n0933 119 056",
      btnText: t("btn_call"),
      link: "tel:+842873033888",
      color: "green",
    },
    {
      id: 3,
      icon: <FaEnvelope />,
      title: t("email_title"),
      description: t("email_desc"),
      info: "sales@realtime.vn",
      btnText: t("btn_email"),
      link: "mailto:sales@realtime.vn",
      color: "purple",
    },
  ];

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t("title")} {/* Thông tin liên hệ chi tiết */}
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            {t("subtitle")} {/* Kết nối với chúng tôi... */}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contactData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 10,
                  delay: index * 0.1,
                },
              }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 10,
                duration: 0.5,
              }}
              whileHover={{ y: -10 }}
              whileTap={{ scale: 0.98 }}
              viewport={{ once: true, margin: "-50px" }}
              className="group relative flex flex-col h-full bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              {/* Dải màu trang trí */}
              <div
                className={`h-2 w-full ${
                  item.color === "blue"
                    ? "bg-blue-500"
                    : item.color === "green"
                      ? "bg-green-500"
                      : "bg-purple-500"
                }`}
              />

              <div className="p-8 flex flex-col h-full items-center text-center">
                {/* ICON */}
                <div
                  className={`
                  mb-6 h-16 w-16 flex items-center justify-center rounded-2xl text-2xl shadow-inner
                  ${
                    item.color === "blue"
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                      : item.color === "green"
                        ? "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400"
                        : "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400"
                  }
                  group-hover:scale-110 transition-transform duration-300
                `}
                >
                  {item.icon}
                </div>

                {/* TITLE */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 leading-relaxed">
                  {item.description}
                </p>

                {/* INFO */}
                <div className="mb-8 font-medium text-gray-800 dark:text-gray-200 whitespace-pre-line">
                  {item.info}
                </div>

                {/* BUTTON */}
                <div className="mt-auto w-full">
                  <a
                    href={item.link}
                    target={
                      item.title === "Văn phòng chính" ? "_blank" : "_self"
                    }
                    className={`
                            inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold transition-all duration-300
                            ${
                              item.color === "blue"
                                ? "bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white"
                                : item.color === "green"
                                  ? "bg-green-50 text-green-600 hover:bg-green-600 hover:text-white"
                                  : "bg-purple-50 text-purple-600 hover:bg-purple-600 hover:text-white"
                            }
                        `}
                  >
                    {item.btnText}
                    <FaArrowRight className="text-sm" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
