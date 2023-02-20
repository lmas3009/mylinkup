import Link from "next/link";

const Header = () => {
  return (
    <Link href={"/"}>
      <div className="w-full flex items-center justify-between p-5 bg-black text-white">
        <p>MylinkUp</p>
      </div>
    </Link>
  );
};

export default Header;
