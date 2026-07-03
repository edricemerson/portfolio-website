import { motion } from "motion/react"
import { HoverExpand_001 } from "@/components/ui/skiper-ui/skiper52"
import kanaan from "../photo/kanaan.jpg"
import binus from "../photo/binus.jpg"
import hacktiv8 from "../photo/hacktiv8.jpeg"
import future from "../photo/future.jpg"

const educationImages = [
    {
        src: kanaan,
        alt: "Kanaan Global School International",
        title: "Kanaan Global School International",
        period: "2016 - 2022",
        detail: "High School",
    },
    {
        src: binus,
        alt: "Binus Alam Sutera",
        title: "Binus Alam Sutera",
        period: "2023 – 2027 (Expected)",
        detail: "Computer Science · GPA 3.19",
    },
    {
        src: hacktiv8,
        alt: "Hacktiv8",
        title: "Hacktiv8",
        period: "2025 Dec - 2026 April",
        detail: "Golang Backend Bootcamp · Score 83 (Graduate)",
    },
    {
        src: future,
        alt: "Future",
        title: "We don't know what Future holds",
        period: "???",
        detail: "?????",
    }
]

function Education() {
    return (
        <div id="education" className="px-16 mt-20">
            <motion.div
                className="flex w-full flex-row items-center justify-center"
                initial={{ opacity: 0, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="flex flex-col items-center text-center">
                    <div className="text-white font-bold text-2xl">
                        LEARNING IS ALWAYS
                    </div>
                    <div className="text-emerald-400 font-bold text-6xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                        EDUCATION
                    </div>
                </div>
            </motion.div>

            <div>
                <div className="mt-10 flex justify-center">
                    <HoverExpand_001 images={educationImages} />
                </div>
                <div className="mt-10 w-4xl mx-auto">
                    <div className="flex justify-between text-sm font-bold uppercase tracking-widest text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                        <div>
                            Past
                        </div>
                        <div>
                            Present
                        </div>
                    </div>
                    <div className="mt-2 h-1 w-full rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.6)]" />
                </div>
            </div>
        </div>
    )
}
export default Education
