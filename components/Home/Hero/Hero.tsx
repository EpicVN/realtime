"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { GiSparkles } from "react-icons/gi";
import { TypeAnimation } from "react-type-animation";

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationFrameId: number;

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }> = [];

    // Tạo hạt
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    function animate() {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        ctx.beginPath(); // QUAN TRỌNG: Bắt đầu đường vẽ mới
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;

        // Đảo chiều khi chạm cạnh
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
      });

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Có thể cần tạo lại hạt hoặc điều chỉnh vị trí nếu muốn
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId); // Dừng animation khi unmount
    };
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 bg-linear-to-br from-primary via-blue-800 to-primary-dark dark:from-gray-950 dark:via-gray-900 dark:to-violet-950"
      />

      {/* Nội dung Hero sẽ nằm đè lên Canvas ở đây */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg-px-8 text-center">
        <div>
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full mb-8">
            <GiSparkles className="h-5 w-5 text-yellow-400" />
            <span className="text-white font-medium">
              Cần tìm giải pháp phù hợp với doanh nghiệp bạn?
            </span>
          </div>
        </div>

        {/* Typewrite text */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6">
          <TypeAnimation
            sequence={[
              "Realtime Solutions",
              2000,
              "RealtimeCX",
              2000,
              "RealtimeBPO",
              2000,
              "RealtimeAutoDialer",
              2000,
              "RealtimeAI (Text to speech)",
              2000,
              "RealtimePBX",
              2000,
              "Voice VAS",
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </h1>

        {/* Description */}
        <p className="text-base sm:text-xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
          Giải pháp công nghệ hàng đầu cho các doanh nghiệp hiện đại. Realtime
          Solutions là đơn vị tiên phong trong lĩnh vực VoIP và Contact Center
          tại Việt Nam.
        </p>

        {/* Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={"/contact"}
            className="group inline-flex items-center justify-center space-x-2 bg-white dark:bg-white text-gray-900 dark:text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
          >
            <span>Bắt đầu ngay</span>

            <FaArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href={"/contact"}
            className="inline-flex items-center justify-center space-x-2 bg-transparent dark:bg-transparent text-gray-900 dark:text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl border-2 border-white/30 hover:border-transparent"
          >
            <span className="text-white">Liên hệ với chúng tôi</span>
          </Link>
        </div>
      </div>

      {/* Animated scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 rounded-full border-2 border-white flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
