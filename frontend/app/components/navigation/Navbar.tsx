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
    <div className="bg-sky-950 flex flex-col gap-4 md:justify-center justify-between items-center w-full p-4 shadow-md border-b border-sky-900 z-50">
      <div className="flex md:justify-center justify-between items-center w-full">
        <a href="/" className="px-4 text-yellow-400">Home</a>
        <nav className="text-neutral-400">
          <div className="md:hidden">
            <button onClick={handleMobileNav}>
              <RxHamburgerMenu />
            </button>
            {/* ADD MOBILE NAVIGATION HERE */}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
