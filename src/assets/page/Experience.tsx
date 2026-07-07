import { motion } from "motion/react"
import { LoadingCarousel } from "@/components/ui/loading-carousel"
import future from "../photo/future.jpg"
import baby from "../photo/baby.jpg"
import study from "../photo/study.jpg"
import yamamax from "../photo/yamamax.png"
import treemas from "../photo/treemas.png"

interface TimelineEntry {
    src?: string | string[]
    date: string
    title: string
    subtitle?: string
    bullets?: string[]
}

const experienceTimeline: TimelineEntry[] = [
    {
        src: [baby, study],
        date: "2004",
        title: "Edric Was Born and Studying Hard",
    },
    {
        src: yamamax,
        date: "May 2022 – June 2023",
        title: "Operational Staff",
        subtitle: "YAMAMAX INDONESIA — Jakarta, Indonesia",
        bullets: [
            "Record stock of products to be inputted into system weekly, in scale of 50-100 products per week",
            "Prepare simple bookkeeping and calculating regarding to sales, profit, and gross profit using Excel",
        ],
    },
    {
        src:treemas,
        date: "February 2026 – Present",
        title: "Programmer",
        subtitle: "PT. Treemas Sollusi Utama",
        bullets: [
            "Build interactive, responsive user interfaces using React and also testing features and fixing bugs",
            "Translate UI/UX designs into frontend code with consistent styling (e.g., Tailwind CSS)",
            "Build interactive PDF Smartform for users to easily fill and securely submit their data",
        ],
    },
    {
        src: future,
        date: "",
        title: "We don't know what the future holds",
    },
]

const timelineTips = experienceTimeline.map((entry, i) => ({
    id: `experience-${i}`,
    image: entry.src,
    text: (
        <div className="flex flex-col gap-2 sm:gap-3">
            {entry.date && (
                <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-violet-400">
                    {entry.date}
                </span>
            )}
            <h3 className="text-xl sm:text-2xl font-bold text-white lg:text-4xl">{entry.title}</h3>
            {entry.subtitle && (
                <p className="text-sm sm:text-base lg:text-lg font-normal text-white/60">{entry.subtitle}</p>
            )}
            {entry.bullets && (
                <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base font-normal leading-relaxed text-white/80 lg:text-xl">
                    {entry.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex gap-1.5">
                            <span className="shrink-0 text-violet-400">●</span>
                            <span>{bullet}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    ),
}))

function Experience() {
    return (
        <div id="experience" className="scroll-mt-28 px-4 sm:px-8 md:px-16 mt-20">
            <motion.div
                className="flex w-full flex-col items-center gap-4 text-center md:flex-row md:items-center md:justify-between md:gap-0 md:text-left"
                initial={{ opacity: 0, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="flex flex-col items-center md:items-start">
                    <div className="text-white font-bold text-xl sm:text-2xl">
                        2004 - Present
                    </div>
                    <div className="text-violet-400 font-bold text-4xl sm:text-5xl md:text-6xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                        EXPERIENCE
                    </div>
                </div>
                <div className="hidden h-1 flex-1 bg-white/30 md:mx-8 md:block" />
                <div className="h-px w-full bg-white/20 md:hidden" />
                <div className="flex flex-col items-center md:items-end">
                    <div className="text-violet-400 font-bold text-lg sm:text-xl md:text-2xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                        ONLY PRACTICAL WORK AND EXPERIENCE LEAD THE YOUNG TO MATURITY
                    </div>
                    <div className="text-white font-bold text-lg sm:text-xl md:text-2xl">
                        THE ONLY SOURCE OF KNOWLEDGE IS EXPERIENCE
                    </div>
                </div>
            </motion.div>

            <motion.div
                className="mt-10"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <LoadingCarousel
                    tips={timelineTips}
                    aspectRatio="short"
                    backgroundTips
                    backgroundGradient
                    showTipLabel={false}
                    autoplay={false}
                />
            </motion.div>
        </div>
    )
}

export default Experience
