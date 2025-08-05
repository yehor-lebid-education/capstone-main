'use client';

import AnimatedBackground from "@/components/common/animated-background";
import IntroHero from "@/components/common/hero";
import Row from "@/components/layout/row";
import { Button } from "@/components/ui/button";
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default function Welcome() {

    return (
        <div className="relative flex flex-col items-center justify-center w-full h-full">
            <AnimatedBackground />
            <div className="relative z-10 flex flex-col items-start justify-center w-full pb-[5rem]">
                <Row>
                    <IntroHero />
                </Row>
                <Row className="mb-6">
                    <p className="text-base sm:text-lg md:text-xl text-gray-500 max-w-2xl mt-4">
                        Answer a few quick questions — we'll instantly generate a structured course based on your experience, goals, and available time.
                    </p>
                </Row>
                <Row className="flex justify-start">
                    <ClerkLoading>
                        <Skeleton className="h-[60px] w-[350px]" />
                    </ClerkLoading>

                    <ClerkLoaded>
                        <SignedOut>
                            <SignInButton mode="modal">
                                <Button size="extra">Get Started</Button>
                            </SignInButton>
                        </SignedOut>
                        <SignedIn>
                            <div className="flex space-x-6">
                                <Link href="/courses">
                                    <Button size="extra" variant="outline">My Courses</Button>
                                </Link>
                                <Link href="/create-course">
                                    <Button size="extra">Start New Learning</Button>
                                </Link>
                            </div>
                        </SignedIn>
                    </ClerkLoaded>
                </Row>
            </div>
        </div>
    )
}