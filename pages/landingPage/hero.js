import Image from "next/image";

const Hero = () => {
  return (
    <div className="w-full flex flex-col items-start sm:items-center justify-center p-5 sm:p-20">
      <p className="text-4xl text-transparent  bg-clip-text bg-gradient-to-r from-[#780206] to-[#061161] pb-3">
        Single place to store all your social media links
      </p>
      <div className="flex flex-col gap-5 mt-10">
        <p>If you haven&apos;t used mylinkup</p>
        <div className="bg-black text-white text-center p-2 pl-5 pr-5 rounded cursor-pointer">
          <p>Create first MylinkUp</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
