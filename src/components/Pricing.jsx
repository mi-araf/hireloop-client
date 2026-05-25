"use client";

import { useState } from "react";
import {
    PiArrowRight,
    PiChartBar,
    PiCrownSimple,
    PiLightning,
    PiPlus,
} from "react-icons/pi";

const plans = [
    {
        name: "Starter",
        monthlyPrice: 0,
        icon: PiCrownSimple,
        features: [
            "Daily AI match brief (top 5)",
            "Verified salary bands",
            "Company insight dashboards",
            "1-click apply, unlimited",
        ],
    },
    {
        name: "Growth",
        monthlyPrice: 17,
        icon: PiChartBar,
        popular: true,
        features: [
            "Daily AI match brief (top 5)",
            "Verified salary bands",
            "Company insight dashboards",
            "1-click apply, unlimited",
        ],
    },
    {
        name: "Premium",
        monthlyPrice: 99,
        icon: PiLightning,
        features: [
            "Everything in Pro",
            "Multi-profile career portfolios",
            "Shared talent rooms",
            "Recruiter view (read-only)",
        ],
    },
];

export default function Pricing() {
    const [billing, setBilling] = useState("monthly");

    const getPrice = (monthlyPrice) => {
        if (billing === "monthly") {
            return monthlyPrice;
        }

        const yearlyPrice = monthlyPrice * 12;
        const discountedYearlyPrice = yearlyPrice * 0.75;

        return Math.round(discountedYearlyPrice);
    };

    const billingLabel = billing === "monthly" ? "/month" : "/year";

    return (
        <section className="bg-black px-4 py-20 text-white md:py-24">
            <div className="container mx-auto">
                {/* Header */}
                <div className="mx-auto max-w-xl text-center">
                    <div className="mb-4 flex items-center justify-center gap-3">
                        <span className="size-2 bg-violet-500" />
                        <p className="text-sm font-semibold uppercase tracking-widest text-white/45">
                            Pricing
                        </p>
                        <span className="size-2 bg-violet-500" />
                    </div>

                    <h2 className="text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
                        Pay for the leverage,
                        <br />
                        not the listings
                    </h2>

                    {/* Toggle */}
                    <div className="mt-12 inline-flex items-center rounded-full border border-white/10 bg-white/10 p-1 shadow-xl backdrop-blur-xl cursor-pointer">
                        <button
                            type="button"
                            onClick={() => setBilling("monthly")}
                            className={`rounded-full px-5 py-2 text-sm font-semibold transition duration-300 ${billing === "monthly"
                                    ? "bg-white text-black shadow-lg"
                                    : "text-white/60 hover:text-white"
                                }`}
                        >
                            Monthly
                        </button>

                        <button
                            type="button"
                            onClick={() => setBilling("yearly")}
                            className={`flex items-center gap-2 rounded-full py-2 pl-5 pr-2 text-sm font-semibold transition duration-300 ${billing === "yearly"
                                    ? "bg-white text-black shadow-lg"
                                    : "text-white/60 hover:text-white"
                                }`}
                        >
                            Yearly

                            <span
                                className={`rounded-full px-2.5 py-1 text-xs font-bold ${billing === "yearly"
                                        ? "bg-fuchsia-500 text-white"
                                        : "bg-fuchsia-500/90 text-white"
                                    }`}
                            >
                                25%
                            </span>
                        </button>
                    </div>
                </div>

                {/* Cards */}
                <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {plans.map((plan) => {
                        const Icon = plan.icon;
                        const price = getPrice(plan.monthlyPrice);

                        return (
                            <div
                                key={plan.name}
                                className={`group relative overflow-hidden rounded-3xl border p-5 shadow-2xl transition duration-300 hover:-translate-y-2 ${plan.popular
                                        ? "border-white/15 bg-white/10 shadow-white/10"
                                        : "border-white/10 bg-black hover:border-white/20"
                                    }`}
                            >
                                <div
                                    className={`absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 ${plan.popular
                                            ? "bg-linear-to-br from-white/10 via-white/5 to-transparent"
                                            : "bg-linear-to-br from-violet-500/10 via-pink-500/5 to-transparent"
                                        }`}
                                />

                                <div className="relative z-10 flex min-h-82 flex-col">
                                    {/* Top */}
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="flex size-10 items-center justify-center rounded-lg border border-white/10 bg-black/40 text-pink-200">
                                                <Icon className="text-2xl" />
                                            </div>

                                            <h3 className="text-2xl font-medium text-white/85">
                                                {plan.name}
                                            </h3>
                                        </div>

                                        <div className="text-right">
                                            <div className="flex items-end gap-1">
                                                <span className="text-4xl font-semibold tracking-tight">
                                                    ${price}
                                                </span>
                                                <span className="pb-1 text-xs text-white/60">
                                                    {billingLabel}
                                                </span>
                                            </div>

                                            {billing === "yearly" && plan.monthlyPrice > 0 && (
                                                <p className="mt-1 text-xs text-white/35">
                                                    billed yearly
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Features */}
                                    <div className="mt-9">
                                        <p className="mb-4 text-base font-semibold text-white/90">
                                            Start building your insights hub:
                                        </p>

                                        <ul className="space-y-4">
                                            {plan.features.map((feature) => (
                                                <li
                                                    key={feature}
                                                    className="flex items-center gap-3 text-sm text-white/45"
                                                >
                                                    <span className="flex size-5 items-center justify-center rounded-md bg-white/10 text-white">
                                                        <PiPlus className="text-sm" />
                                                    </span>

                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Button */}
                                    <button
                                        type="button"
                                        className={`btn mt-auto h-12 w-full rounded-xl border-0 px-5 text-sm font-semibold transition duration-300 ${plan.popular
                                                ? "bg-white text-black hover:bg-white/90"
                                                : "bg-white/15 text-white hover:bg-white hover:text-black"
                                            }`}
                                    >
                                        Choose This Plan
                                        <PiArrowRight className="ml-auto text-lg transition duration-300 group-hover:translate-x-1" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}