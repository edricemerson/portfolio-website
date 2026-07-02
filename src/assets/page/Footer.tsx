import WA from "../photo/whatsapp.svg"

const footerAnchor = "inline-flex text-sm text-slate-400 font-normal"

function Footer() {
    return (
        <div className="flex flex-col lg:flex-row items-start lg:items-center px-4 sm:px-6 lg:px-10 py-6 mt-12 bg-slate-950 gap-8 border-t border-slate-800">
            <div className="flex-1 text-slate-500 text-lg sm:text-xl font-semibold">
                © 2026{" "}
                <a href="https://github.com/edricemerson" target="_blank" rel="noreferrer"
                    className="text-blue-700 transition duration-300 ease-in-out
                hover:text-blue-500">
                    Edric Emerson.
                </a>
                <br /> All Rights Reserved. <br />

                <a href="https://github.com/edricemerson" target="_blank" rel="noreferrer"
                    className="text-base text-blue-700/70 mt-1 transition duration-300 ease-in-out hover:text-blue-500">
                    github.com/edricemerson
                </a>
            </div>

            <div className="hidden lg:block bg-slate-700 w-px self-stretch" />
            <div className="lg:hidden bg-slate-800 h-px w-full" />

            <div className="w-full lg:flex-2 flex gap-8">
                <div className="flex-1">
                    <div className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-1">LINKS</div>
                    <div className="flex flex-col mt-2 gap-2 items-start">
                        <a href="#home" className={footerAnchor + " hover:text-blue-400 hover:translate-x-0.5 transition-all duration-200"}>A</a>
                        <a href="#about" className={footerAnchor + " hover:text-blue-400 hover:translate-x-0.5 transition-all duration-200"}>B</a>
                        <a href="#reviews" className={footerAnchor + " hover:text-blue-400 hover:translate-x-0.5 transition-all duration-200"}>C</a>
                    </div>
                </div>

                <div className="flex-1">
                    <div>
                        <div className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-1 mt-4">SOCIAL MEDIA</div>
                        <div className="flex flex-row mt-2 gap-2">
                            <a href="https://www.tiktok.com/@maju_sukses_teknik?_r=1&_t=ZS-97WpVIwLWEi" target="_blank" rel="noreferrer">
                                <img className="w-9 h-9 p-1 mr-3 rounded-xl border-2 transition
                                duration-300 ease-in-out bg-black border-gray-700 hover:bg-gray-900"
                                />
                            </a>
                        </div>
                    </div>

                </div>
            </div>

            <div className="hidden lg:block bg-slate-700 w-px self-stretch" />
            <div className="lg:hidden bg-slate-800 h-px w-full" />

            <div className="w-full lg:flex-2 flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                    <div className="flex-1">
                        <div className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-1">CONTACT</div>
                        <div>
                            <a href="https://wa.me/628113389098" target="_blank" rel="noreferrer"
                                className={footerAnchor + " items-center gap-1 transition duration-300 ease-in-out hover:text-blue-500"}>
                                <img src={WA} className="w-4 h-4" />
                                +62 8111 859098
                            </a>
                        </div>
                        <p className={footerAnchor}>
                            edriceson@gmail.com
                        </p>
                    </div>
                    <div className="flex-1">
                        <div className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-1">Location</div>
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