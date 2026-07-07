import { LIQUID_GLASS } from "@/lib/styles"
import { cn } from "@/lib/utils"
import WA from "../photo/whatsapp.svg"
import CV from "../document/CV Edric.pdf"

const footerAnchor = "inline-flex text-sm text-white/70 font-normal"
const footerLabel = "text-xs font-bold tracking-widest uppercase text-white/50 mb-1"

function Footer() {
    const handleDownloadClick = () => {
        const link = document.createElement("a")
        link.href = CV
        link.download = "EdricEmerson_CV.pdf"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <div className={cn(LIQUID_GLASS,"flex flex-col lg:flex-row items-start lg:items-center px-4 sm:px-6 lg:px-10 py-6 mt-12 gap-8 rounded-none")}>
            <div className="flex-1 text-white/90 text-lg sm:text-xl font-semibold">
                © 2026{" "}
                <a href="https://github.com/edricemerson" target="_blank" rel="noreferrer"
                    className="text-sky-400 transition duration-300 ease-in-out
                hover:text-sky-300">
                    Edric Emerson.
                </a>
                <br /> All Rights Reserved. <br />

                <a href="https://github.com/edricemerson" target="_blank" rel="noreferrer"
                    className="text-base text-sky-400/70 mt-1 transition duration-300 ease-in-out hover:text-sky-300">
                    github.com/edricemerson
                </a>
            </div>

            <div className="hidden lg:block bg-white/15 w-px self-stretch" />
            <div className="lg:hidden bg-white/15 h-px w-full" />

            <div className="w-full lg:flex-2 flex gap-8">
                <div className="flex-1">
                    <div className={footerLabel}>LINKS</div>
                    <div className="flex flex-col mt-2 gap-2 items-start">
                        <a href="#about" className={footerAnchor + " hover:text-sky-300 hover:translate-x-0.5 transition-all duration-200"}>About</a>
                        <a href="#experience" className={footerAnchor + " hover:text-sky-300 hover:translate-x-0.5 transition-all duration-200"}>Experience</a>
                        <a href="#education" className={footerAnchor + " hover:text-sky-300 hover:translate-x-0.5 transition-all duration-200"}>Education</a>
                        <a href="#project" className={footerAnchor + " hover:text-sky-300 hover:translate-x-0.5 transition-all duration-200"}>Project</a>
                    </div>
                </div>

                <div className="flex-1">
                    <div>
                        <div className={footerLabel + " mt-4"}>SOCIAL MEDIA</div>
                        <div className="flex flex-row mt-2 gap-2">
                            <a href="https://www.tiktok.com/@maju_sukses_teknik?_r=1&_t=ZS-97WpVIwLWEi" target="_blank" rel="noreferrer">
                                <img className="w-9 h-9 p-1 mr-3 rounded-xl border-2 transition
                                duration-300 ease-in-out bg-black border-white/20 hover:bg-neutral-900"
                                />
                            </a>
                        </div>
                        <div className={footerLabel + " mt-4"}>Documents</div>
                        <button type="button" onClick={handleDownloadClick} className={footerAnchor + " cursor-pointer hover:text-sky-300 hover:translate-x-0.5 transition-all duration-200"}>
                            My CV
                        </button>
                    </div>

                </div>
            </div>

            <div className="hidden lg:block bg-white/15 w-px self-stretch" />
            <div className="lg:hidden bg-white/15 h-px w-full" />

            <div className="w-full lg:flex-2 flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                    <div className="flex-1">
                        <div className={footerLabel}>CONTACT</div>
                        <div>
                            <a href="https://wa.me/628113389098" target="_blank" rel="noreferrer"
                                className={footerAnchor + " items-center gap-1 transition duration-300 ease-in-out hover:text-sky-300"}>
                                <img src={WA} className="w-4 h-4" />
                                +62 8111 859098
                            </a>
                        </div>
                        <p className={footerAnchor}>
                            edriceson@gmail.com
                        </p>
                    </div>
                    <div className="flex-1">
                        <div className={footerLabel}>Location</div>
                        <p className={footerAnchor}>
                            Indonesia, Jakarta
                        </p>
                    </div>
                </div>
                <div className="relative w-full max-w-sm mx-auto">
                    <img className="w-full rounded-xl opacity-85" />
                </div>
            </div>
        </div>
    )
}
export default Footer