import Lottie from "react-lottie";
import * as Reindeer from "@/public/reindeer_animation.json";
const Loader = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <Lottie
        options={{
          loop: true,
          animationData: Reindeer,
          autoplay: true,
        }}
      />
    </div>
  );
};

export default Loader;
