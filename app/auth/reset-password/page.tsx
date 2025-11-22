'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle, X, ArrowLeft, Loader2, Eye, EyeOff } from 'lucide-react'
import { toast } from 'react-hot-toast'

import { supabase } from '@/lib/supabase/client'
import { resetPassword } from '@/services/authService'
import { PasswordStrengthMeter } from '@/components/ui/PasswordStrengthMeter'
import { AUTH_ROUTES, ANIMATION_CONFIG } from '@/config/auth'
import { div } from 'framer-motion/client'

/**
 * Composant principal de réinitialisation de mot de passe
 * Gère la logique de réinitialisation du mot de passe
 */
function ResetPasswordContent() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [isValidPassword, setIsValidPassword] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  const [isInitialSetup, setIsInitialSetup] = useState(false)
  const [isLoadingAuth, setIsLoadingAuth] = useState(true)
  const [sessionChecked, setSessionChecked] = useState(false)

  useEffect(() => {
    // Vérifier si c'est une configuration initiale après inscription
    const checkAuth = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        
        if (sessionError) throw sessionError
        
        if (session) {
          const { data: { user }, error: userError } = await supabase.auth.getUser()
          if (userError) throw userError
          
          if (user && !user.email_confirmed_at) {
            setIsInitialSetup(true)
          }
        }
        // Si pas de session, on continue pour permettre la réinitialisation
      } catch (error) {
        console.error('Erreur lors de la vérification de l\'authentification:', error)
        setError('Erreur de vérification de session. Veuillez réessayer.')
      } finally {
        setIsLoadingAuth(false)
        setSessionChecked(true)
      }
    }

    checkAuth()
  }, [])

  const validatePassword = (pwd: string) => {
    const hasMinLength = pwd.length >= 8
    const hasUpperCase = /[A-Z]/.test(pwd)
    const hasLowerCase = /[a-z]/.test(pwd)
    const hasNumber = /[0-9]/.test(pwd)
    const hasSpecialChar = /[+\-!@#$%^&*()_=+\[{\]}\\|;:'",<.>/?`~]/.test(pwd)
    
    const requirements = [
      hasMinLength,
      hasUpperCase,
      hasLowerCase,
      hasNumber,
      hasSpecialChar
    ]
    
    const score = requirements.filter(Boolean).length
    setPasswordStrength(score)
    
    const isValid = hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar
    setIsValidPassword(isValid)
    
    return isValid
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value
    setPassword(newPassword)
    validatePassword(newPassword)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!isValidPassword) {
      setError('Veuillez respecter toutes les exigences de sécurité pour le mot de passe')
      return
    }

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      await resetPassword(password)
      setIsSuccess(true)
      toast.success('Votre mot de passe a été configuré avec succès')
      
      // Redirection après un court délai pour voir le message de succès
      setTimeout(() => {
        router.push('/auth/login')
      }, 2000)
      
    } catch (err: any) {
      console.error('Erreur de réinitialisation:', err)
      const errorMessage = err.message.includes('AuthSessionMissingError') 
        ? 'La session a expiré. Veuillez redémarrer le processus de réinitialisation.'
        : err.message || 'Une erreur est survenue lors de la réinitialisation du mot de passe'
      
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-indigo-50 to-purple-100 p-4">
        <AnimatedBackground />
        <motion.div 
          className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 relative z-20 border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {isInitialSetup && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg text-sm text-blue-700">
              <p className="font-medium">Bienvenue !</p>
              <p>Veuillez définir votre mot de passe pour finaliser la création de votre compte.</p>
            </div>
          )}
          <motion.div 
            className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-50 mb-6"
            initial={{ scale: 0 }}
            animate={{ 
              scale: 1,
              rotate: [0, 10, -10, 10, 0],
            }}
            transition={{ 
              scale: { duration: 0.5 },
              rotate: { delay: 0.3, duration: 0.8 }
            }}
          >
            <CheckCircle className="h-10 w-10 text-green-500" />
          </motion.div>
          
          <motion.h2 
            className="text-2xl font-bold text-gray-900 mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {isInitialSetup ? 'Compte créé avec succès !' : 'Mot de passe mis à jour !'}
          </motion.h2>
          
          <motion.p 
            className="text-gray-600 mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Votre mot de passe a été modifié avec succès. Vous allez être redirigé vers la page de connexion.
          </motion.p>
          
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="h-2 w-24 bg-blue-100 rounded-full overflow-hidden">
              <div className="h-full bg-linear-to-r from-blue-500 to-purple-500 rounded-full animate-progress" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    )
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
              Nouveau mot de passe
            </motion.h1>
            <motion.p 
              className="mt-2 text-sm text-gray-600"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Créez un nouveau mot de passe sécurisé pour votre compte
            </motion.p>
          </div>

          {/* Form Container */}
          <div className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {error && (
                  <motion.div 
                    className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-start"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  >
                    <div className="shrink-0 pt-0.5">
                      <X className="h-5 w-5 text-red-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-red-700">{error}</p>
                    </div>
                  </motion.div>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="space-y-1"
              >
                <label 
                  htmlFor="password" 
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                    minLength={8}
                    placeholder="Nouveau mot de passe"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <PasswordStrengthMeter 
                  password={password} 
                  showPassword={showPassword}
                  onTogglePassword={() => setShowPassword(!showPassword)}
                  className="mt-2"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.15 }}
                className="space-y-1"
              >
                <label 
                  htmlFor="confirmPassword" 
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                    minLength={8}
                    placeholder="Confirmez le mot de passe"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="pt-2"
              >
                <button
                  type="submit"
                  disabled={isLoading || !isValidPassword || !password || !confirmPassword}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${
                    !isValidPassword || !password || !confirmPassword
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  } focus:outline-none transition-colors duration-200 ${
                    isLoading ? 'opacity-70 cursor-wait' : ''
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg 
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24"
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Mise à jour en cours...</span>
                    </>
                  ) : (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center"
                    >
                      <span>Mettre à jour le mot de passe</span>
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
                </button>
              </motion.div>
            </form>
          </div>
          
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
            </div>
          </div>
        </div>
  ) 
}

/**
 * Page de réinitialisation de mot de passe avec Suspense
 * Permet à l'utilisateur de définir un nouveau mot de passe après avoir reçu un lien de réinitialisation
 * 
 * @returns {JSX.Element} Composant de la page de réinitialisation de mot de passe avec Suspense
 */
export default function ResetPassword() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 p-4">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                        <p className="text-gray-600">Chargement de la page de réinitialisation...</p>
                    </div>
                </div>
            </div>
        }>
            <ResetPasswordContent />
        </Suspense>
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
      {Array.from({ length: ANIMATION_CONFIG.PARTICLES_COUNT }).map((_, i) => (
        <FloatingParticle key={`particle-${i}`} index={i} />
      ))}

      {/* Formes géométriques flottantes */}
      {Array.from({ length: ANIMATION_CONFIG.SHAPES_COUNT }).map((_, i) => (
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