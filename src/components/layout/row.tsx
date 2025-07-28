export default function Row({ children, className }: { children?: React.ReactNode, className?: string }) {
    return (
        <div className={`w-full mb-4 ${className}`}>
            {children}
        </div>
    );

}