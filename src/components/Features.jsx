import {
    PiMagnifyingGlass,
    PiChartLineUp,
    PiBuildings,
    PiBookmarkSimple,
    PiCursorClick,
    PiIdentificationCard,
    PiHexagon,
    PiTrendUp,
} from "react-icons/pi";

const features = [
    {
        title: "Smart Search",
        description: "Find your ideal job with advanced filters.",
        icon: PiMagnifyingGlass,
    },
    {
        title: "Salary Insights",
        description: "Get real salary data to negotiate confidently.",
        icon: PiChartLineUp,
    },
    {
        title: "Top Companies",
        description: "Apply to vetted companies that are hiring.",
        icon: PiBuildings,
    },
    {
        title: "Saved Jobs",
        description: "Manage apps & favorites on your dashboard.",
        icon: PiBookmarkSimple,
    },
    {
        title: "One-Click Apply",
        description: "Simplify your job applications for an easier process!",
        icon: PiCursorClick,
    },
    {
        title: "Resume Builder",
        description: "Create professional resumes with modern templates.",
        icon: PiIdentificationCard,
    },
    {
        title: "Skill-Based Matching",
        description: "Discover jobs that match your skills and experience.",
        icon: PiHexagon,
    },
    {
        title: "Career Growth Resources",
        description: "Boost your career with quick interview tips.",
        icon: PiTrendUp,
    },
];

export default function Features() {
    return (
        <section className="bg-[#151515] px-4 py-20 text-white md:py-24">
            <div className="w-11/12 md:w-10/12 mx-auto">
                {/* Header */}
                <div className="mx-auto max-w-xl text-center">
                    <div className="mb-4 flex items-center justify-center gap-3">
                        <span className="size-2 bg-violet-500" />
                        <p className="text-sm font-semibold uppercase tracking-widest text-white/45">
                            Features · Job
                        </p>
                        <span className="size-2 bg-violet-500" />
                    </div>

                    <h2 className="text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
                        Everything you need
                        <br />
                        to succeed
                    </h2>
                </div>

                {/* Features Grid */}
                <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature) => {
                        const Icon = feature.icon;

                        return (
                            <div
                                key={feature.title}
                                className="group flex items-start gap-5 rounded-2xl p-2 transition duration-300 hover:-translate-y-1"
                            >
                                {/* Icon box */}
                                <div className="flex size-16 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-black/40 shadow-lg shadow-black/20 transition duration-300 group-hover:border-violet-400/40 group-hover:bg-violet-500/10 group-hover:shadow-violet-500/10">
                                    <Icon className="text-3xl text-purple-200 transition duration-300 group-hover:scale-110 group-hover:text-violet-300" />
                                </div>

                                {/* Text */}
                                <div>
                                    <h3 className="text-base font-semibold text-white">
                                        {feature.title}
                                    </h3>

                                    <p className="mt-3 max-w-48 text-sm leading-6 text-white/45">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}