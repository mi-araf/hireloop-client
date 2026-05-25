import Image from "next/image";
import Link from "next/link";
import {
    FaFacebookF,
    FaPinterestP,
    FaLinkedinIn,
    FaPlay,
} from "react-icons/fa6";

const productLinks = [
    { label: "Job discovery", href: "/jobs" },
    { label: "Worker AI", href: "/worker-ai" },
    { label: "Companies", href: "/companies" },
    { label: "Salary data", href: "/salary-data" },
];

const navigationLinks = [
    { label: "Help center", href: "/help-center" },
    { label: "Career library", href: "/career-library" },
    { label: "Contact", href: "/contact" },
];

const resourceLinks = [
    { label: "Brand Guideline", href: "/brand-guideline" },
    { label: "Newsroom", href: "/newsroom" },
];

const socialLinks = [
    {
        label: "Facebook",
        href: "https://facebook.com",
        icon: FaFacebookF,
    },
    {
        label: "Pinterest",
        href: "https://pinterest.com",
        icon: FaPinterestP,
        active: true,
    },
    {
        label: "LinkedIn",
        href: "https://linkedin.com",
        icon: FaLinkedinIn,
    },
];

export default function Footer() {
    return (
        <footer className="relative overflow-hidden bg-black text-white">
            {/* Decorative top grid/ring effect */}
            <div className="pointer-events-none absolute inset-0 opacity-40">
                <div className="absolute left-1/2 -top-85 h-130 w-225 -translate-x-1/2 rounded-full border border-white/10" />
                <div className="absolute left-1/2 -top-70 h-105 w-180 -translate-x-1/2 rounded-full border border-white/10" />
                <div className="absolute left-1/2 -top-55 h-80 w-140 -translate-x-1/2 rounded-full border border-white/10" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[90px_90px]" />
                <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black to-black" />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
                    {/* Brand */}
                    <div>
                        <Link href="/" className="inline-flex items-center gap-3">
                            <Image src="/images/logo.png" width={130} height={50} alt="Logo" />
                        </Link>

                        <p className="mt-7 max-w-xs text-sm leading-7 text-white/45">
                            The AI-native career platform. Built for people who take their
                            work seriously.
                        </p>
                    </div>

                    {/* Product */}
                    <FooterColumn title="Product" links={productLinks} />

                    {/* Navigations */}
                    <FooterColumn title="Navigations" links={navigationLinks} />

                    {/* Resources */}
                    <FooterColumn title="Resources" links={resourceLinks} />
                </div>

                {/* Bottom */}
                <div className="mt-14 flex flex-col gap-8 border-white/10 pt-6 md:mt-20 md:flex-row md:items-center md:justify-between">
                    {/* Socials */}
                    <div className="flex items-center gap-2">
                        {socialLinks.map((item) => {
                            const Icon = item.icon;

                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    aria-label={item.label}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={`flex size-9 items-center justify-center rounded-lg text-sm transition ${item.active
                                            ? "bg-violet-600 text-white hover:bg-violet-500"
                                            : "bg-white/6 text-white hover:bg-white/12"
                                        }`}
                                >
                                    <Icon />
                                </Link>
                            );
                        })}
                    </div>

                    {/* Copyright / Legal */}
                    <div className="flex flex-col gap-3 text-sm text-white/45 sm:flex-row sm:items-center">
                        <p>Copyright 2026 — HireLoop</p>

                        <div className="hidden h-4 w-px bg-white/15 sm:block" />

                        <div className="flex items-center gap-1">
                            <Link
                                href="/terms"
                                className="transition hover:text-violet-400"
                            >
                                Terms &amp; Policy
                            </Link>
                            <span>-</span>
                            <Link
                                href="/privacy"
                                className="transition hover:text-violet-400"
                            >
                                Privacy Guideline
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function FooterColumn({ title, links }) {
    return (
        <div>
            <h3 className="text-sm font-semibold text-violet-500">{title}</h3>

            <ul className="mt-6 space-y-4">
                {links.map((link) => (
                    <li key={link.href}>
                        <Link
                            href={link.href}
                            className="text-sm text-white/45 transition hover:text-white"
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}