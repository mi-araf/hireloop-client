"use client";

import Link from "next/link";
import { Button, Drawer } from "@heroui/react";
import { Bars, Xmark } from "@gravity-ui/icons";
import { FiArrowRight } from "react-icons/fi";
import Image from "next/image";
import AuthNavbarButton from "./AuthNavbarButton";
import { useSession, signOut } from "@/lib/auth-client";
import { useState } from "react";

const navLinks = [
    {
        label: "Browse Jobs",
        href: "/jobs",
    },
    {
        label: "Company",
        href: "/company",
    },
    {
        label: "Pricing",
        href: "/pricing",
    },
];

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { data: session } = useSession();

    const user = session?.user;

    const handleSignOut = async () => {
        await signOut();

    }

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#171717]/95 backdrop-blur-xl">
            <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3">
                    <Image src="/images/logo.png" width={130} height={50} alt="Logo" />
                </Link>

                {/* Desktop Navbar */}
                <div className="hidden items-center rounded-2xl bg-white/4 px-4 py-2 shadow-2xl shadow-black/20 md:flex">
                    <div className="flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="rounded-xl px-4 py-2 text-sm font-medium text-white/70 transition hover:bg-white/6 hover:text-white"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="mx-4 h-7 w-px bg-white/10" />

                    {/* Auth Links */}
                    <div className="flex items-center gap-4">
                        {
                            user ?
                            <>
                                    Hi, {user.name}!
                                    <Button onClick={handleSignOut}
                                        variant="ghost">Sign Out</Button>
                                </>
                                :
                                <Link
                                href="/auth/signin"
                                className="text-sm font-medium text-violet-400 transition hover:text-violet-300"
                                >
                                    Sign In
                                </Link>
                        }
                    </div>
                        
                    <AuthNavbarButton />

                    <Link
                        href="/get-started"
                        className="ml-4 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-zinc-950 shadow-lg transition hover:bg-zinc-100"
                    >
                        Get Started
                    </Link>
                </div>

                {/* Mobile Navbar */}
                <div className="md:hidden">
                    <Drawer>
                        <Button
                            isIconOnly
                            aria-label="Open navigation menu"
                            className="rounded-xl border border-white/10 bg-white/6 text-white hover:bg-white/1"
                        >
                            <Bars className="size-5" />
                        </Button>

                        <Drawer.Backdrop
                            variant="blur"
                            className="bg-black/70"
                        >
                            <Drawer.Content placement="right">
                                <Drawer.Dialog className="h-full w-[86%] max-w-sm rounded-l-3xl border-l border-white/10 bg-[#171717] text-white shadow-2xl">
                                    <Drawer.CloseTrigger className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/15">
                                        <Xmark className="size-4" />
                                    </Drawer.CloseTrigger>

                                    <Drawer.Header className="border-b border-white/10 p-6">
                                        <Drawer.Heading className="flex items-center gap-3">
                                            <Link href="/" className="flex items-center gap-3">
                                                <Image src="/images/logo.png" width={130} height={50} alt="Logo" />
                                            </Link>
                                        </Drawer.Heading>
                                    </Drawer.Header>

                                    <Drawer.Body className="flex h-full flex-col p-6">
                                        <div className="flex flex-col gap-2">
                                            {navLinks.map((link) => (
                                                <Link
                                                    key={link.href}
                                                    href={link.href}
                                                    className="rounded-2xl px-4 py-3 text-base font-medium text-white/75 transition hover:bg-white/6 hover:text-white"
                                                >
                                                    {link.label}
                                                </Link>
                                            ))}
                                        </div>

                                        <div className="my-6 h-px w-full bg-white/10" />

                                        <div className="mt-auto flex flex-col gap-3">
                                            <AuthNavbarButton />

                                            <Link
                                                href="/get-started"
                                                className="flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-base font-semibold text-zinc-950 transition hover:bg-zinc-100"
                                            >
                                                Get Started
                                                <FiArrowRight />
                                            </Link>
                                        </div>
                                    </Drawer.Body>
                                </Drawer.Dialog>
                            </Drawer.Content>
                        </Drawer.Backdrop>
                    </Drawer>
                </div>
            </nav>
        </header>
    );
}