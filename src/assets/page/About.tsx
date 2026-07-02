import { useState } from "react"
import { TypingAnimation } from "@/components/ui/typing-animation"

function About() {
    const [step, setStep] = useState(0)

    return (
        <div className="px-14 mx-6 flex items-center mt-9">
            <div className="flex flex-1 items-center">
                <TypingAnimation
                    words={["Hi My Name Is Edric Emerson And I Am 22 Years Old"]}
                    typeSpeed={50}
                    deleteSpeed={150}
                    pauseDelay={2000}
                    className="flex font-bold text-3xl text-white"
                    onComplete={() => setStep(1)}
                />
            </div>
            <div className="flex flex-1 flex-wrap items-center justify-center gap-2">
                {step >= 1 && (
                    <TypingAnimation
                        words={["I Lived And Based On"]}
                        typeSpeed={50}
                        deleteSpeed={150}
                        pauseDelay={2000}
                        className="font-bold text-3xl text-white"
                    />
                )}
                {step >= 1 && (
                    <TypingAnimation
                        words={["Jakarta, Indonesian"]}
                        typeSpeed={50}
                        deleteSpeed={150}
                        pauseDelay={2000}
                        delay={1300}
                        className="font-bold text-3xl bg-clip-text text-transparent bg-size-[200%_auto]"
                        style={{
                            backgroundImage: "linear-gradient(135deg, #FF0000, #FFFFFF, #FF0000)",
                        }}
                        onComplete={() => setStep(2)}
                    />
                )}
            </div>
            <div className="flex flex-1 items-center">
                {step >= 2 && (
                    <TypingAnimation
                        words={["Focused in Doing Frontend and Backend in websites"]}
                        typeSpeed={50}
                        deleteSpeed={150}
                        pauseDelay={2000}
                        className="flex font-bold text-3xl text-white text-end"
                    />
                )}
            </div>
        </div>
    )
}
export default About
