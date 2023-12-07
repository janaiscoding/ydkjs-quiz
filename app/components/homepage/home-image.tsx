import { motion } from "framer-motion";
import Image from "next/image";
import { fromTop } from "@/app/utils/animation_variants";

const HomeImage = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fromTop}
      className="basis-full"
    >
      <Image
        src={"/illustration.png"}
        alt="illustration"
        width={600}
        height={600}
        className="object-fit w-60 md:w-96 float__image"
        priority={true}
      />
    </motion.div>
  );
};
export default HomeImage;
