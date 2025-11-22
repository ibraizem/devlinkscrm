'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface FloatingParticleProps {
  index: number
  color?: string
  className?: string
}

export function FloatingParticle({ 
  index, 
  color = 'bg-blue-400/40',
  className = '' 
}: FloatingParticleProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [particleProps, setParticleProps] = useState({
    size: 0,
    x: 0,
    y: 0,
    duration: 20,
    delay: 0
  })

  useEffect(() => {
    // Ne générer les valeurs aléatoires qu'après le montage
    setParticleProps({
      size: Math.random() * 3 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 20,
      delay: Math.random() * -20
    })
    setIsMounted(true)
  }, [])
  
  if (!isMounted) {
    // Rendu côté serveur - retourner un div vide avec les mêmes dimensions de base
    return <div className="absolute w-0 h-0" />
  }
  
  return (
    <motion.div
      className={`absolute rounded-full ${color} ${className}`}
      style={{
        width: `${particleProps.size}px`,
        height: `${particleProps.size}px`,
        left: `${particleProps.x}%`,
        top: `${particleProps.y}%`,
        zIndex: 1
      }}
      initial={false}
      animate={{
        y: [0, -30, 0, -15, 0],
        x: [0, 10, -10, 5, 0],
        opacity: [0.2, 0.8, 0.2],
      }}
      transition={{
        duration: particleProps.duration,
        delay: particleProps.delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

export function FloatingShape({ index }: { index: number }) {
  const [isMounted, setIsMounted] = useState(false)
  const [shapeProps, setShapeProps] = useState({
    size: 0,
    x: 0,
    y: 0,
    rotate: 0,
    duration: 30,
    delay: 0
  })

  useEffect(() => {
    setShapeProps({
      size: Math.random() * 100 + 50,
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotate: Math.random() * 360,
      duration: Math.random() * 30 + 30,
      delay: Math.random() * -30
    })
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="absolute w-0 h-0" />
  }

  const shapeType = index % 3
  const shapeStyles = [
    'rounded-full',
    'rounded-lg',
    'rotate-45'
  ][shapeType] || ''
  
  const bgGradients = [
    'from-blue-200/30 to-purple-200/30',
    'from-indigo-200/30 to-pink-200/30',
    'from-cyan-200/30 to-blue-200/30',
  ]
  
  const bgGradient = bgGradients[index % bgGradients.length]
  
  return (
    <motion.div
      className={`absolute ${shapeStyles} bg-linear-to-br ${bgGradient} backdrop-blur-sm`}
      style={{
        width: `${shapeProps.size}px`,
        height: `${shapeProps.size}px`,
        left: `${shapeProps.x}%`,
        top: `${shapeProps.y}%`,
        zIndex: 0
      }}
      initial={false}
      animate={{
        y: [0, -50, 0, -25, 0],
        x: [0, 30, -20, 10, 0],
        rotate: [shapeProps.rotate, shapeProps.rotate + 360],
      }}
      transition={{
        duration: shapeProps.duration,
        delay: shapeProps.delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Grille animée */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e512_1px,transparent_1px),linear-gradient(to_bottom,#4f46e512_1px,transparent_1px)] bg-size-[64px_64px] mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] animate-grid-flow"></div>

      {/* Particules flottantes */}
      {Array.from({ length: 40 }).map((_, i) => (
        <FloatingParticle key={`particle-${i}`} index={i} />
      ))}

      {/* Formes géométriques flottantes */}
      {Array.from({ length: 5 }).map((_, i) => (
        <FloatingShape key={`shape-${i}`} index={i} />
      ))}
    </div>
  )
}
