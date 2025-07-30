import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Card, CardContent } from "../card";

export default function LoadingCard({ steps }: { steps: string[] }) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    useEffect(() => {
        if (steps.length === 0) return;

        const interval = setInterval(() => {
            if (currentStepIndex === steps.length - 1) {
                clearInterval(interval);
            }

            setCurrentStepIndex((prevIndex) => {
                if (prevIndex < steps.length - 1) {
                    return prevIndex + 1;
                }
                return prevIndex;
            });
        }, 2000); // Change every 1 second

        return () => clearInterval(interval);
    }, [steps.length]);

    const currentStep = steps[currentStepIndex] || "Processing...";

    return (
        <div className="w-full max-w-2xl">
            <Card>
                <CardContent className="flex flex-col items-center justify-center space-y-8 py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-center">{currentStep}</p>
                </CardContent>
            </Card>
        </div>
    )
}
