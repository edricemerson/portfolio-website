import { motion } from "motion/react"

function Experience() {
    return (
        <div className="px-16 mt-20">
            <motion.div
                className="flex flex-row items-center justify-between"
                initial={{ opacity: 0, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="flex flex-col">
                    <div className="text-white font-bold text-2xl">
                        2004 - Present
                    </div>
                    <div className="text-violet-400 font-bold text-6xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                        EXPERIENCE
                    </div>
                </div>
                <div className="mx-8 h-1 flex-1 bg-white/30" />
                <div className="flex flex-col items-end">
                    <div className="text-violet-400 font-bold text-2xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                        ONLY PRACTICAL WORK AND EXPERIENCE LEAD THE YOUNG TO MATURITY
                    </div>
                    <div className="text-white font-bold text-2xl">
                        THE ONLY SOURCE OF KNOWLEDGE IS EXPERIENCE
                    </div>
                </div>
            </motion.div>


        </div>
    )
}

export default Experience