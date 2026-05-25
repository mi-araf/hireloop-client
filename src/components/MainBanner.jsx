"use client";

import {
    PiBriefcaseFill,
    PiMagnifyingGlass,
    PiMapPin,
} from "react-icons/pi";

const trendingPositions = [
    "Product Designer",
    "AI Engineering",
    "Dev-ops Engineer",
];

export default function MainBanner() {
    return (
        <section className="relative overflow-hidden bg-black text-white">
            {/* Background */}
            <div className="absolute inset-0 bg-linear-to-b from-zinc-900 via-black to-black" />

            {/* Soft center glow */}
            <div className="absolute top-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />

            {/* Small stars */}
            <div className="absolute left-20 top-64 size-1 rounded-full bg-violet-400/70" />
            <div className="absolute left-1/3 top-72 size-1 rounded-full bg-violet-300/60" />
            <div className="absolute right-1/4 top-60 size-1 rounded-full bg-violet-400/60" />
            <div className="absolute right-24 top-80 size-1 rounded-full bg-violet-300/70" />

            <div className="container relative z-10 mx-auto px-4">
                <div className="flex min-h-96 flex-col items-center justify-center py-20 text-center">
                    {/* Badge */}
                    <div className="flex items-center gap-4">
                        <div className="hidden h-px w-24 bg-linear-to-r from-transparent to-white/15 sm:block" />

                        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-widest text-white/50 shadow-xl backdrop-blur-md">
                            <span className="flex size-5 items-center justify-center rounded-full bg-orange-500/15 text-orange-400">
                                <PiBriefcaseFill />
                            </span>
                            <span className="text-white">50,000+</span>
                            <span>New Jobs This Month</span>
                        </div>

                        <div className="hidden h-px w-24 bg-linear-to-l from-transparent to-white/15 sm:block" />
                    </div>

                    {/* Title */}
                    <h1 className="mt-7 text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
                        Find Your Dream Job Today
                    </h1>

                    {/* Subtitle */}
                    <p className="mt-4 max-w-xl text-sm leading-6 text-white/45">
                        HireLoop connects top talent with world-class companies. Browse
                        thousands of curated opportunities and land your next role — faster.
                    </p>

                    {/* Search bar */}
                    <form className="mt-8 w-full max-w-2xl">
                        <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-2 shadow-2xl backdrop-blur-md sm:flex-row sm:items-center">
                            <div className="flex flex-1 items-center gap-2 px-3">
                                <PiMagnifyingGlass className="text-lg text-white/70" />
                                <input
                                    type="text"
                                    placeholder="Job title, skill or company"
                                    className="input input-sm w-full border-0 bg-transparent px-0 text-white outline-none placeholder:text-white/40 focus:outline-none"
                                />
                            </div>

                            <div className="hidden h-6 w-px bg-white/10 sm:block" />

                            <div className="flex flex-1 items-center gap-2 px-3">
                                <PiMapPin className="text-lg text-white/70" />
                                <input
                                    type="text"
                                    placeholder="Location or Remote"
                                    className="input input-sm w-full border-0 bg-transparent px-0 text-white outline-none placeholder:text-white/40 focus:outline-none"
                                />
                            </div>

                            <button
                                type="submit"
                                aria-label="Search jobs"
                                className="btn btn-square h-10 min-h-10 w-full rounded-xl border-0 bg-violet-600 text-white hover:bg-violet-500 sm:w-10"
                            >
                                <PiMagnifyingGlass className="text-xl" />
                            </button>
                        </div>
                    </form>

                    {/* Trending */}
                    <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-white/45">
                        <span>Trending Position</span>

                        {trendingPositions.map((item) => (
                            <button
                                key={item}
                                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/70 transition hover:border-violet-500/50 hover:text-white"
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}