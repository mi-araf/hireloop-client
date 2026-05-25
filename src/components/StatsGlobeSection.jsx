"use client";

import Image from "next/image";
import {
    PiBriefcaseLight,
    PiChartBarLight,
    PiUserCircleLight,
    PiStarLight,
} from "react-icons/pi";

const stats = [
    {
        value: "50K",
        label: "Active Jobs",
        icon: PiBriefcaseLight,
    },
    {
        value: "12K",
        label: "Companies",
        icon: PiChartBarLight,
    },
    {
        value: "2M",
        label: "Job Seekers",
        icon: PiUserCircleLight,
    },
    {
        value: "97%",
        label: "Satisfaction Rate",
        icon: PiStarLight,
    },
];

export default function StatsGlobeSection() {
    return (
        <section className="relative overflow-hidden bg-black text-white ">
            <div className="w-10/12 mx-auto md:w-11/12">
                {/* Globe image */}
                <Image
                    src="/images/globe.png"
                    alt=""
                    width={4000}
                    height={4000}
                    className="pointer-events-none absolute left-1/2 top-0 z-0 w-260 max-w-none select-none sm:w-300 lg:w-340"
                    style={{
                        transform: "translate(-50%, -39%)",
                    }}
                />

                {/* Small stars fallback */}
                <div
                    className="pointer-events-none absolute inset-0 z-0 opacity-60"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle, rgba(120,120,255,0.8) 1px, transparent 1px)",
                        backgroundSize: "90px 70px",
                    }}
                />

                {/* Dark fade */}
                <div className="absolute inset-0 z-0 bg-linear-to-b from-black/10 via-black/10 to-black" />

                <div className="container relative z-10 mx-auto px-5">
                    <div className="flex min-h-145 flex-col justify-end pb-16 pt-44 md:pb-20">
                        {/* Text */}
                        <h2 className="mx-auto max-w-3xl text-center text-2xl font-medium leading-tight text-white/75 md:text-3xl">
                            Assisting over{" "}
                            <span className="text-white">15,000 job seekers</span>
                            <br />
                            find their dream positions.
                        </h2>

                        {/* Cards */}
                        <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {stats.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <div
                                        key={item.label}
                                        className="card relative overflow-hidden border border-pink-200/15 bg-white/5 shadow-2xl shadow-pink-500/10 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-pink-300/35 hover:shadow-pink-500/25"
                                    >
                                        <div className="absolute inset-0 bg-linear-to-br from-pink-500/12 via-white/5 to-violet-500/10" />
                                        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-pink-200/40 to-transparent" />

                                        <div className="card-body relative z-10 h-42 justify-between p-5 md:h-44">
                                            <Icon className="text-2xl text-pink-100" />

                                            <div>
                                                <h3 className="text-5xl font-semibold leading-none text-white md:text-6xl">
                                                    {item.value}
                                                </h3>

                                                <p className="mt-4 text-sm text-pink-50/80">
                                                    {item.label}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}