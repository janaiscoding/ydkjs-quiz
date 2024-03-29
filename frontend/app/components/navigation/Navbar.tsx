"use client";
import { usePathname, useRouter } from "next/navigation";
import { RxHamburgerMenu } from "react-icons/rx";
import { useContext, useState } from "react";

const Navbar = () => {
  const [showMobile, setShowMobile] = useState(false);

  const handleMobileNav = () => {
    setShowMobile(!showMobile);
  };

  return (
    <nav className="bg-sky-950 py-2 h-[5vh]">
      <ul className="max-w-4xl flex justify-between gap-4 items-center m-auto">
      <a href="/">Home</a>
      <a href="/login">Login</a>
      </ul>

      <button className="md:hidden" onClick={handleMobileNav}>
        <RxHamburgerMenu />
      </button>
      {/* ADD MOBILE NAVIGATION HERE */}
    </nav>
  );
};

export default Navbar;
