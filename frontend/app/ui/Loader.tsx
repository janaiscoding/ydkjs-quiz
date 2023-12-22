import { Player } from '@lottiefiles/react-lottie-player';

import * as Reindeer from "@/public/reindeer_animation.json";
const Loader = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <Player
        src={Reindeer}
        loop
        autoplay   
      />
    </div>
  );
};

export default Loader;
