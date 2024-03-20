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
    <nav className="bg-sky-950 flex justify-between gap-4 items-center p-4">
      <a href="/">Home</a>
      <a href="/">Login</a>

      <button className="md:hidden" onClick={handleMobileNav}>
        <RxHamburgerMenu />
      </button>
      {/* ADD MOBILE NAVIGATION HERE */}
    </nav>
  );
};

export default Navbar;
