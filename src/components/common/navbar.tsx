// app/components/Navbar.tsx
"use client";

import Link from "next/link";
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button"; // shadcn UI button
import { Skeleton } from "@/components/ui/skeleton"; // shadcn UI button
import { Loader2 } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="w-full h-[60px]">
            <div className="max-w-7xl w-full h-full mx-auto flex items-center justify-between py-2 px-4">
                {/* Clerk loading */}
                <ClerkLoading>
                    <Skeleton className="w-[100%] h-[100%] rounded-full" />
                </ClerkLoading>

                {/* Clerk loaded */}
                <ClerkLoaded>

                    {/* Signed Out */}
                    <SignedOut>
                        {/* Logo/Brand */}
                        <Link href="/" className="font-bold text-xl text-primary tracking-tight cursor-pointer">
                            EduMentor
                        </Link>

                        {/* Right Side Auth Controls */}
                        <div className="flex items-center space-x-3">
                            <SignInButton mode="modal">
                                <Button>Sign In</Button>
                            </SignInButton>
                        </div>
                    </SignedOut>

                    {/* Signed In */}
                    <SignedIn>
                        <div className="flex items-center justify-between w-full">
                            {/* Left Side - Logo & Navigation */}
                            <div className="flex items-center space-x-1">
                                {/* Logo/Brand */}
                                <Link href="/courses" className="font-bold text-xl text-primary tracking-tight cursor-pointer mr-6">
                                    EduMentor
                                </Link>

                                {/* Navigation Links */}
                                <div className="flex items-center space-x-1">
                                    <Link href="/courses">
                                        <Button variant="ghost">My Courses</Button>
                                    </Link>
                                    <Link href="/create-course">
                                        <Button variant="ghost">Start New Learning</Button>
                                    </Link>
                                </div>
                            </div>

                            {/* Right Side Auth Controls */}
                            <div className="flex items-center">
                                <UserButton />
                            </div>
                        </div>
                    </SignedIn>

                </ClerkLoaded>
            </div>
        </nav>
    );
}
