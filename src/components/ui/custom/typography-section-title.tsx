import { cn } from "@/lib/utils";

export default function TypographySectionTitle({
    className,
    children,
    ...props
}: React.ComponentProps<"h3">) {
    return (
        <h2
            {...props}
            className={cn(
                "relative inline-block text-3xl font-bold text-gray-800 my-6 tracking-tight",
                className
            )}
        >
            <span>{children}</span>
            <div className="absolute left-0 bottom-[-0.5rem] w-full h-0.5 bg-gradient-to-r from-purple-500 to-purple-300"></div>
        </h2>
    )
}