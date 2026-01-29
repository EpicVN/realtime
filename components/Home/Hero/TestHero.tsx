"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { GiSparkles } from "react-icons/gi";
import { TypeAnimation } from "react-type-animation";

// Class hạt để quản lý dễ hơn
class Particle {
  x: number;
  y: number;
  directionX: number;
  directionY: number;
  size: number;
  color: string;
  ctx: CanvasRenderingContext2D | null;
  canvas: HTMLCanvasElement | null;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    // Tốc độ chậm lại xíu cho sang (0.5 -> 0.4)
    this.directionX = (Math.random() * 0.4) - 0.2;
    this.directionY = (Math.random() * 0.4) - 0.2;
    this.size = Math.random() * 2 + 1; // Hạt nhỏ lại chút cho tinh tế
    this.color = 'rgba(255, 255, 255, 0.8)';
  }

  // Phương thức vẽ
  draw() {
    if (!this.ctx) return;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }

  // Phương thức cập nhật vị trí
  update() {
    // Đảo chiều khi chạm cạnh
    if (this.x > this.canvas!.width || this.x < 0) this.directionX = -this.directionX;
    if (this.y > this.canvas!.height || this.y < 0) this.directionY = -this.directionY;

    // Xử lý tương tác chuột (Optional: Hạt né chuột hoặc bị hút)
    // Ở đây mình để hạt di chuyển tự nhiên, chỉ kết nối line với chuột bên dưới
    
    // Di chuyển
    this.x += this.directionX;
    this.y += this.directionY;
    
    this.draw();
  }
}

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let animationFrameId: number;
  let particles: Array<Particle> = [];

  // 1. Tạo biến chuột để tương tác
  const mouse = {
    x: null as number | null,
    y: null as number | null,
    radius: 150, // Bán kính tương tác của chuột
  };

  // Khởi tạo mảng hạt (Tăng số lượng lên chút nếu màn hình to)
  const init = () => {
    particles = [];
    // Tính toán số lượng hạt dựa trên diện tích màn hình để không bị quá dày hoặc quá thưa
    const numberOfParticles = (canvas.width * canvas.height) / 9000; 
    for (let i = 0; i < numberOfParticles; i++) {
      particles.push(new Particle(canvas, ctx));
    }
  };

  // Hàm nối các hạt (Tạo hiệu ứng mạng lưới)
  const connect = () => {
    let opacityValue = 1;
    for (let a = 0; a < particles.length; a++) {
      for (let b = a; b < particles.length; b++) {
        // Tính khoảng cách giữa hạt a và hạt b
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const distance = dx * dx + dy * dy;

        // Nếu khoảng cách đủ gần (ví dụ < 100px tức là distance < 100*100)
        if (distance < (canvas.width / 7) * (canvas.height / 7)) { 
           // Tính độ mờ dựa trên khoảng cách (càng xa càng mờ)
           opacityValue = 1 - (distance / 20000);
           if(opacityValue > 0) {
             ctx.strokeStyle = `rgba(255, 255, 255, ${opacityValue * 0.2})`; // Line rất mờ (0.2)
             ctx.lineWidth = 1;
             ctx.beginPath();
             ctx.moveTo(particles[a].x, particles[a].y);
             ctx.lineTo(particles[b].x, particles[b].y);
             ctx.stroke();
           }
        }
      }
      
      // KẾT NỐI VỚI CHUỘT
      if (mouse.x && mouse.y) {
          const dx = particles[a].x - mouse.x;
          const dy = particles[a].y - mouse.y;
          const distance = dx*dx + dy*dy;
          if (distance < mouse.radius * mouse.radius) {
              const opacity = 1 - distance / (mouse.radius * mouse.radius);
              ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.5})`; // Line nối chuột đậm hơn chút
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(particles[a].x, particles[a].y);
              ctx.lineTo(mouse.x, mouse.y);
              ctx.stroke();
          }
      }
    }
  };

  const animate = () => {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
    }
    connect(); // Gọi hàm nối
    
    animationFrameId = requestAnimationFrame(animate);
  };

  // Sự kiện chuột
  const handleMouseMove = (e: MouseEvent) => {
      // Cần trừ đi offset nếu canvas không full màn hình, 
      // nhưng ở đây canvas là fixed/absolute full nên dùng clientX/Y ok
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
  }

  const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
  }

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init(); // Reset lại hạt khi resize
  });
  
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('mouseout', handleMouseLeave);

  init();
  animate();

  return () => {
    window.removeEventListener('resize', () => {}); // Cleanup đơn giản
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseout', handleMouseLeave);
    cancelAnimationFrame(animationFrameId);
  };
}, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 bg-linear-to-b from-primary to-primary-dark dark:from-gray-900 dark:to-black"
      />

      {/* Nội dung Hero sẽ nằm đè lên Canvas ở đây */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg-px-8 text-center">
        <div>
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full mb-8">
            <GiSparkles className="h-5 w-5 text-yellow-400" />
            <span className="text-white font-medium">
              Chào mừng đến với Realtime Solutions
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
            href={"#"}
            className="group inline-flex items-center justify-center space-x-2 bg-white dark:bg-white text-gray-900 dark:text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
          >
            <span>Bắt đầu ngay</span>

            <FaArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href={"#"}
            className="inline-flex items-center justify-center space-x-2 bg-transparent dark:bg-transparent text-gray-900 dark:text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl border-2 border-white/30 hover:border-transparent"
          >
            <span className="text-white">Liên hệ với chúng tôi</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
