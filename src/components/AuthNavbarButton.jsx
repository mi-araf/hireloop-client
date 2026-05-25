"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function AuthNavbarButton() {
    const { data: session, isPending } = authClient.useSession();

    if (isPending) {
        return (
            <div className="h-10 w-24 animate-pulse rounded-xl bg-white/10" />
        );
    }

    if (session?.user) {
        return (
            <Link
                href="/profile"
                className="rounded-xl px-4 py-2 text-sm font-semibold text-violet-400 transition hover:bg-violet-500/10 hover:text-violet-300"
            >
                My Profile
            </Link>
        );
    }

    return (
        <Link
            href="/signin"
            className="rounded-xl px-4 py-2 text-sm font-semibold text-violet-400 transition hover:bg-violet-500/10 hover:text-violet-300"
        >
            Sign In
        </Link>
    );
}