'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function AnimatedBackground() {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Animated Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e512_1px,transparent_1px),linear-gradient(to_bottom,#4f46e512_1px,transparent_1px)] bg-size-[64px_64px] mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] animate-grid-flow"></div>

            {/* Floating Particles - Plus nombreuses */}
            {[...Array(40)].map((_, i) => (
                <FloatingParticle key={i} index={i} />
            ))}

            {/* Animated Rings - Plus nombreux */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={`ring-${i}`}
                    className="absolute border border-blue-400/30 rounded-full"
                    style={{
                        width: `${200 + i * 80}px`,
                        height: `${200 + i * 80}px`,
                        top: `${20 + i * 10}%`,
                        left: `${10 + i * 15}%`,
                    }}
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 15 + i * 3,
                        repeat: Infinity,
                        ease: "linear",
                        delay: i * 0.5,
                    }}
                />
            ))}

            {/* Gradient Beams - Plus nombreux */}
            {[...Array(7)].map((_, i) => (
                <div
                    key={`beam-${i}`}
                    style={{
                        left: `${(i + 1) * 12}%`,
                        animationDelay: `${i * 0.8}s`,
                    }}
                    className={`absolute top-0 w-px h-full bg-linear-to-b from-transparent via-blue-400/40 to-transparent animate-beam-slide`}
                />
            ))}

            {/* Glowing Dots Network - Plus nombreux */}
            <svg className="absolute inset-0 w-full h-full opacity-40">
                <defs>
                    <radialGradient id="dotGradientLight">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity="1" />
                        <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                    </radialGradient>
                </defs>
                {[...Array(30)].map((_, i) => (
                    <motion.circle
                        key={i}
                        cx={`${(i * 7) % 100}%`}
                        cy={`${(i * 11) % 100}%`}
                        r="2"
                        fill="url(#dotGradientLight)"
                        initial={{ opacity: 0.3 }}
                        animate={{
                            opacity: [0.3, 1, 0.3],
                            r: [2, 5, 2],
                        }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            delay: i * 0.1,
                        }}
                    />
                ))}
                {/* Lignes connectant les points */}
                {[...Array(20)].map((_, i) => (
                    <motion.line
                        key={`line-${i}`}
                        x1={`${(i * 13) % 100}%`}
                        y1={`${(i * 17) % 100}%`}
                        x2={`${((i + 1) * 13) % 100}%`}
                        y2={`${((i + 1) * 17) % 100}%`}
                        stroke="#6366f1"
                        strokeWidth="1"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: [0, 0.3, 0],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.15,
                        }}
                    />
                ))}
            </svg>

            {/* Aurora Effect */}
            <div className="absolute inset-0 opacity-40">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-linear-to-b from-blue-300/30 via-purple-300/20 to-transparent animate-aurora"></div>
                <div className="absolute bottom-0 right-0 w-full h-1/2 bg-linear-to-t from-purple-300/30 via-indigo-300/20 to-transparent animate-aurora-reverse"></div>
            </div>

            {/* Floating Geometric Shapes */}
            {[...Array(8)].map((_, i) => (
                <FloatingShape key={`shape-${i}`} index={i} />
            ))}

            {/* Wavy Lines */}
            {[...Array(3)].map((_, i) => (
                <motion.div
                    key={`wave-${i}`}
                    className="absolute w-full h-2 bg-linear-to-r from-transparent via-blue-400/20 to-transparent"
                    style={{
                        top: `${30 + i * 20}%`,
                    }}
                    animate={{
                        x: ['-100%', '100%'],
                        opacity: [0, 0.5, 0],
                    }}
                    transition={{
                        duration: 8 + i * 2,
                        repeat: Infinity,
                        delay: i * 1.5,
                        ease: "linear",
                    }}
                />
            ))}

            {/* Scan Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(99,102,241,0.03)_50%,transparent_100%)] bg-size-[100%_4px] animate-scan-lines pointer-events-none"></div>
        </div>
    );
}

// Floating Particle Component
function FloatingParticle({ index }: { index: number }) {
    const [config, setConfig] = useState({
        size: 0,
        duration: 0,
        delay: 0,
        initialX: 0,
        initialY: 0,
        color: 'bg-blue-400',
        moveX: 0,
        moveY: 0
    });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const colors = ['bg-blue-400', 'bg-indigo-400', 'bg-purple-400', 'bg-cyan-400'];
        setConfig({
            size: Math.random() * 4 + 2,
            duration: Math.random() * 20 + 10,
            delay: Math.random() * 5,
            initialX: Math.random() * 100,
            initialY: Math.random() * 100,
            color: colors[Math.floor(Math.random() * colors.length)],
            moveX: Math.random() * 150 - 75,
            moveY: Math.random() * 150 - 75
        });
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <motion.div
            className={`absolute w-1 h-1 ${config.color} rounded-full shadow-lg`}
            style={{
                left: `${config.initialX}%`,
                top: `${config.initialY}%`,
                width: `${config.size}px`,
                height: `${config.size}px`,
            }}
            animate={{
                x: [0, config.moveX, 0],
                y: [0, config.moveY, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.8, 1],
            }}
            transition={{
                duration: config.duration,
                repeat: Infinity,
                delay: config.delay,
                ease: "easeInOut"
            }}
        />
    )
}

// Floating Geometric Shape Component
function FloatingShape({ index }: { index: number }) {
    const [config, setConfig] = useState({
        size: 0,
        duration: 0,
        initialX: 0,
        initialY: 0,
        moveX: 0,
        moveY: 0
    });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setConfig({
            size: 30 + Math.random() * 40,
            duration: 15 + Math.random() * 10,
            initialX: Math.random() * 80 + 10,
            initialY: Math.random() * 80 + 10,
            moveX: Math.random() * 100 - 50,
            moveY: Math.random() * 100 - 50
        });
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const shapes = ['square', 'triangle', 'hexagon'];
    const shape = shapes[index % shapes.length];

    return (
        <motion.div
            className="absolute"
            style={{
                left: `${config.initialX}%`,
                top: `${config.initialY}%`,
            }}
            animate={{
                rotate: [0, 360],
                x: [0, config.moveX, 0],
                y: [0, config.moveY, 0],
                opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
                duration: config.duration,
                repeat: Infinity,
                ease: "linear",
                delay: index * 0.5,
            }}
        >
            {shape === 'square' && (
                <div className={`w-${Math.floor(config.size / 10)} h-${Math.floor(config.size / 10)} border-2 border-blue-400/30`} style={{ width: config.size, height: config.size }} />
            )}
            {shape === 'triangle' && (
                <div
                    className="border-l-transparent border-r-transparent border-b-blue-400/30"
                    style={{
                        width: 0,
                        height: 0,
                        borderLeft: `${config.size / 2}px solid transparent`,
                        borderRight: `${config.size / 2}px solid transparent`,
                        borderBottom: `${config.size}px solid rgba(96, 165, 250, 0.3)`,
                    }}
                />
            )}
            {shape === 'hexagon' && (
                <svg width={config.size} height={config.size} viewBox="0 0 100 100">
                    <polygon
                        points="50 0, 100 25, 100 75, 50 100, 0 75, 0 25"
                        fill="none"
                        stroke="rgba(96, 165, 250, 0.3)"
                        strokeWidth="2"
                    />
                </svg>
            )}
        </motion.div>
    )
}
