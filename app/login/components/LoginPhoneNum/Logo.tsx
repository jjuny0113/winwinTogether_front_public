import React from "react";
import Image from "next/image";
const Logo = () => {
  return (
    <div className="flex flex-col items-center">
      <Image
        src={"/logoCircle.png"}
        alt="mainCharacter"
        width={133}
        height={178}
      />
      <Image src={"/opengraph-image.png"} alt="logo" width={155} height={43} />
      
    </div>
  );
};

export default Logo;
