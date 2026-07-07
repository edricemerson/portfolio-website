import { Fragment, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Check, Download, Menu, X } from "lucide-react"
import NeumorphButton from "@/components/ui/neumorph-button"
import { cn } from "@/lib/utils"
import { LIQUID_GLASS } from "@/lib/styles"
import CV from "../document/CV Edric.pdf"

const navItems = [
    {
        id: "about",
        href: "#about",
        label: "ABOUT",
        rgb: "255, 0, 0",
        glass: "hover:bg-red-500/20 hover:border-red-400/50 hover:shadow-[0_4px_20px_rgba(255,0,0,0.35)]",
    },
    {
        id: "experience",
        href: "#experience",
        label: "EXPERIENCE",
        rgb: "167, 139, 250",
        glass: "hover:bg-violet-400/20 hover:border-violet-300/50 hover:shadow-[0_4px_20px_rgba(167,139,250,0.35)]",
    },
    {
        id: "education",
        href: "#education",
        label: "EDUCATION",
        rgb: "52, 211, 153",
        glass: "hover:bg-emerald-400/20 hover:border-emerald-300/50 hover:shadow-[0_4px_20px_rgba(52,211,153,0.35)]",
    },
    {
        id: "project",
        href: "#project",
        label: "PROJECT",
        rgb: "251, 191, 36",
        glass: "hover:bg-amber-400/20 hover:border-amber-300/50 hover:shadow-[0_4px_20px_rgba(251,191,36,0.35)]",
    },
] as const

function Navbar() {
    const [active, setActive] = useState<string>(navItems[0].id)
    const [downloaded, setDownloaded] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)

    const handleClick = (id: string) => {
        setActive(id)
        setMobileOpen(false)
    }

    const handleDownloadClick = () => {
        if (downloaded) return
        const link = document.createElement("a")
        link.href = CV
        link.download = "EdricEmerson_CV.pdf"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        setDownloaded(true)
        setTimeout(() => setDownloaded(false), 2000)
    }

    const downloadButton = (
        <NeumorphButton
            intent="secondary"
            onClick={handleDownloadClick}
            className="flex w-full shrink-0 justify-center overflow-hidden md:w-40"
        >
            <AnimatePresence mode="wait" initial={false}>
                {downloaded ? (
                    <motion.span
                        key="check"
                        className="flex items-center justify-center"
                        initial={{ scale: 0, opacity: 0.4, filter: "blur(4px)" }}
                        animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                        exit={{ scale: 0, opacity: 0.4, filter: "blur(4px)" }}
                        transition={{ duration: 0.25 }}
                    >
                        <Check className="size-5" />
                    </motion.span>
                ) : (
                    <motion.span
                        key="download"
                        className="flex items-center justify-center gap-2"
                        initial={{ scale: 0, opacity: 0.4, filter: "blur(4px)" }}
                        animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                        exit={{ scale: 0, opacity: 0.4, filter: "blur(4px)" }}
                        transition={{ duration: 0.25 }}
                    >
                        <Download className="size-4" />
                        Download CV
                    </motion.span>
                )}
            </AnimatePresence>
        </NeumorphButton>
    )

    return (
        <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className={cn(LIQUID_GLASS, "sticky top-0 z-50 mx-auto w-full px-4 py-3 sm:px-6 md:w-fit md:px-12 md:py-4 rounded-t-none")}
        >
            <div className="flex items-center justify-between md:hidden">
                <span className="text-lg font-bold text-white">Edric Emerson</span>
                <motion.button
                    type="button"
                    onClick={() => setMobileOpen((open) => !open)}
                    whileTap={{ scale: 0.9 }}
                    className="flex size-10 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white"
                    aria-label={mobileOpen ? "Close menu" : "Open menu"}
                >
                    {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
                </motion.button>
            </div>

            <div className="relative hidden items-center justify-between gap-2 text-lg font-bold md:flex md:w-auto lg:w-5xl">
                {navItems.map((item) => (
                    <Fragment key={item.id}>
                        <div className="relative">
                            <motion.a
                                href={item.href}
                                onClick={() => handleClick(item.id)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.96 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                className={`relative block px-8 py-2 rounded-xl border border-transparent transition-colors duration-300 ease-out hover:backdrop-blur-md ${item.glass}`}
                            >
                                {active === item.id && (
                                    <motion.span
                                        layoutId="nav-bubble"
                                        className="absolute inset-0 rounded-xl border backdrop-blur-md"
                                        style={{
                                            backgroundColor: `rgba(${item.rgb}, 0.3)`,
                                            borderColor: `rgba(${item.rgb}, 0.6)`,
                                            boxShadow: `0 4px 20px rgba(${item.rgb}, 0.45)`,
                                        }}
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                                    />
                                )}
                                <span className="relative z-10">{item.label}</span>
                            </motion.a>
                        </div>
                        {item.id === "experience" && downloadButton}
                    </Fragment>
                ))}
            </div>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="overflow-hidden md:hidden"
                    >
                        <div className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-4">
                            {navItems.map((item) => (
                                <a
                                    key={item.id}
                                    href={item.href}
                                    onClick={() => handleClick(item.id)}
                                    className={cn(
                                        "rounded-xl px-4 py-2.5 text-base font-bold text-white/90 transition-colors duration-200",
                                        active === item.id ? "bg-white/15" : ""
                                    )}
                                >
                                    {item.label}
                                </a>
                            ))}
                            {downloadButton}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}
export default Navbar
