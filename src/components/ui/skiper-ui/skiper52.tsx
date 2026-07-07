"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { cn } from "@/lib/utils";

interface HoverExpandImage {
  src: string;
  alt: string;
  title: string;
  period: string;
  detail?: string;
}

const HoverExpand_001 = ({
  images,
  className,
  defaultActive = 0,
}: {
  images: HoverExpandImage[];
  className?: string;
  defaultActive?: number | null;
}) => {
  const [activeImage, setActiveImage] = useState<number | null>(defaultActive);

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.5,
      }}
      className={cn("relative w-full px-2 sm:px-5", className)}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <div className="flex w-full items-center justify-center gap-1 overflow-x-auto">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="relative shrink-0 cursor-pointer overflow-hidden rounded-2xl sm:rounded-3xl"
              initial={{ width: "1.75rem", height: "12rem" }}
              animate={{
                width: activeImage === index ? "clamp(10rem, 60vw, 34rem)" : "clamp(1.75rem, 8vw, 5rem)",
                height: activeImage === index ? "clamp(14rem, 55vw, 24rem)" : "clamp(12rem, 55vw, 24rem)",
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onClick={() => setActiveImage(index)}
              onHoverStart={() => setActiveImage(index)}
            >
              <AnimatePresence>
                {activeImage === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute h-full w-full bg-black/60"
                  />
                )}
              </AnimatePresence>
              <AnimatePresence>
                {activeImage === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute flex h-full w-full flex-col items-center justify-center gap-2 p-3 text-center sm:p-5"
                  >
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 sm:text-sm">
                      {image.period}
                    </span>
                    <p className="text-xl font-bold text-white sm:text-3xl">{image.title}</p>
                    {image.detail && (
                      <p className="text-sm text-white/70 sm:text-lg">{image.detail}</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
              <img
                src={image.src}
                className="size-full object-cover"
                alt={image.alt}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export { HoverExpand_001 };
export type { HoverExpandImage };

/**
 * Skiper 52 HoverExpand_001 — React + Motion
 * Illustrations by AarzooAly - https://x.com/AarzooAly
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 * - No attribution required with Skiper UI Pro.
 *
 * Feedback and contributions are welcome.
 *
 * Author: @gurvinder-singh02
 * Website: https://gxuri.me
 * Twitter: https://x.com/Gur__vi
 */
