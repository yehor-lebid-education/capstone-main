import { cn } from "@/lib/utils";

export function TypographyH3({
    className,
    children,
    ...props
}: React.ComponentProps<"h3">) {
    return (
        <h3
            className={cn(className, "scroll-m-20 text-2xl font-semibold tracking-tight")}
            {...props}
        >
            {children}
        </h3>
    )
}
