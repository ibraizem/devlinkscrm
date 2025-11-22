'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedParticles = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    opacity: number;
    duration: number;
    delay: number;
    moveX: number;
    moveY: number;
  }>>([]);

  useEffect(() => {
    // Générer les particules uniquement côté client
    setParticles(
      Array.from({ length: 10 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 300 + 100, // Taille entre 100px et 400px
        opacity: Math.random() * 0.3 + 0.1, // Opacité entre 0.1 et 0.4
        duration: Math.random() * 5 + 5, // Durée entre 5 et 10 secondes
        delay: Math.random() * 5, // Délai jusqu'à 5 secondes
        moveX: Math.random() * 40 - 20, // Déplacement X entre -20 et 20
        moveY: Math.random() * 40 - 20, // Déplacement Y entre -20 et 20
      }))
    );
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Ne rien rendre côté serveur
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-blue-400/20"
          initial={{
            x: `${particle.x}%`,
            y: `${particle.y}%`,
            scale: 1,
            opacity: particle.opacity
          }}
          animate={{
            y: [`${particle.y}%`, `${particle.y + particle.moveY}%`, `${particle.y}%`],
            x: [`${particle.x}%`, `${particle.x + particle.moveX}%`, `${particle.x}%`],
            opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: particle.delay
          }}
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            filter: 'blur(40px)'
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedParticles;
