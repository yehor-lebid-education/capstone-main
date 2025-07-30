import { cn } from "@/lib/utils";

const variantMap = {
    'full': "w-full h-full",
    'full-centered': "w-full h-full flex items-center justify-center",
} as const;

type Variant = keyof typeof variantMap;

export default function Container({
    children,
    className,
    variant = 'full',
    ...props
}: React.ComponentProps<"h1"> & { variant?: Variant }) {
    return (
        <div {...props} className={cn(variantMap[variant], className)}>
            {children}
        </div>
    );
}