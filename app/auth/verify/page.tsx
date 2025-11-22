'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Loader2, Mail, AlertCircle, CheckCircle2, ArrowLeft, RotateCw } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { cn } from '@/lib/utils'

import { supabase } from '@/lib/supabase/client'
import { AUTH_ROUTES } from '@/config/auth'
import AnimatedBackground from '@/components/landing/AnimatedBackground'
import AnimatedParticles from '@/components/landing/AnimatedParticles'

const RESEND_COOLDOWN = 60 // secondes

function VerifyEmailContent() {
    const [isLoading, setIsLoading] = useState(true)
    const [isVerified, setIsVerified] = useState(false)
    const [email, setEmail] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const [isResending, setIsResending] = useState(false)
    const [resendCooldown, setResendCooldown] = useState(0)

    const router = useRouter()
    const searchParams = useSearchParams()
    const isSignupFlow = searchParams.get('type') === 'signup'

    useEffect(() => {
        const checkVerification = async () => {
            try {
                const { data: { session }, error: sessionError } = await supabase.auth.getSession()
                
                if (sessionError) throw sessionError
                if (!session) {
                    if (isSignupFlow) return
                    router.push(AUTH_ROUTES.LOGIN)
                    return
                }

                if (session.user.email) {
                    setEmail(session.user.email)
                }

                if (session.user.email_confirmed_at) {
                    setIsVerified(true)
                    setTimeout(() => {
                        router.push(AUTH_ROUTES.DASHBOARD)
                    }, 3000)
                }
            } catch (error) {
                console.error('Erreur de vérification:', error)
                setError('Erreur lors de la vérification de votre email')
            } finally {
                setIsLoading(false)
            }
        }

        checkVerification()
        const interval = setInterval(checkVerification, 5000)
        return () => clearInterval(interval)
    }, [router, isSignupFlow])

    useEffect(() => {
        if (resendCooldown > 0) {
            const timer = setTimeout(() => {
                setResendCooldown(prev => prev - 1)
            }, 1000)
            return () => clearTimeout(timer)
        }
    }, [resendCooldown])

    const handleResendEmail = async () => {
        if (resendCooldown > 0) return
        
        setIsResending(true)
        setError(null)
        
        try {
            const { error } = await supabase.auth.resend({
                type: 'signup',
                email,
                options: {
                    emailRedirectTo: `${window.location.origin}${AUTH_ROUTES.VERIFY_EMAIL}?type=signup`,
                },
            })

            if (error) throw error

            setResendCooldown(RESEND_COOLDOWN)
            toast.success('Email de vérification envoyé !')
            
        } catch (err) {
            console.error('Erreur:', err)
            setError("Erreur lors de l'envoi de l'email")
            toast.error("Erreur lors de l'envoi de l'email")
        } finally {
            setIsResending(false)
        }
    }

    if (isLoading) {
        return (
            <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
                <AnimatedBackground />
                <AnimatedParticles />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10 bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-xl text-center"
                >
                    <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto" />
                    <p className="mt-4 text-gray-600">Vérification en cours...</p>
                </motion.div>
            </div>
        )
    }

    if (isVerified) {
        return (
            <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
                <AnimatedBackground />
                <AnimatedParticles />
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-8 text-center"
                >
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </motion.div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Email vérifié avec succès !
                    </h1>
                    <p className="text-gray-600 mb-8">
                        Vous allez être redirigé vers votre tableau de bord...
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <motion.div 
                            className="bg-green-500 h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 3, ease: 'linear' }}
                        />
                    </div>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
            <AnimatedBackground />
            <AnimatedParticles />
            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-md"
            >
                <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-blue-100">
                    <div className="p-8 text-center">
                        <motion.div 
                            className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                            <Mail className="w-10 h-10 text-blue-500" />
                        </motion.div>
                        
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            Vérifiez votre boîte mail
                        </h1>
                        
                        <p className="text-gray-600 mb-6">
                            Un lien de vérification a été envoyé à <span className="font-medium text-blue-600">{email}</span>.
                            Cliquez sur le lien pour activer votre compte.
                        </p>

                        {error && (
                            <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-red-50 border-l-4 border-red-400 p-4 rounded mb-6 text-left"
                            >
                                <div className="flex items-start">
                                    <AlertCircle className="h-5 w-5 text-red-400 mr-2 shrink-0 mt-0.5" />
                                    <p className="text-sm text-red-700">{error}</p>
                                </div>
                            </motion.div>
                        )}

                        <div className="space-y-4">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleResendEmail}
                                disabled={isResending || resendCooldown > 0}
                                className={cn(
                                    'w-full flex items-center justify-center px-4 py-3 text-white font-medium rounded-lg shadow-sm',
                                    'transition-all duration-200',
                                    'bg-blue-600 hover:bg-blue-700',
                                    'disabled:opacity-70 disabled:cursor-not-allowed',
                                    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                                )}
                            >
                                {isResending ? (
                                    <>
                                        <Loader2 className="animate-spin mr-2 h-5 w-5" />
                                        Envoi en cours...
                                    </>
                                ) : (
                                    <>
                                        <RotateCw className={cn("mr-2 h-5 w-5", resendCooldown > 0 && 'animate-spin')} />
                                        {resendCooldown > 0 
                                            ? `Renvoyer (${resendCooldown}s)` 
                                            : "Renvoyer l'email de vérification"}
                                    </>
                                )}
                            </motion.button>

                            <p className="text-sm text-gray-500">
                                Vous n'avez pas reçu l'email ? Vérifiez vos indésirables.
                            </p>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-100">
                            <Link 
                                href={AUTH_ROUTES.LOGIN}
                                className="inline-flex items-center text-blue-600 hover:text-blue-500 text-sm font-medium group transition-colors"
                            >
                                <ArrowLeft className="h-4 w-4 mr-1.5 transition-transform group-hover:-translate-x-0.5" />
                                Retour à la connexion
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default function VerifyEmail() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        }>
            <VerifyEmailContent />
        </Suspense>
    )
}