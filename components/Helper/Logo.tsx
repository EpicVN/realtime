import Image from "next/image";

// Định nghĩa kiểu dữ liệu cho props
interface LogoProps {
  type?: "white" | "black"; // type là tùy chọn, mặc định sẽ là 'white' hoặc 'black' tùy bạn set
}

const Logo = ({ type = "white" }: LogoProps) => {
  // Chọn đường dẫn ảnh dựa trên type
  // Giả sử bạn có 2 file: logo-white.png và logo-black.png trong thư mục public/images
  const src =
    type === "white" ? "/images/logo.png" : "/images/logo_bg_white.png";

  return (
    <div className="flex items-center justify-center">
      <Image
        src={src}
        alt="Realtime Solutions Logo"
        width={200}
        height={60}
        className="w-48 h-auto md:w-auto md:h-auto object-contain transition-opacity duration-300"
        priority // Logo nên được ưu tiên tải trước
      />
    </div>
  );
};

export default Logo;
