import Link from "next/link";
import Container from "@/components/layout/container";
import Row from "@/components/layout/row";
import { TypographyH1 } from "@/components/ui/custom/typography-h1";
import { Button } from "@/components/ui/button";
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut } from "@clerk/nextjs";

export default function NotFound() {
    return (
        <Container variant="full-centered">
            <Row className="text-center space-y-6">
                <div className="space-y-6 animate-fade-in">
                    <div className="text-6xl mb-4 animate-pulse">🔍</div>

                    <div className="space-y-3">
                        <TypographyH1>This page doesn&apos;t exist.</TypographyH1>

                        <ClerkLoading>
                            <div className="animate-pulse text-muted-foreground">Loading...</div>
                        </ClerkLoading>

                        <ClerkLoaded>
                            <SignedIn>
                                <p className="text-lg text-muted-foreground">
                                    Let&apos;s get you back to your learning.
                                </p>
                            </SignedIn>

                            <SignedOut>
                                <p className="text-lg text-muted-foreground">
                                    Let&apos;s get you back to the main page.
                                </p>
                            </SignedOut>
                        </ClerkLoaded>
                    </div>

                    <ClerkLoaded>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <SignedIn>
                                <Button asChild>
                                    <Link href="/courses">Back to Courses</Link>
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href="/">Home</Link>
                                </Button>
                            </SignedIn>

                            <SignedOut>
                                <Button asChild>
                                    <Link href="/">Back to Home</Link>
                                </Button>
                            </SignedOut>
                        </div>
                    </ClerkLoaded>
                </div>
            </Row>
        </Container>
    );
}
