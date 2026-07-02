import { Fragment, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Check, Download } from "lucide-react"
import NeumorphButton from "@/components/ui/neumorph-button"
import { cn } from "@/lib/utils"
import { LIQUID_GLASS } from "@/lib/styles"

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

    const handleClick = (id: string) => {
        setActive(id)
    }

    const handleDownloadClick = () => {
        if (downloaded) return
        setDownloaded(true)
        setTimeout(() => setDownloaded(false), 2000)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            whileHover={{ scale: 1.05 }}
            className={cn(LIQUID_GLASS, "sticky top-0 z-50 flex items-center px-12 py-4 w-fit mx-auto rounded-t-none")}
        >
            <div className="relative text-lg flex items-center justify-between w-5xl font-bold gap-2">
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
                        {item.id === "experience" && (
                            <NeumorphButton
                                intent="secondary"
                                onClick={handleDownloadClick}
                                className="flex w-40 shrink-0 justify-center overflow-hidden"
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
                        )}
                    </Fragment>
                ))}
            </div>
        </motion.div>
    )
}
export default Navbar
