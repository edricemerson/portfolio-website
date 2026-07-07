"use client"

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react"
import Autoplay from "embla-carousel-autoplay"
import { ChevronRight } from "lucide-react"
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react"

import { cn } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { ProgressiveBlur } from "@/components/ui/progressive-blur"

interface Tip {
  id: string
  text: ReactNode
  image?: string | string[]
  url?: string
}

function SlideBackground({
  image,
  rotateInterval = 3000,
}: {
  image?: string | string[]
  rotateInterval?: number
}) {
  const images = Array.isArray(image) ? image : image ? [image] : []
  const [index, setIndex] = useState(0)

  useEffect(() => {
    setIndex(0)
    if (images.length < 2) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length)
    }, rotateInterval)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.join("|"), rotateInterval])

  if (images.length === 0) {
    return (
      <div className="absolute inset-0 bg-linear-to-br from-violet-500/30 via-neutral-900 to-black" />
    )
  }

  return (
    <AnimatePresence mode="wait">
      <motion.img
        key={images[index]}
        src={images[index]}
        alt=""
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </AnimatePresence>
  )
}

interface LoadingCarouselProps {
  tips?: Tip[]
  className?: string
  autoplay?: boolean
  autoplayInterval?: number
  showNavigation?: boolean
  showIndicators?: boolean
  showProgress?: boolean
  showTipLabel?: boolean
  aspectRatio?: "video" | "square" | "wide" | "short"
  onTipChange?: (index: number) => void
  backgroundTips?: boolean
  backgroundGradient?: boolean
  shuffleTips?: boolean
}

const defaultTips: Tip[] = []

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function getTipKey(tip: Tip): string {
  return tip.id
}

const carouselVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
}

const textVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.5 } },
}

const aspectRatioClasses = {
  video: "aspect-video",
  square: "aspect-square",
  wide: "aspect-[2/1]",
  short: "aspect-[4/5] sm:aspect-video md:aspect-[3/1]",
}

