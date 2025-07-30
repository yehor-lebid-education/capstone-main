import { cn } from "@/lib/utils";

const variantMap = {
    'full': "w-full h-full",
    'full-centered': "w-full h-full flex items-center justify-center",
} as const;

type Variant = keyof typeof variantMap;

export default function Container({
    children,
    variant = 'full',
}: {
    children?: React.ReactNode,
    variant?: Variant,
}) {
    return (
        <div className={cn(variantMap[variant])}>
            {children}
        </div>
    );
}