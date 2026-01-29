"use client";

import React from "react";
import { TbMinus, TbSquare, TbX } from "react-icons/tb";

interface TechFrameProps {
  children: React.ReactNode;
  title?: string; // Cho phép truyền tiêu đề cửa sổ khác nhau
  className?: string; // Cho phép thêm class tùy chỉnh từ bên ngoài
}

const TechFrame = ({ 
  children, 
  title = "Realtime Solution", // Tiêu đề mặc định
  className = "" 
}: TechFrameProps) => {
  return (
    <div className={`relative group w-full ${className}`}>
      {/* Background Gradient mờ phía sau */}
      <div className="absolute top-4 left-4 right-4 bottom-0 bg-blue-500/20 blur-2xl rounded-full -z-10 group-hover:bg-blue-600/30 transition-all duration-500"></div>

      {/* KHUNG CHÍNH */}
      <div className="relative rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-2xl overflow-hidden">
        
        {/* HEADER: Phong cách Windows 11 / Tech */}
        <div className="h-9 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-3 select-none">
          
          {/* Bên trái: Icon App + Tiêu đề */}
          <div className="flex items-center gap-2">
             <div className="w-4 h-4 rounded bg-blue-600 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
             </div>
             <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-wide">
                {title}
             </span>
          </div>

          {/* Bên phải: Window Controls */}
          <div className="flex items-center gap-3 opacity-60">
            <TbMinus className="text-gray-400 w-3 h-3 hover:text-gray-600 cursor-pointer" />
            <TbSquare className="text-gray-400 w-3 h-3 hover:text-gray-600 cursor-pointer" />
            <TbX className="text-gray-400 w-3 h-3 hover:text-red-500 transition-colors cursor-pointer" />
          </div>
        </div>

        {/* TOOLBAR GIẢ LẬP */}
        <div className="h-8 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 flex items-center px-3 gap-4">
             <div className="flex gap-2">
                 <div className="h-1.5 w-12 bg-gray-100 dark:bg-gray-700 rounded-full"></div>
                 <div className="h-1.5 w-8 bg-gray-100 dark:bg-gray-700 rounded-full"></div>
             </div>
             <div className="h-3 w-px bg-gray-200 dark:bg-gray-700"></div> 
             <div className="h-1.5 w-20 bg-gray-100 dark:bg-gray-700 rounded-full"></div>
        </div>

        {/* NỘI DUNG ẢNH */}
        <div className="relative bg-gray-50 dark:bg-gray-50 aspect-video lg:h-full min-h-75">
           {children}
           {/* Inner Shadow */}
           <div className="absolute inset-0 pointer-events-none shadow-[inset_0_4px_6px_-1px_rgba(0,0,0,0.05)]"></div>
        </div>
      </div>
    </div>
  );
};

export default TechFrame;