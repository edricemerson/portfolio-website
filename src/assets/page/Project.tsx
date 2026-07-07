import { useCallback, useEffect, useMemo, useState } from "react"
import { motion } from "motion/react"
import { Dialog, DropdownMenu } from "radix-ui"
import { ChevronDown, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { LIQUID_GLASS } from "@/lib/styles"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel"
import { Tooltip, TooltipTrigger, TooltipPanel } from "@/components/animate-ui/components/base/tooltip"
import { GithubLanguageBar } from "@/components/ui/github-language-bar"
import mst1 from "../photo/projectPhoto/mst/mst1.png"
import mst2 from "../photo/projectPhoto/mst/mst2.png"
import mst3 from "../photo/projectPhoto/mst/mst3.png"
import mst4 from "../photo/projectPhoto/mst/mst4.png"
import mst5 from "../photo/projectPhoto/mst/mst5.png"

function loadProjectImages(modules: Record<string, string>): string[] {
    return Object.keys(modules)
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
        .map((key) => modules[key])
}

const tmsImages = loadProjectImages(
    import.meta.glob("../photo/projectPhoto/tms/*.png", {
        eager: true,
        import: "default",
    }) as Record<string, string>
)

const eduImages = loadProjectImages(
    import.meta.glob("../photo/projectPhoto/edu/*.png", {
        eager: true,
        import: "default",
    }) as Record<string, string>
)

const hotelApiImages = loadProjectImages(
    import.meta.glob("../photo/projectPhoto/hotel-api/*.png", {
        eager: true,
        import: "default",
    }) as Record<string, string>
)

function GithubIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden>
            <path
                fillRule="evenodd"
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
            />
        </svg>
    )
}

interface ProjectEntry {
    src: string[]
    title: string
    description: string
    tags: string[]
    date: string
    repo: string
}

const projects: ProjectEntry[] = [
    {
        src: [mst1, mst2, mst3, mst4, mst5],
        title: "MajuSuksesTeknik Portfolio",
        description: "A fullstack company portfolio website showcasing services, projects, and company profile with a responsive, modern interface.",
        tags: ["Website", "Portfolio"],
        date: "30 June 2026",
        repo: "edricemerson/majusuksesteknik"
    },
    {
        src: tmsImages,
        title: "Treemas CMS",
        description: "A content management system built for PT. Treemas Sollusi Utama, featuring an admin dashboard, interactive PDF smartforms, and streamlined tools for managing company data.",
        tags: ["Website", "Content Mangement System"],
        date: "1 April 2026",
        repo: "edricemerson/TreemasCMS"
    },
    {
        src: eduImages,
        title: "EduQuiz",
        description: "A Kahoot-style interactive quiz platform for classrooms, with real-time gameplay for students and an admin dashboard to manage quizzes, questions, and participants.",
        tags: ["Website", "Quiz App"],
        date: "4 November 2025",
        repo: "edricemerson/eduquiz-app"
    },
    {
        src: hotelApiImages,
        title: "Hotel API",
        description: "A RESTful backend API for hotel management, handling room bookings, reservations, and guest data through structured, well-documented endpoints. Integrates the SendGrid API to automatically send email notifications when a booking is made.",
        tags: ["API", "Backend"],
        date: "6 March 2026",
        repo: "edricemerson/hotel-api"
    },
]

type SortOrder = "new-to-old" | "old-to-new"

const sortOptions: { value: SortOrder; label: string }[] = [
    { value: "new-to-old", label: "New to Old" },
    { value: "old-to-new", label: "Old to New" },
]

