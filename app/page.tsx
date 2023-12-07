"use client";

import HomeImage from "./components/homepage/home-image";
import HomeText from "./components/homepage/home-text";

export default function Homepage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 md:gap-10 my-6 md:my-20">
      <HomeImage />
      <HomeText />
    </div>
  );
}
