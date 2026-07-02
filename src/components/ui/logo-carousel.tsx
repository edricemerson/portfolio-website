import React, { useCallback, useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Tooltip, TooltipTrigger, TooltipPanel } from "@/components/animate-ui/components/base/tooltip"
import { cn } from "@/lib/utils"
import {
  SiGo,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiDocker,
  SiGooglecloud,
  SiReact,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiVite,
  SiJsonwebtokens,
  SiOpenjdk,
  SiAndroid,
  SiGradle,
  SiSequelize,
  SiPython,
  SiPandas,
  SiJupyter,
  SiFigma,
} from "react-icons/si"

// Define the structure for our logo objects
interface Logo {
  name: string
  id: number
  category: string
  img: React.ComponentType<{ className?: string }>
}

// Order categories should appear in within the tooltip
const CATEGORY_ORDER = ["Frontend", "Backend", "Database", "Mobile", "Data & Tools"]

// Utility function to randomly shuffle an array
// This is used to mix up the order of logos for a more dynamic display
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Utility function to distribute logos across multiple columns
// This ensures each column has a balanced number of logos
const distributeLogos = (allLogos: Logo[], columnCount: number): Logo[][] => {
  const shuffled = shuffleArray(allLogos)
  const columns: Logo[][] = Array.from({ length: columnCount }, () => [])

  // Distribute logos evenly across columns
  shuffled.forEach((logo, index) => {
    columns[index % columnCount].push(logo)
  })

  // Ensure all columns have the same number of logos by filling shorter columns
  const maxLength = Math.max(...columns.map((col) => col.length))
  columns.forEach((col) => {
    while (col.length < maxLength) {
      col.push(shuffled[Math.floor(Math.random() * shuffled.length)])
    }
  })

  return columns
}

// Props for the LogoColumn component
interface LogoColumnProps {
  logos: Logo[]
  index: number
  currentTime: number
}

// LogoColumn component: Displays a single column of animated logos
const LogoColumn: React.FC<LogoColumnProps> = React.memo(
  ({ logos, index, currentTime }) => {
    const cycleInterval = 2000 // Time each logo is displayed (in milliseconds)
    const columnDelay = index * 200 // Stagger the start of each column's animation
    // Calculate which logo should be displayed based on the current time
    const adjustedTime =
      (currentTime + columnDelay) % (cycleInterval * logos.length)
    const currentIndex = Math.floor(adjustedTime / cycleInterval)

    // Memoize the current logo to prevent unnecessary re-renders
    const CurrentLogo = useMemo(
      () => logos[currentIndex].img,
      [logos, currentIndex]
    )

    return (
      // Framer Motion component for the column container
      <motion.div
        className="w-24 h-14 md:w-48 md:h-24 overflow-hidden relative"
        initial={{ opacity: 0, y: 50 }} // Start invisible and below final position
        animate={{ opacity: 1, y: 0 }} // Animate to full opacity and final position
        transition={{
          delay: index * 0.1, // Stagger the animation of each column
          duration: 0.5,
          ease: "easeOut",
        }}
      >
        {/* AnimatePresence enables animation of components that are removed from the DOM */}
        <AnimatePresence mode="wait">
          {/* Framer Motion component for each logo */}
          <motion.div
            key={`${logos[currentIndex].id}-${currentIndex}`}
            className="absolute inset-0 flex items-center justify-center"
            // Animation for when the logo enters
            initial={{ y: "10%", opacity: 0, filter: "blur(8px)" }}
            // Animation for when the logo is displayed
            animate={{
              y: "0%",
              opacity: 1,
              filter: "blur(0px)",
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 20,
                mass: 1,
                bounce: 0.2,
                duration: 0.5,
              },
            }}
            // Animation for when the logo exits
            exit={{
              y: "-20%",
              opacity: 0,
              filter: "blur(6px)",
              transition: {
                type: "tween",
                ease: "easeIn",
                duration: 0.3,
              },
            }}
          >
            <CurrentLogo
              className={cn(
                "w-20 h-20 md:w-32 md:h-32 max-w-[80%] max-h-[80%] object-contain",
                logos[currentIndex].id % 3 === 0
                  ? "fill-[url(#tech-red-gradient)]"
                  : "text-white"
              )}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    )
  }
)

