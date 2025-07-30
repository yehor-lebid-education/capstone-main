import { cn } from "@/lib/utils";

export function TypographyH1({
    className,
    children,
    ...props
}: React.ComponentProps<"h1">) {
    return (
        <h1
            className={cn(className, "scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance")}
            {...props}
        >
            {children}
        </h1>
    )
}
