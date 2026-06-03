import Image from "next/image";
import Link from "next/link";
import { PiArrowRight } from "react-icons/pi";

export default function CTA() {
    return (
        <section className="relative overflow-hidden bg-black px-4 py-24 text-white md:py-32">
            {/* Soft blue glow */}
            <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-full max-w-5xl -translate-x-1/2 rounded-full bg-blue-600/45 blur-3xl" />

            {/* Grid background image */}
            <Image
                src="/images/cta-bg.png"
                alt="Grid background" width={4000} height={4000}
                className="pointer-events-none absolute left-1/2 top-0 z-0 max-w-7xl -translate-x-1/2 select-none object-contain opacity-90"
                style={{
                    filter: "brightness(1.8) contrast(1.2)",
                }}
            />

            {/* Extra blue overlay on top of grid */}
            <div
                className="pointer-events-none absolute left-1/2 top-0 z-0 h-60 w-full max-w-xl -translate-x-1/2"
                style={{
                    background:
                        "radial-gradient(ellipse at center top, rgba(79,70,229,0.55), rgba(79,70,229,0.20) 35%, transparent 70%)",
                }}
            />

            {/* Dark fades */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-24 bg-linear-to-b from-black to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-40 bg-linear-to-t from-black to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 left-0 z-0 w-32 bg-linear-to-r from-black to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-0 w-32 bg-linear-to-l from-black to-transparent" />

            {/* Content */}
            <div className="container relative z-10 mx-auto">
                <div className="mx-auto flex max-w-4xl -translate-y-10 flex-col items-center justify-center text-center">
                    <h2 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
                        Your next role is
                        <br />
                        already looking for you
                    </h2>

                    <p className="mt-6 max-w-2xl text-base leading-7 text-white/55 md:text-lg">
                        Build a profile in three minutes. The matches start arriving
                        tomorrow morning.
                    </p>

                    <div className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
                        <Link
                            href="/sign-up"
                            className="btn h-13 w-full rounded-xl border-0 bg-white px-7 text-base font-semibold text-zinc-950 shadow-xl transition duration-300 hover:-translate-y-1 hover:bg-zinc-100 sm:w-auto"
                        >
                            Create a free account
                        </Link>

                        <Link
                            href="#pricing"
                            className="btn h-13 w-full rounded-xl border border-white/10 bg-white/5 px-7 text-base font-semibold text-white shadow-xl backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-violet-400/40 hover:bg-violet-500/10 sm:w-auto"
                        >
                            View pricing
                            <PiArrowRight className="text-xl" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}