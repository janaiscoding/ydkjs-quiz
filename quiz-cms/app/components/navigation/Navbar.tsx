import { UserContext } from "@/app/context/userContext";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";

const Navbar = () => {
  const userContext = useContext(UserContext);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogo = () => {
    if (pathname !== "/") {
      router.push("/");
    }
    window.scroll(0, 0);
  };

  return (
    <div className="bg-sky-950 flex justify-between w-full p-4 shadow-md border-b border-sky-900 h-16">
      <button onClick={handleLogo} className="px-4 text-yellow-400">
        YDKJS Quiz CMS
      </button>
      <div className="px-4 font-bold tracking-widest hover:cursor-pointer">
        {userContext.user && userContext.user.name}
      </div>
    </div>
  );
};

export default Navbar;
