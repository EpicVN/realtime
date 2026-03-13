import Image from "next/image";

interface LogoProps {
  type?: "white" | "black";
}

const Logo = ({ type = "white" }: LogoProps) => {
  const src =
    type === "white" ? "/images/logo.png" : "/images/logo_bg_white.png";

  return (
    <div className="flex items-center justify-center">
      <Image
        src={src}
        alt="Realtime Solutions Logo"
        width={200}
        height={60}
        className="w-56 md:w-72 h-auto object-contain transition-opacity duration-300"
        priority
        unoptimized={true}
      />
    </div>
  );
};

export default Logo;
