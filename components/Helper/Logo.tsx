import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex items-center justify-center">
      <Image
        src="/images/logo.png"
        alt="Logo"
        width={200}
        height={60}
        className="w-48 h-auto md:w-auto md:h-auto object-contain"
      />
    </div>
  );
};

export default Logo;
