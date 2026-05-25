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
    PiShieldCheck,
    PiSparkle,
} from "react-icons/pi";
import { authClient, signIn } from "@/lib/auth-client";

export default function SigninPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
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

    const handleSignin = async (event) => {
        event.preventDefault();

        const email = formData.email.trim();
        const password = formData.password;

        if (!email) {
            toast.error("Please enter your email.");
            return;
        }

        if (!password) {
            toast.error("Please enter your password.");
            return;
        }

        setIsLoading(true);

        try {
            const callbackURL = getCallbackURL();

            const { error } = await signIn.email({
                email,
                password,
                callbackURL,
            });

            if (error) {
                toast.error(error.message || "Invalid email or password.");
                return;
            }

            toast.success("Signed in successfully.");

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
                    {/* Form panel */}
                    <div className="p-6 sm:p-8 lg:p-10">
                        <div className="mx-auto max-w-md">
                            <div className="mb-8 text-center lg:text-left">
                                <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary lg:mx-0">
                                    <PiShieldCheck className="text-3xl" />
                                </div>

                                <h1 className="text-3xl font-bold tracking-tight">
                                    Welcome Back
                                </h1>

                                <p className="mt-2 text-sm text-base-content/60">
                                    Sign in and continue your hiring journey.
                                </p>
                            </div>

                            <form onSubmit={handleSignin} className="space-y-4">
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
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="block text-sm font-medium text-base-content/70">
                                            Password
                                        </span>

                                        <Link
                                            href="/forgot-password"
                                            className="text-xs font-medium text-primary transition hover:text-pink-500 hover:underline"
                                        >
                                            Forgot password?
                                        </Link>
                                    </div>

                                    <div className="flex items-center gap-3 rounded-2xl border border-base-content/10 bg-base-200/70 px-4 transition duration-300 group-focus-within:border-primary/60 group-focus-within:bg-base-100 group-focus-within:shadow-lg group-focus-within:shadow-primary/10">
                                        <PiLock className="text-xl text-base-content/40 transition group-focus-within:text-primary" />

                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            placeholder="Your password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            autoComplete="current-password"
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
                                            Signing in...
                                        </>
                                    ) : (
                                        <>
                                            Sign In
                                            <PiArrowRight className="text-xl" />
                                        </>
                                    )}
                                </button>
                            </form>

                            <p className="mt-7 text-center text-sm text-base-content/60">
                                Don&apos;t have an account?{" "}
                                <Link
                                    href={`/signup?callbackURL=${encodeURIComponent(callbackURL)}`}
                                    className="font-semibold text-primary transition hover:text-pink-500 hover:underline"
                                >
                                    Create account
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Right visual panel */}
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
                                <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-md">
                                    <PiSparkle className="text-lg animate-pulse" />
                                    Continue where you left off
                                </div>

                                <h1 className="text-5xl font-semibold leading-tight tracking-tight">
                                    Manage applications from one clean dashboard.
                                </h1> 

                                <p className="mb-4 mt-2 max-w-md text-base leading-7 text-white/75">
                                    Track saved jobs, recruiter messages, interviews, and
                                    applications without losing focus.
                                </p>
                            </div>

                            <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
                                <p className="text-sm text-white/70">Today’s progress</p>

                                <div className="mt-4 space-y-3">
                                    <div>
                                        <div className="mb-1 flex justify-between text-sm">
                                            <span>Profile strength</span>
                                            <span>86%</span>
                                        </div>
                                        <progress
                                            className="progress progress-primary w-full"
                                            value="86"
                                            max="100"
                                        />
                                    </div>

                                    <div>
                                        <div className="mb-1 flex justify-between text-sm">
                                            <span>Applications</span>
                                            <span>12 sent</span>
                                        </div>
                                        <progress
                                            className="progress progress-secondary w-full"
                                            value="65"
                                            max="100"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}