// Main LogoCarousel component
function LogoCarousel({ columnCount = 2 }: { columnCount?: number }) {
  const [logoSets, setLogoSets] = useState<Logo[][]>([])
  const [currentTime, setCurrentTime] = useState(0)

  // Memoize the array of logos to prevent unnecessary re-renders
  const allLogos: Logo[] = useMemo(
    () => [
      { name: "Go", id: 1, category: "Backend", img: SiGo },
      { name: "Node.js", id: 2, category: "Backend", img: SiNodedotjs },
      { name: "Express", id: 3, category: "Backend", img: SiExpress },
      { name: "MongoDB", id: 4, category: "Database", img: SiMongodb },
      { name: "PostgreSQL", id: 5, category: "Database", img: SiPostgresql },
      { name: "MySQL", id: 6, category: "Database", img: SiMysql },
      { name: "Docker", id: 7, category: "Data & Tools", img: SiDocker },
      { name: "Google Cloud", id: 8, category: "Data & Tools", img: SiGooglecloud },
      { name: "React", id: 9, category: "Frontend", img: SiReact },
      { name: "TypeScript", id: 10, category: "Frontend", img: SiTypescript },
      { name: "JavaScript", id: 11, category: "Frontend", img: SiJavascript },
      { name: "HTML5", id: 12, category: "Frontend", img: SiHtml5 },
      { name: "CSS3", id: 13, category: "Frontend", img: SiCss },
      { name: "Tailwind CSS", id: 14, category: "Frontend", img: SiTailwindcss },
      { name: "Vite", id: 15, category: "Frontend", img: SiVite },
      { name: "JWT", id: 16, category: "Backend", img: SiJsonwebtokens },
      { name: "Java", id: 17, category: "Mobile", img: SiOpenjdk },
      { name: "Android", id: 18, category: "Mobile", img: SiAndroid },
      { name: "Gradle", id: 19, category: "Mobile", img: SiGradle },
      { name: "Sequelize", id: 20, category: "Database", img: SiSequelize },
      { name: "Python", id: 21, category: "Data & Tools", img: SiPython },
      { name: "Pandas", id: 22, category: "Data & Tools", img: SiPandas },
      { name: "Jupyter", id: 23, category: "Data & Tools", img: SiJupyter },
      { name: "Figma", id: 24, category: "Data & Tools", img: SiFigma },
    ],
    []
  )

  // Distribute logos across columns when the component mounts
  useEffect(() => {
    const distributedLogos = distributeLogos(allLogos, columnCount)
    setLogoSets(distributedLogos)
  }, [allLogos])

  // Function to update the current time (used for logo cycling)
  const updateTime = useCallback(() => {
    setCurrentTime((prevTime) => prevTime + 100)
  }, [])

  // Set up an interval to update the time every 100ms
  useEffect(() => {
    const intervalId = setInterval(updateTime, 100)
    return () => clearInterval(intervalId)
  }, [updateTime])

  // Group logos by category, in a fixed display order, for the tooltip
  const categorized = useMemo(() => {
    const groups = new Map<string, Logo[]>()
    for (const logo of allLogos) {
      const group = groups.get(logo.category) ?? []
      group.push(logo)
      groups.set(logo.category, group)
    }
    return CATEGORY_ORDER.filter((category) => groups.has(category)).map(
      (category) => ({ category, logos: groups.get(category)! })
    )
  }, [allLogos])

  // Render the logo columns
  return (
    <>
      {/* Shared gradient paint server referenced by red-tinted logos via fill-[url(#tech-red-gradient)] */}
      <svg width="0" height="0" className="absolute" aria-hidden>
        <defs>
          <linearGradient id="tech-red-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FCA5A5" />
            <stop offset="100%" stopColor="#DC2626" />
          </linearGradient>
        </defs>
      </svg>

      <Tooltip>
        <TooltipTrigger
          render={
            <motion.div
              className="flex items-center gap-4 rounded-2xl p-3 transition-colors duration-300 hover:bg-white/5"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          }
        >
          <div className="flex space-x-4">
            {logoSets.map((logos, index) => (
              <LogoColumn
                key={index}
                logos={logos}
                index={index}
                currentTime={currentTime}
              />
            ))}
          </div>
        </TooltipTrigger>
        <TooltipPanel className="max-w-xs space-y-1.5 text-left">
          {categorized.map(({ category, logos }) => (
            <p key={category}>
              <span className="font-semibold text-white">{category}:</span>{" "}
              <span className="text-white/80">
                {logos.map((logo) => logo.name).join(", ")}
              </span>
            </p>
          ))}
        </TooltipPanel>
      </Tooltip>
    </>
  )
}


export { LogoCarousel }
export default LogoCarousel
