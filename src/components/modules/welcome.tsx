'use client';

import AnimatedBackground from "@/components/common/animated-background";
import IntroHero from "@/components/common/hero";
import Row from "@/components/layout/row";

export default function Welcome() {
    return (
        <div className="relative flex flex-col items-center justify-center w-full h-full">
            <AnimatedBackground />
            <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-7xl px-4">
                <Row>
                    <IntroHero />
                </Row>
                <Row className="mb-6">
                    <p className="text-base sm:text-lg md:text-xl text-gray-500 max-w-2xl mt-4">
                        Answer a few quick questions — we'll instantly generate a structured learning plan based on your experience, goals, and available time.
                    </p>
                </Row>
                <Row className="flex justify-start">

                </Row>
            </div>
        </div>
    )
}