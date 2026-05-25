import Link from "next/link";
import {
    PiArrowRight,
    PiBriefcase,
    PiCompass,
    PiHouse,
    PiMagnifyingGlass,
    PiWarningCircle,
} from "react-icons/pi";

export default function NotFound() {
    return (
        <main className="relative min-h-screen overflow-hidden bg-base-100 text-base-content">
            {/* Background */}
            <div className="absolute inset-0 bg-linear-to-br from-base-100 via-base-200 to-base-100" />
            <div className="absolute left-1/2 top-16 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-500/20 blur-3xl" />
            <div className="absolute bottom-10 left-10 h-72 w-72 rounded-full bg-pink-500/15 blur-3xl" />
            <div className="absolute right-10 top-44 h-80 w-80 rounded-full bg-fuchsia-500/15 blur-3xl" />

            {/* Soft grid */}
            <div className="absolute inset-0 opacity-30">
                <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-size-[64px_64px]" />
            </div>

            {/* Floating blobs */}
            <div className="absolute left-8 top-28 hidden size-4 animate-bounce rounded-full bg-violet-400/60 md:block" />
            <div className="absolute right-20 top-36 hidden size-3 animate-pulse rounded-full bg-pink-400/60 md:block" />
            <div className="absolute bottom-28 left-1/4 hidden size-2 animate-ping rounded-full bg-fuchsia-400/60 md:block" />

            <section className="container relative z-10 mx-auto flex min-h-screen items-center justify-center px-4 py-16">
                <div className="w-full max-w-4xl text-center">
                    {/* Badge */}
                    <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-base-content/10 bg-base-200/60 px-4 py-2 text-sm font-medium text-base-content/70 shadow-xl backdrop-blur-xl">
                        <PiWarningCircle className="text-lg text-primary" />
                        Page not found
                    </div>

                    {/* Big 404 */}
                    <div className="relative mx-auto mb-4 flex justify-center">
                        <h1 className="select-none text-8xl font-black leading-none tracking-tight text-base-content/10 sm:text-9xl md:text-[12rem]">
                            404
                        </h1>

                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="flex size-20 items-center justify-center rounded-3xl border border-primary/20 bg-primary/10 text-primary shadow-2xl shadow-primary/20 backdrop-blur-xl sm:size-24">
                                <PiCompass className="text-5xl sm:text-6xl" />
                            </div>
                        </div>
                    </div>

                    {/* Content card */}
                    <div className="mx-auto max-w-2xl rounded-3xl border border-base-content/10 bg-base-100/70 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                            Oops, this page got lost.
                        </h2>

                        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-base-content/60 sm:text-base">
                            The page you are looking for does not exist, may have been moved,
                            or the link is broken. Let’s get you back to finding great jobs.
                        </p>

                        {/* Buttons */}
                        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                            <Link
                                href="/"
                                className="btn h-12 w-full rounded-2xl border-0 bg-linear-to-r from-violet-600 via-fuchsia-500 to-pink-500 px-7 text-white shadow-lg shadow-primary/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30 sm:w-auto"
                            >
                                <PiHouse className="text-xl" />
                                Back to Home
                            </Link>

                            <Link
                                href="/jobs"
                                className="btn h-12 w-full rounded-2xl border border-base-content/10 bg-base-200/70 px-7 text-base-content shadow-lg transition duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/10 hover:text-primary sm:w-auto"
                            >
                                Browse Jobs
                                <PiArrowRight className="text-xl" />
                            </Link>
                        </div>
                    </div>

                    {/* Helpful links */}
                    <div className="mx-auto mt-6 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
                        <Link
                            href="/jobs"
                            className="group rounded-2xl border border-base-content/10 bg-base-200/50 p-4 text-left shadow-lg backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-primary/10"
                        >
                            <PiMagnifyingGlass className="mb-3 text-2xl text-primary transition group-hover:scale-110" />
                            <h3 className="font-semibold">Find jobs</h3>
                            <p className="mt-1 text-xs text-base-content/55">
                                Search active openings
                            </p>
                        </Link>

                        <Link
                            href="/companies"
                            className="group rounded-2xl border border-base-content/10 bg-base-200/50 p-4 text-left shadow-lg backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-primary/10"
                        >
                            <PiBriefcase className="mb-3 text-2xl text-primary transition group-hover:scale-110" />
                            <h3 className="font-semibold">Companies</h3>
                            <p className="mt-1 text-xs text-base-content/55">
                                Explore hiring teams
                            </p>
                        </Link>

                        <Link
                            href="/contact"
                            className="group rounded-2xl border border-base-content/10 bg-base-200/50 p-4 text-left shadow-lg backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-primary/10"
                        >
                            <PiWarningCircle className="mb-3 text-2xl text-primary transition group-hover:scale-110" />
                            <h3 className="font-semibold">Report issue</h3>
                            <p className="mt-1 text-xs text-base-content/55">
                                Tell us what broke
                            </p>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}