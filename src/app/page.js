import CTA from "@/components/CTA";
import Features from "@/components/Features";
import MainBanner from "@/components/MainBanner";
import Pricing from "@/components/Pricing";
import StatsGlobeSection from "@/components/StatsGlobeSection";
import Image from "next/image";

export default function Home() {
    return (
        <div>

            <MainBanner />
            <StatsGlobeSection />

            <Features />
            <Pricing />
            <CTA />

        </div>
    );
}
