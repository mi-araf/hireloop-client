"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import {
    PiArrowRight,
    PiBriefcase,
    PiEye,
    PiEyeSlash,
    PiEnvelopeSimple,
    PiLock,
    PiSparkle,
    PiUser,
} from "react-icons/pi";
import { authClient, signUp } from "@/lib/auth-client";

export default function SignupPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const getCallbackURL = () => {
        if (typeof window === "undefined") return "/";

        const params = new URLSearchParams(window.location.search);
        return params.get("callbackURL") || "/";
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSignup = async (event) => {
        event.preventDefault();

        const name = formData.name.trim();
        const email = formData.email.trim();
        const password = formData.password;

        if (!name) {
            toast.error("Please enter your name.");
            return;
        }

        if (!email) {
            toast.error("Please enter your email.");
            return;
        }

        if (password.length < 8) {
            toast.error("Password must be at least 8 characters.");
            return;
        }

        setIsLoading(true);

        try {
            const callbackURL = getCallbackURL();

            const { error } = await signUp.email({
                name,
                email,
                password,
                callbackURL,
            });

            if (error) {
                toast.error(error.message || "Signup failed. Please try again.");
                return;
            }

            toast.success("Account created successfully.");

            router.push(callbackURL);
            router.refresh();
        } catch (error) {
            toast.error(error?.message || "Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    };

    const callbackURL =
        typeof window !== "undefined" ? getCallbackURL() : "/";

    return (
        <main className="relative min-h-screen overflow-hidden bg-base-100 text-base-content">
            {/* Background */}
            <div className="absolute inset-0 bg-linear-to-br from-base-100 via-base-200 to-base-100" />
            <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/25 blur-3xl" />
            <div className="absolute bottom-10 left-10 h-72 w-72 rounded-full bg-pink-500/20 blur-3xl" />
            <div className="absolute right-10 top-40 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />

            <section className="container relative z-10 mx-auto flex min-h-screen items-center justify-center px-4 py-10">
                <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-base-content/10 bg-base-100/60 shadow-2xl backdrop-blur-xl lg:grid-cols-2">
                    {/* Left visual panel */}
                    <div className="relative hidden overflow-hidden bg-linear-to-br from-violet-600 via-fuchsia-600 to-pink-500 p-10 text-white lg:block">
                        <div className="absolute inset-0 bg-black/10" />
                        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
                        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-black/20 blur-3xl" />

                        <div className="relative z-10 flex h-full flex-col justify-between">
                            <Link href="/" className="flex items-center gap-3">
                                <div className="flex size-11 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md">
                                    <PiBriefcase className="text-2xl" />
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold leading-none">HireLoop</h2>
                                    <p className="mt-1 text-sm text-white/70">Job Platform</p>
                                </div>
                            </Link>

                            <div>
                                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-md">
                                    <PiSparkle className="text-lg animate-pulse" />
                                    Smart hiring starts here
                                </div>

                                <h1 className="text-5xl font-semibold leading-tight tracking-tight">
                                    Create your profile and find better jobs.
                                </h1>

                                <p className="mt-5 max-w-md text-base leading-7 text-white/75">
                                    Apply faster, save your favorite jobs, and connect with
                                    recruiters from one smooth dashboard.
                                </p>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-md">
                                    <p className="text-2xl font-bold">50K+</p>
                                    <p className="mt-1 text-xs text-white/70">Jobs</p>
                                </div>

                                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-md">
                                    <p className="text-2xl font-bold">12K+</p>
                                    <p className="mt-1 text-xs text-white/70">Companies</p>
                                </div>

                                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-md">
                                    <p className="text-2xl font-bold">2M+</p>
                                    <p className="mt-1 text-xs text-white/70">Seekers</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form panel */}
                    <div className="p-6 sm:p-8 lg:p-10">
                        <div className="mx-auto max-w-md">
                            <div className="mb-8 text-center lg:text-left">
                                <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary lg:mx-0">
                                    <PiUser className="text-3xl" />
                                </div>

                                <h1 className="text-3xl font-bold tracking-tight">
                                    Create Account
                                </h1>

                                <p className="mt-2 text-sm text-base-content/60">
                                    Start applying for jobs in minutes.
                                </p>
                            </div>

                            <form onSubmit={handleSignup} className="space-y-4">
                                {/* Name */}
                                <label className="group block">
                                    <span className="mb-2 block text-sm font-medium text-base-content/70">
                                        Name
                                    </span>

                                    <div className="flex items-center gap-3 rounded-2xl border border-base-content/10 bg-base-200/70 px-4 transition duration-300 group-focus-within:border-primary/60 group-focus-within:bg-base-100 group-focus-within:shadow-lg group-focus-within:shadow-primary/10">
                                        <PiUser className="text-xl text-base-content/40 transition group-focus-within:text-primary" />

                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Your full name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            autoComplete="name"
                                            className="h-13 w-full bg-transparent text-sm outline-none placeholder:text-base-content/35"
                                        />
                                    </div>
                                </label>

                                {/* Email */}
                                <label className="group block">
                                    <span className="mb-2 block text-sm font-medium text-base-content/70">
                                        Email
                                    </span>

                                    <div className="flex items-center gap-3 rounded-2xl border border-base-content/10 bg-base-200/70 px-4 transition duration-300 group-focus-within:border-primary/60 group-focus-within:bg-base-100 group-focus-within:shadow-lg group-focus-within:shadow-primary/10">
                                        <PiEnvelopeSimple className="text-xl text-base-content/40 transition group-focus-within:text-primary" />

                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="you@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            autoComplete="email"
                                            className="h-13 w-full bg-transparent text-sm outline-none placeholder:text-base-content/35"
                                        />
                                    </div>
                                </label>

                                {/* Password */}
                                <label className="group block">
                                    <span className="mb-2 block text-sm font-medium text-base-content/70">
                                        Password
                                    </span>

                                    <div className="flex items-center gap-3 rounded-2xl border border-base-content/10 bg-base-200/70 px-4 transition duration-300 group-focus-within:border-primary/60 group-focus-within:bg-base-100 group-focus-within:shadow-lg group-focus-within:shadow-primary/10">
                                        <PiLock className="text-xl text-base-content/40 transition group-focus-within:text-primary" />

                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            placeholder="Minimum 8 characters"
                                            value={formData.password}
                                            onChange={handleChange}
                                            autoComplete="new-password"
                                            className="h-13 w-full bg-transparent text-sm outline-none placeholder:text-base-content/35"
                                        />

                                        <button
                                            type="button"
                                            onClick={() => setShowPassword((prev) => !prev)}
                                            className="rounded-full p-1 text-xl text-base-content/45 transition hover:bg-primary/10 hover:text-primary"
                                            aria-label={
                                                showPassword ? "Hide password" : "Show password"
                                            }
                                        >
                                            {showPassword ? <PiEyeSlash /> : <PiEye />}
                                        </button>
                                    </div>
                                </label>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="btn mt-3 h-13 w-full rounded-2xl border-0 bg-linear-to-r from-violet-600 to-pink-500 text-white shadow-lg shadow-primary/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30 disabled:translate-y-0"
                                >
                                    {isLoading ? (
                                        <>
                                            <span className="loading loading-spinner loading-sm" />
                                            Creating account...
                                        </>
                                    ) : (
                                        <>
                                            Sign Up
                                            <PiArrowRight className="text-xl transition group-hover:translate-x-1" />
                                        </>
                                    )}
                                </button>
                            </form>

                            <p className="mt-7 text-center text-sm text-base-content/60">
                                Already have an account?{" "}
                                <Link
                                    href={`/signin?callbackURL=${encodeURIComponent(callbackURL)}`}
                                    className="font-semibold text-primary transition hover:text-pink-500 hover:underline"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}