"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  AnimationProps,
  PanInfo,
} from "framer-motion";
import { wrap } from "@popmotion/popcorn";

const sliderVariants: AnimationProps["variants"] = {
  incoming: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
  }),
  active: { x: 0 },
  exit: (direction) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

const sliderTransition: AnimationProps["transition"] = {
  duration: 0.5,
  ease: [0.56, 0.03, 0.12, 1.04],
};

interface ImageCarouselProps {
  imgUrls: string[];
}

const ImageCarousel = ({ imgUrls }: ImageCarouselProps) => {
  const [[imageCount, direction], setImageCount] = useState([0, 0]);

  const activeImageIndex = wrap(0, imgUrls.length, imageCount);

  const swipeToImage = (swipeDirection: number) => {
    setImageCount([imageCount + swipeDirection, swipeDirection]);
  };

  const dragEndHandler = (dragInfo: PanInfo) => {
    const draggedDistance = dragInfo.offset.x;
    const swipeThreshold = 50;
    if (draggedDistance > swipeThreshold) {
      swipeToImage(-1);
    } else if (draggedDistance < -swipeThreshold) {
      swipeToImage(1);
    }
  };

  return (
    <div className="flex justify-center relative h-[200px] w-full">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={imageCount}
          style={{
            backgroundImage: `url(${imgUrls[activeImageIndex]})`,
          }}
          custom={direction}
          variants={sliderVariants}
          initial="incoming"
          animate="active"
          exit="exit"
          transition={sliderTransition}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(_, dragInfo) => dragEndHandler(dragInfo)}
          className="absolute h-full w-full bg-black bg-contain bg-no-repeat bg-center will-change-transform will-change-opacity"
        />
      </AnimatePresence>
      <div className="flex gap-1 absolute bottom-2">
        {Array(imgUrls.length)
          .fill(null)
          .map((_, index) => index)
          .map((num) => (
            <div
              key={num}
              className={`w-2 h-2 rounded-full  ${
                num === activeImageIndex
                  ? "bg-purpleMainHover"
                  : "bg-purpleLight"
              }`}
            ></div>
          ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
