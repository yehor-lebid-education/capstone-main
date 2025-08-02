// app/components/Navbar.tsx
"use client";

import Link from "next/link";
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button"; // shadcn UI button
import { Loader2 } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="w-full h-[60px]">
            <div className="max-w-7xl h-full mx-auto flex items-center justify-between py-2 px-4">
                {/* Logo/Brand */}
                <Link href="/" className="font-bold text-xl text-primary tracking-tight cursor-pointer">
                    EduMentor
                </Link>

                {/* Right Side Auth Controls */}
                <div className="flex items-center space-x-3">
                    <ClerkLoading>
                        <Loader2 className="animate-spin" />
                    </ClerkLoading>
                    <ClerkLoaded>
                        <SignedOut>
                            <SignInButton mode="modal">
                                <Button>Sign In</Button>
                            </SignInButton>
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </ClerkLoaded>
                </div>
            </div>
        </nav>
    );
}