export function LoadingCarousel({
  onTipChange,
  className,
  tips = defaultTips,
  showProgress = true,
  aspectRatio = "video",
  showNavigation = false,
  showIndicators = true,
  showTipLabel = true,
  backgroundTips = false,
  autoplay = true,
  autoplayInterval = 4500,
  backgroundGradient = false,
  shuffleTips = false,
}: LoadingCarouselProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const prefersReducedMotion = useReducedMotion()
  const [displayTips] = useState(() =>
    shuffleTips ? shuffleArray(tips) : tips
  )

  const autoplayPlugin = useMemo(
    () =>
      Autoplay({
        delay: autoplayInterval,
        stopOnInteraction: false,
      }),
    [autoplayInterval]
  )

  useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap())
    setDirection(
      api.scrollSnapList().indexOf(api.selectedScrollSnap()) - current
    )

    const onSelect = () => {
      const newIndex = api.selectedScrollSnap()
      setCurrent(newIndex)
      setDirection(api.scrollSnapList().indexOf(newIndex) - current)
      onTipChange?.(newIndex)
    }

    api.on("select", onSelect)

    return () => {
      api.off("select", onSelect)
    }
  }, [api, current, onTipChange])

  const handleSelect = useCallback(
    (index: number) => {
      api?.scrollTo(index)
    },
    [api]
  )

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 0.8, ease: "easeOut" }
      }
      className={cn(
        "mx-auto w-full max-w-6xl cursor-pointer overflow-hidden rounded-xl bg-neutral-900/80 shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05),0px_1px_1px_0px_rgba(255,252,240,0.5)_inset,0_0_60px_-8px_rgba(167,139,250,0.5)]",
        className
      )}
    >
      <div className="w-full overflow-hidden rounded-xl">
        <Carousel
          setApi={setApi}
          plugins={autoplay ? [autoplayPlugin] : []}
          className="relative w-full"
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            <AnimatePresence initial={false} custom={direction}>
              {(displayTips || []).map((tip) => (
                <CarouselItem key={getTipKey(tip)} className="min-w-0">
                  <motion.div
                    variants={carouselVariants}
                    initial={prefersReducedMotion ? false : "enter"}
                    animate="center"
                    exit={prefersReducedMotion ? undefined : "exit"}
                    custom={direction}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { duration: 0.8, ease: "easeInOut" }
                    }
                    className={`relative ${aspectRatioClasses[aspectRatio]} w-full overflow-hidden`}
                  >
                    <SlideBackground image={tip.image} />
                    {backgroundGradient && (
                      <div className="absolute inset-0 bg-black/55" />
                    )}

                    {backgroundTips ? (
                      <motion.div
                        variants={textVariants}
                        initial={prefersReducedMotion ? false : "hidden"}
                        animate="visible"
                        className="absolute inset-0 flex min-w-0 flex-col items-center justify-center p-4 text-center sm:p-6 md:p-8"
                      >
                        {displayTips[current]?.url ? (
                          <a
                            href={displayTips[current]?.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block min-w-0 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                          >
                            <div className="wrap-break-word text-center text-base font-bold leading-relaxed tracking-tight text-white text-pretty drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] sm:text-lg md:text-xl lg:text-2xl">
                              {tip.text}
                            </div>
                          </a>
                        ) : (
                          <div className="wrap-break-word text-center text-base font-bold leading-relaxed tracking-tight text-white text-pretty drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] sm:text-lg md:text-xl lg:text-2xl">
                            {tip.text}
                          </div>
                        )}
                      </motion.div>
                    ) : null}
                  </motion.div>
                </CarouselItem>
              ))}
            </AnimatePresence>
          </CarouselContent>
          {showNavigation && (
            <>
              <CarouselPrevious className="absolute left-2 top-1/2 h-10 w-10 -translate-y-1/2 transition-transform active:scale-[0.96]" />
              <CarouselNext className="absolute right-2 top-1/2 h-10 w-10 -translate-y-1/2 transition-transform active:scale-[0.96]" />
            </>
          )}
          <ProgressiveBlur position="top" height="20%" className="z-20" />
          <ProgressiveBlur position="bottom" height="20%" className="z-20" />
        </Carousel>
        <div
          className={cn(
            "bg-neutral-900/80 p-4 sm:p-5",
            showIndicators && !backgroundTips ? "lg:px-4 lg:py-3" : ""
          )}
        >
          <div
            className={cn(
              "flex min-w-0 flex-col items-start justify-between gap-3 sm:flex-row sm:items-center",
              showIndicators && !backgroundTips
                ? "sm:flex-col sm:items-start"
                : ""
            )}
          >
            {showIndicators && (
              <div className="flex w-full gap-2 overflow-x-auto pb-1 sm:pb-0">
                {(displayTips || []).map((tip, index) => {
                  const isActive = index === current
                  const isComplete = index < current

                  return (
                    <button
                      key={getTipKey(tip)}
                      type="button"
                      className="flex h-10 min-w-8 flex-1 cursor-pointer items-center rounded-full transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-neutral-900 active:scale-[0.96] sm:min-w-0 sm:shrink"
                      onClick={() => handleSelect(index)}
                      aria-label={`Go to tip ${index + 1}`}
                      aria-current={isActive ? "true" : undefined}
                    >
                      <span className="relative h-1 w-full overflow-hidden rounded-full bg-white/15">
                        {showProgress && autoplay ? (
                          isComplete ? (
                            <span className="absolute inset-0 rounded-full bg-white/70" />
                          ) : isActive ? (
                            <motion.span
                              key={current}
                              initial={{ scaleX: prefersReducedMotion ? 1 : 0 }}
                              animate={{ scaleX: 1 }}
                              transition={
                                prefersReducedMotion
                                  ? { duration: 0 }
                                  : {
                                      duration: autoplayInterval / 1000,
                                      ease: "linear",
                                    }
                              }
                              className="absolute inset-0 origin-left rounded-full bg-white/70"
                            />
                          ) : null
                        ) : (
                          <span
                            className={cn(
                              "absolute inset-0 origin-left rounded-full bg-white/70 transition-transform",
                              prefersReducedMotion
                                ? "duration-0"
                                : "duration-300 ease-out",
                              isActive ? "scale-x-100" : "scale-x-0"
                            )}
                          />
                        )}
                      </span>
                    </button>
                  )
                })}
              </div>
            )}
            {showTipLabel && (
              <div className="flex min-w-0 items-center gap-2 text-white">
                {backgroundTips ? (
                  <span className="whitespace-nowrap text-sm font-medium tabular-nums">
                    Tip {current + 1}/{displayTips?.length || 0}
                  </span>
                ) : (
                  <div className="min-w-0 max-w-full">
                    {displayTips[current]?.url ? (
                      <a
                        href={displayTips[current]?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="wrap-break-word block max-w-full rounded-sm text-base font-medium leading-tight tracking-tight text-pretty focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-neutral-900 lg:text-2xl xl:font-semibold"
                      >
                        {displayTips[current]?.text}
                      </a>
                    ) : (
                      <div className="wrap-break-word block max-w-full text-base font-medium leading-tight tracking-tight text-pretty lg:text-2xl xl:font-semibold">
                        {displayTips[current]?.text}
                      </div>
                    )}
                  </div>
                )}
                {backgroundTips && (
                  <ChevronRight aria-hidden="true" className="h-4 w-4" />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default LoadingCarousel
