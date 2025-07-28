import { motion } from 'framer-motion';

const blobs = [
    {
        size: 350,
        color: "rgba(236, 72, 153, 0.5)", // pink
        keyframes: {
            left: ["10%", "20%", "5%", "15%", "10%"],
            top: ["15%", "10%", "25%", "20%", "15%"],
            opacity: [0.8, 0.6, 0.7, 0.5, 0.8],
        },
        transition: {
            duration: 12,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: 0,
        } as const,
    },
    {
        size: 300,
        color: "rgba(34, 197, 94, 0.5)", // green
        keyframes: {
            left: ["50%", "60%", "55%", "45%", "50%"],
            top: ["60%", "75%", "60%", "50%", "50%"],
            opacity: [0.8, 0.4, 0.7, 0.3, 0.8],
        },
        transition: {
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: 1.5,
        } as const,
    },
    {
        size: 400,
        color: "rgba(59, 130, 246, 0.6)", // blue
        keyframes: {
            left: ["69%", "80%", "75%", "65%", "69%"],
            top: ["1%", "5%", "10%", "3%", "1%"],
            opacity: [0.8, 0.5, 0.9, 0.4, 0.8],
        },
        transition: {
            duration: 14,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: 3,
        } as const,
    },
];

export default function AnimatedBackground() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            {blobs.map(({ size, color, keyframes, transition }, i) => (
                <motion.div
                    key={i}
                    style={{
                        width: size,
                        height: size,
                        backgroundColor: color,
                        borderRadius: "50%",
                        position: "absolute",
                        filter: "blur(65px)",
                        boxShadow: `0 0 30px ${color}`,
                        opacity: 0.8,
                    }}
                    animate={{
                        left: keyframes.left,
                        top: keyframes.top,
                        opacity: keyframes.opacity,
                    }}
                    transition={transition}
                />
            ))}
        </div>
    );
}