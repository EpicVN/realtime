"use client";

import TechFrame from "@/components/Common/TechFrame";
import Image from "next/image";
import { Link } from "@/i18n/navigation"; // 1. Link chuẩn
import { FaArrowRight } from "react-icons/fa6";
import { motion, Variants } from "framer-motion";
import { useTranslations } from "next-intl"; // 2. Hook dịch

const Pbx = () => {
  const t = useTranslations("Home.Pbx"); // 3. Namespace

  // --- ANIMATION VARIANTS (Giữ nguyên) ---
  const textContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
  };

  const textItemVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } },
  };

  return (
    <div className="py-24 bg-gray-100 dark:bg-gray-950 min-h-screen overflow-hidden">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 items-stretch gap-16">
        
        {/* --- CỘT TEXT (Trái) --- */}
        <motion.div
          className="flex flex-col justify-center gap-10 lg:gap-12 items-start"
          variants={textContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex flex-col justify-center gap-8">
            
            {/* Tiêu đề */}
            <motion.h2
              variants={textItemVariants}
              className="text-4xl md:text-5xl font-bold text-primary mb-6 dark:text-white leading-tight"
            >
              {t("title")} {/* RealtimePBX – Nền Tảng... */}
            </motion.h2>

            {/* Đoạn văn */}
            <motion.p
              variants={textItemVariants}
              className="text-black dark:text-gray-300 mb-8 text-lg leading-relaxed"
            >
              {t("description")} {/* RealtimePBX đáp ứng... */}
            </motion.p>
          </div>

          {/* Nút Đăng ký */}
          <motion.div variants={textItemVariants}>
            <Link
              href={"/contact"}
              className="group inline-flex items-center justify-center space-x-4 bg-white border-3 border-primary dark:bg-white dark:text-gray-900 px-6 py-4 font-semibold hover:bg-primary-dark hover:border-primary-dark transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              <span className="text-primary group-hover:text-white dark:text-gray-900">
                {t("btn_register")}
              </span>
              <FaArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform text-primary group-hover:text-white dark:text-gray-900" />
            </Link>
          </motion.div>
        </motion.div>

        {/* --- CỘT ẢNH (Phải) --- */}
        <motion.div
          className="flex items-center"
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <TechFrame title="RealtimePBX">
            <Image
              src={"/images/screen/PBX.png"}
              alt="RealtimePBX"
              fill
              className="object-contain object-top-left"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </TechFrame>
        </motion.div>
      </div>
    </div>
  );
};

export default Pbx;