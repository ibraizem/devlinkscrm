'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Loader2, Mail, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { AnimatedBackground } from '@/components/ui/FloatingParticle'

import { supabase } from '@/lib/supabase/client'
import { AUTH_ROUTES } from '@/config/auth'

/**
 * Page de vérification d'email
 * Affiche l'état de la vérification de l'email et redirige une fois la vérification effectuée
 * 
 * @returns {JSX.Element} Composant de la page de vérification d'email
 */
export default function VerifyEmail() {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isVerified, setIsVerified] = useState(false)
    const [email, setEmail] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() => {
        const checkEmailVerification = async () => {
            try {
                const { data: { session }, error: sessionError } = await supabase.auth.getSession()
                
                if (sessionError) throw sessionError
                
                if (!session) {
                    router.push(AUTH_ROUTES.LOGIN)
                    return
                }

                // Mettre à jour l'email de l'utilisateur pour le bouton de renvoi
                if (session.user.email) {
                    setEmail(session.user.email)
                }

                if (session.user.email_confirmed_at) {
                    setIsVerified(true)
                    // Rediriger vers le tableau de bord après 3 secondes
                    const timer = setTimeout(() => {
                        router.push(AUTH_ROUTES.DASHBOARD)
                    }, 3000)
                    return () => clearTimeout(timer)
                }

                setIsLoading(false)
            } catch (error) {
                console.error('Erreur lors de la vérification de l\'email:', error)
                setError('Une erreur est survenue lors de la vérification de votre email')
                setIsLoading(false)
            }
        }

        checkEmailVerification()

        // Vérifier périodiquement la vérification de l'email
        const interval = setInterval(async () => {
            const { data: { session }, error } = await supabase.auth.getSession()
            
            if (error) {
                console.error('Erreur lors de la vérification de session:', error)
                return
            }
            
            if (session?.user?.email_confirmed_at) {
                clearInterval(interval)
                setIsVerified(true)
                router.push(AUTH_ROUTES.DASHBOARD)
            }
        }, 5000) // Vérifier toutes les 5 secondes

        return () => clearInterval(interval)
    }, [router])

    const handleResendEmail = async () => {
        try {
            const { error } = await supabase.auth.resend({
                type: 'signup',
                email: (await supabase.auth.getUser()).data.user?.email || '',
                options: {
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                },
            })

            if (error) throw error

            alert('Email de vérification renvoyé avec succès !')
        } catch (err) {
            setError('Une erreur est survenue lors de l\'envoi de l\'email. Veuillez réessayer.')
            console.error('Erreur:', err)
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[linear-gradient(to_bottom_right,var(--tw-gradient-from),var(--tw-gradient-to))] from-blue-50 to-indigo-100">
                <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md w-full mx-4">
                    <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Vérification en cours...</p>
                </div>
            </div>
        )
    }

    if (isVerified) {
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
                            
                            {isLoading ? (
                                <>
                                    <motion.h1 
                                        className="text-2xl font-bold text-gray-900 mb-2"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.1 }}
                                    >
                                        Vérification en cours
                                    </motion.h1>
                                    <motion.p 
                                        className="text-gray-600"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                    >
                                        Veuillez patienter pendant que nous vérifions votre adresse email...
                                    </motion.p>
                                    <motion.div 
                                        className="mt-6"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <Loader2 className="h-12 w-12 text-blue-500 animate-spin mx-auto" />
                                    </motion.div>
                                </>
                            ) : error ? (
                                <>
                                    <motion.div 
                                        className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-50 mb-4"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                    >
                                        <AlertCircle className="h-8 w-8 text-red-500" />
                                    </motion.div>
                                    <motion.h1 
                                        className="text-2xl font-bold text-gray-900 mb-2"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.1 }}
                                    >
                                        Erreur de vérification
                                    </motion.h1>
                                    <motion.p 
                                        className="text-gray-600 mb-6"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                    >
                                        {error}
                                    </motion.p>
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: 0.3 }}
                                    >
                                        <Link 
                                            href={AUTH_ROUTES.REGISTER}
                                            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-linear-to-r from-blue-500 to-blue-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                                        >
                                            Retour à l'inscription
                                        </Link>
                                    </motion.div>
                                </>
                            ) : isVerified ? (
                                <>
                                    <motion.div 
                                        className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-50 mb-4"
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
                                        <CheckCircle2 className="h-10 w-10 text-green-500" />
                                    </motion.div>
                                    <motion.h1 
                                        className="text-2xl font-bold text-gray-900 mb-2"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.1 }}
                                    >
                                        Email vérifié avec succès !
                                    </motion.h1>
                                    <motion.p 
                                        className="text-gray-600 mb-8"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                    >
                                        Vous allez être redirigé vers votre tableau de bord...
                                    </motion.p>
                                    <motion.div 
                                        className="flex justify-center"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: 0.3 }}
                                    >
                                        <div className="h-2 w-24 bg-blue-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-linear-to-r from-blue-500 to-purple-500 rounded-full animate-progress" />
                                        </div>
                                    </motion.div>
                                </>
                            ) : (
                                <>
                                    <motion.div 
                                        className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-blue-50 mb-4"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                    >
                                        <Mail className="h-10 w-10 text-blue-500" />
                                    </motion.div>
                                    <motion.h1 
                                        className="text-2xl font-bold text-gray-900 mb-2"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.1 }}
                                    >
                                        Vérifiez votre boîte mail
                                    </motion.h1>
                                    <motion.p 
                                        className="text-gray-600 mb-8"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                    >
                                        Un email de vérification vous a été envoyé. Veuillez cliquer sur le lien pour vérifier votre adresse email.
                                    </motion.p>
                                    
                                    <motion.div 
                                        className="space-y-4"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: 0.3 }}
                                    >
                                        <motion.button
                                            onClick={async () => {
                                                if (!email) return
                                                try {
                                                    setIsLoading(true)
                                                    const { error } = await supabase.auth.resend({
                                                        type: 'signup',
                                                        email: email,
                                                        options: {
                                                            emailRedirectTo: `${window.location.origin}${AUTH_ROUTES.DASHBOARD}`,
                                                        },
                                                    })
                                                    
                                                    if (error) throw error
                                                    
                                                    toast.success('Email de vérification renvoyé avec succès')
                                                } catch (error: any) {
                                                    console.error("Erreur lors de l'envoi de l'email:", error)
                                                    toast.error(error.message || "Erreur lors de l'envoi de l'email de vérification")
                                                } finally {
                                                    setIsLoading(false)
                                                }
                                            }}
                                            disabled={isLoading}
                                            whileTap={{ scale: isLoading ? 1 : 0.98 }}
                                            whileHover={{ 
                                                scale: isLoading ? 1 : 1.02,
                                                boxShadow: '0 4px 20px -5px rgba(59, 130, 246, 0.5)'
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
                                                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                                                    <span>Envoi en cours...</span>
                                                </motion.div>
                                            ) : (
                                                <motion.span
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className="flex items-center"
                                                >
                                                    <span>Renvoyer l'email de vérification</span>
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
                                        
                                        <div className="pt-2 text-center">
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
                                    </motion.div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Mail className="w-8 h-8 text-blue-500" />
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    Vérifiez votre email
                </h1>

                <div className="space-y-4 text-gray-600 mb-8">
                    <p>
                        Nous avons envoyé un lien de vérification à votre adresse email.
                    </p>
                    
                    {error && (
                        <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm flex items-start">
                            <AlertCircle className="w-5 h-5 mr-2 mt-0.5 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <p className="text-sm text-gray-500">
                        Si vous ne voyez pas notre email, vérifiez votre dossier de courrier indésirable.
                    </p>
                </div>

                <div className="space-y-3">
                    <button
                        onClick={handleResendEmail}
                        className="w-full px-6 py-3 bg-white border-2 border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
                    >
                        Renvoyer l'email de vérification
                    </button>
                    
                    <p className="text-sm text-gray-500">
                        Vous avez déjà un compte ?{' '}
                        <Link href="/login" className="text-blue-600 hover:underline">
                            Se connecter
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
