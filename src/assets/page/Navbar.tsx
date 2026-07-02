import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import NeumorphButton from "@/components/ui/neumorph-button"

const navItems = [
    {
        id: "about",
        href: "#about",
        label: "ABOUT",
        rgb: "56, 189, 248",
        glass: "hover:bg-sky-400/20 hover:border-sky-300/50 hover:shadow-[0_4px_20px_rgba(56,189,248,0.35)]",
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
    {
        id: "contact",
        href: "#contact",
        label: "CONTACT",
        rgb: "251, 113, 133",
        glass: "hover:bg-rose-400/20 hover:border-rose-300/50 hover:shadow-[0_4px_20px_rgba(251,113,133,0.35)]",
    },
] as const

function Navbar() {
    const [active, setActive] = useState<string>(navItems[0].id)
    const [contactOpen, setContactOpen] = useState(false)
    const contactRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (contactRef.current && !contactRef.current.contains(e.target as Node)) {
                setContactOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        setActive(id)
        if (id === "contact") {
            e.preventDefault()
            setContactOpen((open) => !open)
        } else {
            setContactOpen(false)
        }
    }

    return (
        <div className="flex flex-col items-center px-12 py-4 text-white bg-white/10
        backdrop-blur-2xl backdrop-saturate-150 border border-transparent w-fit mx-auto
        rounded-2xl mt-6 shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.4)]
        transform-gpu will-change-transform transition-all duration-300 ease-out hover:scale-105 hover:bg-white/20 hover:border-white/25">
            <NeumorphButton intent="secondary" className="flex justify-center">
                Download CV
            </NeumorphButton>

            <div className="relative text-lg flex justify-between w-5xl mt-4 font-bold gap-2">
                {navItems.map((item) => (
                    <div
                        key={item.id}
                        ref={item.id === "contact" ? contactRef : undefined}
                        className="relative"
                    >
                        <a
                            href={item.href}
                            onClick={(e) => handleClick(e, item.id)}
                            className={`relative block px-8 py-2 rounded-xl border border-transparent transform-gpu transition-all duration-300 ease-out hover:scale-105 hover:backdrop-blur-md ${item.glass}`}
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
                        </a>

                        {item.id === "contact" && (
                            <AnimatePresence>
                                {contactOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                        exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                                        transition={{ duration: 0.25, ease: "easeOut" }}
                                        className="absolute left-1/2 top-full z-20 mt-3 w-64 -translate-x-1/2 rounded-2xl border border-white/25 bg-white/10 p-4 text-left text-sm font-normal text-white shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.4)] backdrop-blur-2xl backdrop-saturate-150"
                                    >
                                        <a href="https://wa.me/628111859098" className="block hover:text-rose-300">
                                            +62 8111 859098
                                        </a>
                                        <a href="mailto:edriceson@gmail.com" className="mt-2 block hover:text-rose-300">
                                            edriceson@gmail.com
                                        </a>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Navbar
