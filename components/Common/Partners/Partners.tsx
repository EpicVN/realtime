import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const Partners = () => {
  // Danh sách logo (Bạn thay đường dẫn ảnh thật vào đây)
  const partners = [
    { name: "CMC Telecom", src: "/images/partners/cmc.png" },
    { name: "FPT Telecom", src: "/images/partners/fpt.png" },
    { name: "FindJobs", src: "/images/partners/findjobs.png" },
    { name: "Hùng Cường", src: "/images/partners/hungcuong.png" },
    { name: "Cửa Sổ Vàng", src: "/images/partners/cuasovang.png" },
    { name: "Myjob365", src: "/images/partners/myjob365.png" },
    // Thêm các logo khác nếu muốn danh sách dài hơn
  ];

  return (
    <section className="flex flex-col items-center justify-center gap-8 bg-white dark:bg-gray-950 overflow-hidden min-h-screen">
      <div className="container mx-auto px-6 mb-12 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-blue-600 dark:text-white">
          Khách hàng tiêu biểu & Đối tác
        </h2>
      </div>

      {/* --- MARQUEE CONTAINER --- */}
      <div className="relative w-full">
        
        {/* Lớp phủ mờ 2 bên (Gradient Mask) để tạo cảm giác logo trôi vào/ra mượt mà */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-gray-50 to-transparent z-10 dark:from-gray-900 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-gray-50 to-transparent z-10 dark:from-gray-900 pointer-events-none" />

        {/* --- TRACK CHẠY --- */}
        <div className="flex">
          <motion.div
            className="flex shrink-0 gap-16 pr-16 items-center" // pr-16 = gap-16 để giữ khoảng cách đều khi nối đuôi
            initial={{ x: 0 }}
            animate={{ x: "-100%" }} // Dịch chuyển hết chiều dài của chính nó
            transition={{
              duration: 20, // Tốc độ chạy (số càng lớn càng chậm)
              ease: "linear",
              repeat: Infinity, // Lặp vô tận
            }}
          >
            {/* Render LẦN 1 */}
            {partners.map((partner, index) => (
              <div key={index} className="relative h-16 w-32 md:h-24 md:w-52 hover:grayscale-0 transition-all duration-300 hover:opacity-100 shrink-0 cursor-pointer">
                <Image
                  src={partner.src}
                  alt={partner.name}
                  fill
                  className="object-contain" // Giữ tỷ lệ ảnh logo
                />
              </div>
            ))}
          </motion.div>

          {/* Render LẦN 2 (Bản sao nối đuôi để lấp khoảng trống khi Lần 1 chạy hết) */}
          <motion.div
            className="flex shrink-0 gap-16 pr-16 items-center"
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{
              duration: 20, // Phải khớp duration với cái trên
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {partners.map((partner, index) => (
              <div key={`duplicate-${index}`} className="relative h-16 w-32 md:h-24 md:w-52 hover:grayscale-0 transition-all duration-300 hover:opacity-100 shrink-0 cursor-pointer">
                <Image
                  src={partner.src}
                  alt={partner.name}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Partners;