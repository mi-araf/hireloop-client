"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    PiArrowRight,
    PiBriefcase,
    PiEnvelopeSimple,
    PiImage,
    PiSignOut,
    PiSparkle,
    PiUser,
    PiUserCircle,
} from "react-icons/pi";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

export default function ProfilePage() {
    const router = useRouter();

    const { data: session, isPending, error, refetch } = authClient.useSession();

    const user = session?.user;

    const [formData, setFormData] = useState({
        name: "",
        image: "",
    });

    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        if (!isPending && !user) {
            router.push("/signin?callbackURL=/profile");
        }

        if (user) {
            setFormData({
                name: user.name || "",
                image: user.image || "",
            });
        }
    }, [isPending, user, router]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUpdateProfile = async (event) => {
        event.preventDefault();

        const name = formData.name.trim();
        const image = formData.image.trim();

        if (!name) {
            toast.error("Name is required.");
            return;
        }

        setIsUpdating(true);

        try {
            const updateData = {
                name,
            };

            // Image URL is optional. If empty, it will not update/change the current image.
            if (image) {
                updateData.image = image;
            }

            const { error } = await authClient.updateUser(updateData);

            if (error) {
                toast.error(error.message || "Could not update profile.");
                return;
            }

            toast.success("Profile updated successfully.");

            await refetch?.();
            router.refresh();
        } catch (error) {
            toast.error(error?.message || "Something went wrong.");
        } finally {
            setIsUpdating(false);
        }
    };

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    toast.success("Signed out successfully.");
                    router.push("/");
                    router.refresh();
                },
            },
        });
    };

    if (isPending) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-base-100 text-base-content">
                <div className="flex flex-col items-center gap-4">
                    <span className="loading loading-spinner loading-lg text-primary" />
                    <p className="text-sm text-base-content/60">Loading profile...</p>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-base-100 px-4 text-base-content">
                <div className="card max-w-md border border-error/20 bg-base-200 shadow-2xl">
                    <div className="card-body text-center">
                        <h1 className="text-2xl font-bold text-error">
                            Something went wrong
                        </h1>
                        <p className="text-sm text-base-content/60">
                            Could not load your session. Please sign in again.
                        </p>
                        <Link href="/signin" className="btn btn-primary mt-4 rounded-2xl">
                            Go to Sign In
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    if (!user) {
        return null;
    }

    const previewImage = formData.image.trim() || user.image;

    return (
        <main className="relative min-h-screen overflow-hidden bg-base-100 text-base-content">
            {/* Background */}
            <div className="absolute inset-0 bg-linear-to-br from-base-100 via-base-200 to-base-100" />
            <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-500/15 blur-3xl" />
            <div className="absolute bottom-10 left-10 h-72 w-72 rounded-full bg-pink-500/10 blur-3xl" />
            <div className="absolute right-10 top-36 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl" />

            <section className="container relative z-10 mx-auto px-4 py-12 md:py-20">
                <div className="mx-auto max-w-6xl">
                    {/* Header */}
                    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                        <div>
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-base-content/10 bg-base-200/70 px-4 py-2 text-sm text-base-content/70 shadow-lg backdrop-blur-xl">
                                <PiSparkle className="text-primary" />
                                Your HireLoop account
                            </div>

                            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                                My Profile
                            </h1>

                            <p className="mt-3 text-base text-base-content/60">
                                Manage your account information and profile appearance.
                            </p>
                        </div>

                        <button
                            onClick={handleSignOut}
                            className="btn rounded-2xl border border-error/20 bg-error/10 text-error transition hover:-translate-y-0.5 hover:bg-error hover:text-white"
                        >
                            <PiSignOut className="text-xl" />
                            Sign Out
                        </button>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.3fr]">
                        {/* Profile preview card */}
                        <div className="card border border-base-content/10 bg-base-100/70 shadow-2xl backdrop-blur-xl">
                            <div className="card-body items-center text-center">
                                <div className="relative">
                                    {previewImage ? (
                                        <Image
                                            src={previewImage}
                                            alt={formData.name || "User avatar"}
                                            className="size-32 rounded-3xl border border-base-content/10 object-cover shadow-2xl"
                                        />
                                    ) : (
                                        <div className="flex size-32 items-center justify-center rounded-3xl bg-linear-to-br from-violet-600 via-fuchsia-500 to-pink-500 text-white shadow-2xl shadow-primary/20">
                                            <PiUserCircle className="text-8xl" />
                                        </div>
                                    )}

                                    <div className="absolute -bottom-2 -right-2 flex size-10 items-center justify-center rounded-full border border-base-content/10 bg-base-100 text-primary shadow-lg">
                                        <PiUser className="text-xl" />
                                    </div>
                                </div>

                                <h2 className="mt-5 text-2xl font-bold">
                                    {formData.name || user.name || "No name added"}
                                </h2>

                                <p className="break-all text-sm text-base-content/60">
                                    {user.email}
                                </p>

                                <div className="mt-5 flex flex-wrap justify-center gap-2">
                                    <span className="badge badge-primary badge-outline">
                                        Job {user.role}
                                    </span>
                                    <span className="badge badge-secondary badge-outline">
                                        Active Account
                                    </span>
                                </div>

                                <div className="mt-6 w-full rounded-3xl border border-base-content/10 bg-base-200/60 p-5 text-left">
                                    <p className="text-sm font-semibold">Account Email</p>
                                    <div className="mt-3 flex items-center gap-3 text-sm text-base-content/65">
                                        <PiEnvelopeSimple className="text-xl text-primary" />
                                        <span className="break-all">{user.email}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Update profile form */}
                        <div className="card border border-base-content/10 bg-base-100/70 shadow-2xl backdrop-blur-xl">
                            <div className="card-body p-6 sm:p-8">
                                <div className="mb-6">
                                    <h2 className="text-2xl font-bold">Update Profile</h2>
                                    <p className="mt-2 text-sm text-base-content/60">
                                        Change your display name and optional profile image URL.
                                    </p>
                                </div>

                                <form onSubmit={handleUpdateProfile} className="space-y-5">
                                    {/* Name */}
                                    <label className="group block">
                                        <span className="mb-2 block text-sm font-semibold text-base-content/70">
                                            Name
                                        </span>

                                        <div className="flex items-center gap-3 rounded-2xl border border-base-content/10 bg-base-200/70 px-4 transition duration-300 group-focus-within:border-primary/60 group-focus-within:bg-base-100 group-focus-within:shadow-lg group-focus-within:shadow-primary/10">
                                            <PiUser className="text-xl text-base-content/40 transition group-focus-within:text-primary" />

                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Your name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="h-13 w-full bg-transparent text-sm outline-none placeholder:text-base-content/35"
                                            />
                                        </div>
                                    </label>

                                    {/* Image URL */}
                                    <label className="group block">
                                        <span className="mb-2 block text-sm font-semibold text-base-content/70">
                                            Image URL{" "}
                                            <span className="font-normal text-base-content/45">
                                                optional
                                            </span>
                                        </span>

                                        <div className="flex items-center gap-3 rounded-2xl border border-base-content/10 bg-base-200/70 px-4 transition duration-300 group-focus-within:border-primary/60 group-focus-within:bg-base-100 group-focus-within:shadow-lg group-focus-within:shadow-primary/10">
                                            <PiImage className="text-xl text-base-content/40 transition group-focus-within:text-primary" />

                                            <input
                                                type="url"
                                                name="image"
                                                placeholder="https://example.com/avatar.png"
                                                value={formData.image}
                                                onChange={handleChange}
                                                className="h-13 w-full bg-transparent text-sm outline-none placeholder:text-base-content/35"
                                            />
                                        </div>

                                        <p className="mt-2 text-xs text-base-content/45">
                                            Leave it empty if you don&apos;t want to change your image.
                                        </p>
                                    </label>

                                    <button
                                        type="submit"
                                        disabled={isUpdating}
                                        className="btn group h-13 w-full rounded-2xl border-0 bg-linear-to-r from-violet-600 via-fuchsia-500 to-pink-500 text-white shadow-lg shadow-primary/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30 disabled:translate-y-0 disabled:opacity-70"
                                    >
                                        {isUpdating ? (
                                            <>
                                                <span className="loading loading-spinner loading-sm" />
                                                Updating profile...
                                            </>
                                        ) : (
                                            <>
                                                Save Changes
                                                <PiArrowRight className="text-xl transition duration-300 group-hover:translate-x-1" />
                                            </>
                                        )}
                                    </button>
                                </form>

                                {/* Quick actions */}
                                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                                    <div className="rounded-2xl border border-base-content/10 bg-base-200/60 p-4">
                                        <PiBriefcase className="mb-3 text-2xl text-primary" />
                                        <p className="text-2xl font-bold">0</p>
                                        <p className="text-sm text-base-content/55">
                                            Applied Jobs
                                        </p>
                                    </div>

                                    <div className="rounded-2xl border border-base-content/10 bg-base-200/60 p-4">
                                        <PiSparkle className="mb-3 text-2xl text-primary" />
                                        <p className="text-2xl font-bold">0</p>
                                        <p className="text-sm text-base-content/55">Saved Jobs</p>
                                    </div>

                                    <Link
                                        href="/jobs"
                                        className="group rounded-2xl border border-base-content/10 bg-base-200/60 p-4 transition hover:-translate-y-1 hover:border-primary/40 hover:bg-primary/10"
                                    >
                                        <PiArrowRight className="mb-3 text-2xl text-primary transition group-hover:translate-x-1" />
                                        <p className="text-lg font-bold">Browse</p>
                                        <p className="text-sm text-base-content/55">Find jobs</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}