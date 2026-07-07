import { useState } from "react"
import { motion } from "motion/react"
import { TypingAnimation } from "@/components/ui/typing-animation"
import { cn } from "@/lib/utils"
import { LIQUID_GLASS } from "@/lib/styles"
import { outerDivVariants, innerSpanVariants, buttonVariants as bgButtonVariants } from "@/components/ui/bg-animate-button"
import { LogoCarousel } from "@/components/ui/logo-carousel"
import aboutPhoto from "../photo/fotoEdric.jpeg"
import link from "../photo/linkedin.svg"
import phone from "../photo/phone.svg"
import email from "../photo/email.svg"

function VerticalLabel({ text }: { text: string }) {
    return (
        <div className="flex flex-col items-center justify-center gap-0.5 text-xl font-bold tracking-widest text-white/50">
            {text.split("").map((char, i) => (
                <span key={i}>{char}</span>
            ))}
        </div>
    )
}

function HorizontalLabel({ text }: { text: string }) {
    return (
        <div className="flex items-center justify-center gap-2 text-xl font-bold text-white/50">
            {text.split("").map((char, i) => (
                <span key={i}>{char}</span>
            ))}
        </div>
    )
}

function ContactLink({
    href,
    icon,
    external = true,
    children,
}: {
    href: string
    icon: string
    external?: boolean
    children: React.ReactNode
}) {
    return (
        <a
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="group relative w-fit"
        >
            <span
                aria-hidden
                className="pointer-events-none absolute -inset-1 z-0 translate-x-6 rounded-2xl bg-rose-500/40 opacity-0 blur-lg transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100"
            />
            <span className={cn(outerDivVariants({ rounded: "2xl" }), "relative z-10")}>
                <span className={cn(innerSpanVariants({ gradient: "glass", animation: "pulse" }))} />
                <span
                    className={cn(
                        bgButtonVariants({ shadow: "soft", rounded: "2xl", gradient: "glass" }),
                        "flex items-center gap-2 px-4 py-3 text-sm"
                    )}
                >
                    <img src={icon} className="size-4 shrink-0" />
                    {children}
                </span>
            </span>
        </a>
    )
}

function About() {
    const [step, setStep] = useState(0)
    const [showCard, setShowCard] = useState(false)

    return (
        <div id="about" className="scroll-mt-28 px-4 sm:px-8 md:px-14">
            <div className="mx-2 flex flex-col items-center gap-8 mt-9 text-center md:mx-6 md:h-20 md:flex-row md:items-center md:gap-0 md:text-left">
                <div className="flex w-full items-center justify-center md:flex-1 md:justify-start">
                    <TypingAnimation
                        words={["Hi My Name Is Edric Emerson And I Am 22 Years Old"]}
                        typeSpeed={20}
                        deleteSpeed={60}
                        pauseDelay={2000}
                        className="font-bold text-xl sm:text-2xl md:text-3xl text-white"
                        onComplete={() => setStep(1)}
                    />
                </div>
                <div className="flex w-full flex-wrap items-center justify-center gap-2 md:flex-1">
                    {step >= 1 && (
                        <TypingAnimation
                            words={["I Lived And Based On"]}
                            typeSpeed={20}
                            deleteSpeed={60}
                            pauseDelay={2000}
                            className="font-bold text-xl sm:text-2xl md:text-3xl text-white"
                        />
                    )}
                    {step >= 1 && (
                        <TypingAnimation
                            words={["Jakarta, Indonesian"]}
                            typeSpeed={20}
                            deleteSpeed={60}
                            pauseDelay={2000}
                            delay={500}
                            className="font-bold text-xl sm:text-2xl md:text-3xl bg-clip-text text-transparent bg-size-[200%_auto]"
                            style={{
                                backgroundImage: "linear-gradient(135deg, #FF0000, #FFFFFF, #FF0000)",
                            }}
                            onComplete={() => setStep(2)}
                        />
                    )}
                </div>
                <div className="flex w-full items-center justify-center md:flex-1 md:justify-end">
                    {step >= 2 && (
                        <TypingAnimation
                            words={["Focused in Doing Frontend and Backend in websites"]}
                            typeSpeed={20}
                            deleteSpeed={60}
                            pauseDelay={2000}
                            className="font-bold text-xl sm:text-2xl md:text-3xl text-white text-center md:text-end"
                            onComplete={() => setShowCard(true)}
                        />
                    )}
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={showCard ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                className={cn(LIQUID_GLASS, "flex flex-col items-center gap-6 mx-2 mt-6 p-5 md:mx-6 md:flex-row md:items-stretch md:gap-8")}
            >
                <div className="flex shrink-0 items-center justify-center">
                    <img
                        src={aboutPhoto}
                        className="w-40 shrink-0 rounded-xl border border-white/25 object-cover shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
                    />
                </div>
                <div className="flex flex-col items-center justify-center gap-2 max-w-xl text-base sm:text-lg leading-relaxed text-center text-white/90">
                    <p>
                        I enjoy turning ideas into clean, functional web applications, from crafting
                        responsive, user-friendly interfaces to building the APIs and databases that
                        power them.
                    </p>
                    <p>
                        Driven by curiosity, I'm always exploring new tools and technologies, taking on
                        projects that challenge me to learn, sharpen my skills, and grow with every build.
                    </p>
                </div>

                <div className="flex flex-1 flex-col items-center justify-center gap-2">
                    <HorizontalLabel text="CONTACT" />

                    <div className="flex items-center gap-4">
                        <VerticalLabel text="CONTACT" />

                        <div className="flex flex-col items-center gap-3">
                            <ContactLink href="https://wa.me/628111859098" icon={phone}>
                                08111859098
                            </ContactLink>
                            <ContactLink href="mailto:edriceson@gmail.com" icon={email} external={false}>
                                edriceson@gmail.com
                            </ContactLink>
                            <ContactLink href="https://www.linkedin.com/in/edric-emerson/" icon={link}>
                                LinkedIn
                            </ContactLink>
                        </div>

                        <VerticalLabel text="CONTACT" />
                    </div>

                    <HorizontalLabel text="CONTACT" />
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={showCard ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.15 }}
                className="flex flex-col items-center gap-4 mx-2 mt-6 p-6 md:mx-6"
            >
                <LogoCarousel columnCount={6} />
            </motion.div>
         </div>
    )
}
export default About
