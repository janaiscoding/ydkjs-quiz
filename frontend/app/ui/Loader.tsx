import Lottie from "react-lottie";
import * as Reindeer from "@/public/reindeer_animation.json";
const Loader = () => {
  return (
    <Lottie
      options={{
        loop: true,
        animationData: Reindeer,
        autoplay: true,
      }}
    />
  );
};

export default Loader;
