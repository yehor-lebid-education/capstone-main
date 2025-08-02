import { cn } from "@/lib/utils";

const variantMap = {
    's': "mb-4",
    'm': "mb-6",
    'l': "mb-8",
    'xl': "mb-10",
} as const;

type Variant = keyof typeof variantMap;


export default function Row({
    children,
    className,
    variant = 'm',
    ...props
}: React.ComponentProps<"h1"> & { variant?: Variant }) {
    return (
        <div {...props} className={cn(variantMap[variant], className)}>
            {children}
        </div>
    );

}