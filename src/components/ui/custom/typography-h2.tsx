import { cn } from "@/lib/utils";

export function TypographyH2({
    className,
    children,
    ...props
}: React.ComponentProps<"h2">) {
    return (
        <h2
            className={cn(className, "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0")}
            {...props}
        >
            {children}
        </h2>
    )
}