function Project() {
    const [selected, setSelected] = useState<ProjectEntry | null>(null)
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [sortOrder, setSortOrder] = useState<SortOrder>("new-to-old")
    const [showAllMobile, setShowAllMobile] = useState(false)

    const sortedProjects = useMemo(() => {
        const withTime = projects.map((project) => ({
            project,
            time: new Date(project.date).getTime(),
        }))
        withTime.sort((a, b) => (sortOrder === "new-to-old" ? b.time - a.time : a.time - b.time))
        return withTime.map(({ project }) => project)
    }, [sortOrder])

    useEffect(() => {
        if (!api) return
        setCurrent(api.selectedScrollSnap())
        const onSelect = () => setCurrent(api.selectedScrollSnap())
        api.on("select", onSelect)
        return () => {
            api.off("select", onSelect)
        }
    }, [api])

    const handleSelect = useCallback(
        (index: number) => {
            api?.scrollTo(index)
        },
        [api]
    )

    return (
        <div id="project" className="scroll-mt-28 px-4 sm:px-8 md:px-16 mt-20 mb-20">
            <motion.div
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="text-white font-bold text-xl sm:text-2xl">
                    WHAT I'VE BUILT
                </div>
                <div className="text-amber-400 font-bold text-4xl sm:text-5xl md:text-6xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                    PROJECTS
                </div>
            </motion.div>

            <div className="mt-8 flex justify-center">
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                        <button
                            type="button"
                            className={cn(
                                LIQUID_GLASS,
                                "flex cursor-pointer items-center gap-2 px-6 py-2 text-sm font-medium text-white/90"
                            )}
                        >
                            Sort: {sortOptions.find((option) => option.value === sortOrder)?.label}
                            <ChevronDown className="size-4 text-white/60" />
                        </button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Portal>
                        <DropdownMenu.Content
                            align="end"
                            sideOffset={8}
                            className={cn(
                                LIQUID_GLASS,
                                "z-50 min-w-44 overflow-hidden p-1.5 outline-none",
                                "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
                                "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
                            )}
                        >
                            <DropdownMenu.RadioGroup
                                value={sortOrder}
                                onValueChange={(value) => setSortOrder(value as SortOrder)}
                            >
                                {sortOptions.map((option) => (
                                    <DropdownMenu.RadioItem
                                        key={option.value}
                                        value={option.value}
                                        className="flex cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm text-white/80 outline-none transition hover:bg-white/15 hover:text-white data-[state=checked]:text-amber-400"
                                    >
                                        {option.label}
                                        <DropdownMenu.ItemIndicator>
                                            <Check className="size-4" />
                                        </DropdownMenu.ItemIndicator>
                                    </DropdownMenu.RadioItem>
                                ))}
                            </DropdownMenu.RadioGroup>
                        </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                </DropdownMenu.Root>
            </div>

            <div className="mt-4 flex flex-wrap justify-center gap-6">
                {sortedProjects.map((project, i) => (
                    <motion.button
                        key={project.title}
                        type="button"
                        onClick={() => setSelected(project)}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.1 }}
                        className={cn(
                            LIQUID_GLASS,
                            "w-full max-w-xs cursor-pointer overflow-hidden text-left",
                            i >= 2 && !showAllMobile && "hidden md:block"
                        )}
                    >
                        <img src={project.src[0]} className="h-48 w-full object-cover" />
                        <div className="flex flex-col gap-2 p-5">
                            <h3 className="text-lg font-bold text-white">
                                {project.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-white/70">
                                {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2 pt-1">
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-400"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <p className="text-sm leading-relaxed text-white/70">
                                {project.date}
                            </p>
                        </div>
                    </motion.button>
                ))}
            </div>

            <motion.div
                className={cn(
                    "mt-20 text-center text-lg sm:text-xl md:text-2xl font-medium tracking-wide text-white/50",
                    sortedProjects.length > 2 && !showAllMobile && "hidden md:block"
                )}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                More coming soon..
            </motion.div>

            {sortedProjects.length > 2 && (
                <div className="mt-6 flex justify-center md:hidden">
                    <button
                        type="button"
                        onClick={() => setShowAllMobile((show) => !show)}
                        className={cn(
                            LIQUID_GLASS,
                            "cursor-pointer px-6 py-2 text-sm font-medium text-white/90"
                        )}
                    >
                        {showAllMobile ? "See Less" : "See More"}
                    </button>
                </div>
            )}

            <Dialog.Root open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
                <Dialog.Portal>
                    <Dialog.Overlay
                        className={cn(
                            "fixed inset-0 z-50 bg-black/70 backdrop-blur-sm",
                            "data-[state=open]:animate-in data-[state=open]:fade-in-0",
                            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
                        )}
                    />
                    <Dialog.Content
                        className={cn(
                            LIQUID_GLASS,
                            "fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-3xl max-h-[90vh] -translate-x-1/2 -translate-y-1/2 overflow-y-auto outline-none",
                            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
                            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
                        )}
                    >
                        {selected && (
                            <>
                                <Carousel opts={{ loop: true }} setApi={setApi} className="w-full">
                                    <CarouselContent className="ml-0">
                                        {selected.src.map((src, idx) => (
                                            <CarouselItem key={idx} className="pl-0">
                                                <img
                                                    src={src}
                                                    className="h-56 w-full object-cover sm:h-72 md:h-104"
                                                />
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                </Carousel>
                                {selected.src.length > 1 && (
                                    <div className="flex gap-2 bg-neutral-900/80 px-4 py-3">
                                        {selected.src.map((_, index) => {
                                            const isActive = index === current
                                            return (
                                                <button
                                                    key={index}
                                                    type="button"
                                                    onClick={() => handleSelect(index)}
                                                    aria-label={`Go to image ${index + 1}`}
                                                    aria-current={isActive ? "true" : undefined}
                                                    className="h-1 flex-1 cursor-pointer overflow-hidden rounded-full bg-white/15"
                                                >
                                                    <span
                                                        className={cn(
                                                            "block h-full origin-left rounded-full bg-white/70 transition-transform duration-300 ease-out",
                                                            isActive ? "scale-x-100" : "scale-x-0"
                                                        )}
                                                    />
                                                </button>
                                            )
                                        })}
                                    </div>
                                )}
                                <div className="flex flex-col gap-3 p-6">
                                    <div className="flex items-center justify-between gap-3">
                                        <Dialog.Title className="text-2xl font-bold text-white">
                                            {selected.title}
                                        </Dialog.Title>
                                        <Tooltip>
                                            <TooltipTrigger render={<span className="contents" />}>
                                                <a
                                                    href={`https://github.com/${selected.repo}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex size-9 shrink-0 items-center justify-center rounded-full bg-black/40 text-white/80 transition hover:bg-black/60 hover:text-white"
                                                >
                                                    <GithubIcon className="size-5" />
                                                </a>
                                            </TooltipTrigger>
                                            <TooltipPanel showArrow={false}>View on GitHub</TooltipPanel>
                                        </Tooltip>
                                    </div>
                                    <GithubLanguageBar repo={selected.repo} className="pt-1" />
                                    <div className="flex flex-wrap gap-2 pt-1">
                                        {selected.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-400"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <p className="text-sm text-white/50">
                                        {selected.date}
                                    </p>
                                </div>
                                <Tooltip>
                                    <TooltipTrigger render={<span className="contents" />}>
                                        <Dialog.Close className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full bg-black/40 text-white/80 transition hover:bg-black/60 hover:text-white">
                                            ✕
                                        </Dialog.Close>
                                    </TooltipTrigger>
                                    <TooltipPanel showArrow={false}>Close</TooltipPanel>
                                </Tooltip>
                            </>
                        )}
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    )
}
export default Project
