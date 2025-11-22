'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Mail, ArrowLeft } from 'lucide-react'
import { toast } from 'react-hot-toast'

import { supabase } from '@/lib/supabase/client'
import { AUTH_ROUTES } from '@/config/auth'

/**
 * Page de mot de passe oublié
 * Permet à l'utilisateur de demander un lien de réinitialisation de mot de passe
 * 
 * @returns {JSX.Element} Composant de la page de mot de passe oublié
 */
export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}${AUTH_ROUTES.RESET_PASSWORD}`,
      })

      if (error) throw error

      toast.success('Un email de réinitialisation a été envoyé')
    } catch (error: any) {
      console.error('Erreur lors de la demande de réinitialisation:', error)
      toast.error(error.message || 'Une erreur est survenue')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-screen w-full flex flex-col md:flex-row bg-linear-to-br from-blue-50 via-indigo-50 to-purple-100 overflow-hidden relative">
      {/* Animated Background Elements */}
      <AnimatedBackground />

      {/* Main Content */}
      <div className="w-full flex items-center justify-center p-4 md:p-8 relative z-20">
        {/* Gradient Orbs */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse-slower"></div>

        <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/20">
          {/* Header */}
          <div className="px-8 pt-8 pb-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-2"
            >
              <div className="w-16 h-1 bg-linear-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </motion.div>
            <motion.h1
              className="text-2xl font-bold text-gray-900"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Mot de passe oublié
            </motion.h1>
            <motion.p
              className="mt-2 text-sm text-gray-600"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Entrez votre adresse email pour recevoir un lien de réinitialisation
            </motion.p>
          </div>

          {/* Form Container */}
          <div className="px-8 pb-8">
            <form onSubmit={handleReset} className="space-y-5">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Adresse email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm focus:shadow-md"
                    placeholder="votre@email.com"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="pt-2"
              >
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  whileHover={{
                    scale: isLoading ? 1 : 1.02,
                    boxShadow: '0 4px 20px -5px rgba(59, 130, 246, 0.5)',
                  }}
                  className={`group relative w-full flex justify-center py-3.5 px-6 border border-transparent 
                    text-base font-medium rounded-xl text-white bg-linear-to-r from-blue-500 to-blue-600 
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-white/90
                    transition-all duration-200 ease-out
                    ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg'}`}
                >
                  {isLoading ? (
                    <motion.div
                      className="flex items-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Envoi en cours...</span>
                    </motion.div>
                  ) : (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center"
                    >
                      <span>Envoyer le lien de réinitialisation</span>
                      <svg
                        className="ml-2 -mr-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </motion.span>
                  )}
                </motion.button>
              </motion.div>

              <div className="mt-6 text-center">
                <motion.a
                  href={AUTH_ROUTES.LOGIN}
                  className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 group transition-colors"
                  whileHover={{ x: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ArrowLeft className="h-4 w-4 mr-1 transition-transform group-hover:-translate-x-1" />
                  Retour à la connexion
                </motion.a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Composant d'arrière-plan animé avec des éléments flottants
 */
function AnimatedBackground() {
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

/**
 * Composant de particule flottante
 */
function FloatingParticle({ index }: { index: number }) {
  const size = Math.random() * 3 + 1
  const duration = Math.random() * 20 + 20
  const delay = Math.random() * -20
  const x = Math.random() * 100
  const y = Math.random() * 100

  return (
    <motion.div
      className="absolute rounded-full bg-blue-400/40"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${x}%`,
        top: `${y}%`,
      }}
      animate={{
        y: [0, -30, 0, -15, 0],
        x: [0, 10, -10, 5, 0],
        opacity: [0.2, 0.8, 0.2],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

/**
 * Composant de forme géométrique flottante
 */
function FloatingShape({ index }: { index: number }) {
  const size = Math.random() * 100 + 50
  const duration = Math.random() * 30 + 30
  const delay = Math.random() * -30
  const x = Math.random() * 100
  const y = Math.random() * 100
  const rotate = Math.random() * 360
  const shapeType = index % 3

  const shapeStyles = {
    0: 'rounded-full',
    1: 'rounded-lg',
    2: 'rotate-45',
  }[shapeType] || ''

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
        width: `${size}px`,
        height: `${size}px`,
        left: `${x}%`,
        top: `${y}%`,
        rotate: `${rotate}deg`,
      }}
      animate={{
        y: [0, -50, 0, -25, 0],
        x: [0, 30, -20, 10, 0],
        rotate: [rotate, rotate + 90, rotate + 180, rotate + 270, rotate + 360],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}