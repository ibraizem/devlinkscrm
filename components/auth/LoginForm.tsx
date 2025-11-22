'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Mail, Lock, Loader2, AlertCircle } from 'lucide-react'
import { secureSignIn } from '@/services/authService'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { toast } from 'react-hot-toast'

export function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isLocked, setIsLocked] = useState(false)
    const [remainingTime, setRemainingTime] = useState<number | null>(null)
    
    // Vérifier si le compte est verrouillé
    useEffect(() => {
        if (error?.includes('Trop de tentatives')) {
            setIsLocked(true)
            const timeMatch = error.match(/(\d+) minute/)
            if (timeMatch) {
                const minutes = parseInt(timeMatch[1])
                setRemainingTime(minutes * 60) // Convertir en secondes
                
                // Mettre à jour le compte à rebours
                const timer = setInterval(() => {
                    setRemainingTime(prev => {
                        if (prev === null || prev <= 1) {
                            clearInterval(timer)
                            setIsLocked(false)
                            return null
                        }
                        return prev - 1
                    })
                }, 1000)
                
                return () => clearInterval(timer)
            }
        } else {
            setIsLocked(false)
        }
    }, [error])

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (isLocked) {
            toast.error(`Trop de tentatives. Veuillez réessayer dans ${remainingTime} secondes.`)
            return
        }
        
        setLoading(true)
        setError(null)

        try {
            await secureSignIn(email, password)
            // Redirection après connexion réussie
            window.location.href = '/dashboard'
        } catch (err: any) {
            setError(err.message || 'Une erreur est survenue lors de la connexion')
            
            // Afficher un toast d'erreur
            if (err.message.includes('Trop de tentatives')) {
                toast.error(err.message, { duration: 5000 })
            } else {
                toast.error('Identifiants incorrects. Veuillez réessayer.', { duration: 3000 })
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full max-w-md space-y-2 relative z-10">
            {/* Lien retour à l'accueil */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
            >
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors group"
                >
                    <svg
                        className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Retour à l'accueil
                </Link>
            </motion.div>

            {/* Header */}
            <header className="text-center space-y-1">
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-linear-to-br from-blue-500 to-indigo-600 mb-1.5 shadow-lg shadow-blue-500/30">
                    <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-linear-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                    Connexion
                </h1>
                <p className="text-xs text-gray-600">
                    Pas encore inscrit ?{' '}
                    <Link
                        href="/register"
                        className="font-semibold text-blue-600 hover:text-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                    >
                        Créer un compte →
                    </Link>
                </p>
            </header>

            {/* Login Card */}
            <section
                className="bg-linear-to-br from-white to-blue-50 rounded-2xl shadow-xl border border-blue-100 overflow-hidden"
                aria-label="Formulaire de connexion"
            >
                <div className="p-3.5 space-y-2.5">
                    <form onSubmit={handleLogin} className="space-y-3">
                        {/* Email */}
                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                    Adresse email
                                </Label>
                                {isLocked && remainingTime !== null && (
                                    <span className="text-xs text-red-600 flex items-center">
                                        <AlertCircle className="w-3.5 h-3.5 mr-1" />
                                        Réessayez dans {Math.ceil(remainingTime / 60)} min
                                    </span>
                                )}
                            </div>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="votre.email@exemple.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="pl-10 h-10 border-2 focus:border-blue-500 transition-colors bg-white"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                                    Mot de passe
                                </Label>
                                <Link
                                    href="/auth/forgot-password"
                                    className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline"
                                >
                                    Mot de passe oublié ?
                                </Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="pl-10 h-10 border-2 focus:border-blue-500 transition-colors bg-white"
                                />
                            </div>
                        </div>

                        {/* Error message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-2.5 bg-red-50 border border-red-200 rounded-lg"
                            >
                                <p className="text-xs text-red-600">{error}</p>
                            </motion.div>
                        )}

                        {/* Submit button */}
                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                            disabled={loading || isLocked}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Connexion...
                                </>
                            ) : isLocked ? (
                                'Compte temporairement bloqué'
                            ) : (
                                'Se connecter'
                            )}
                        </Button>
                    </form>
                </div>
            </section>

            {/* Privacy Notice */}
            <footer className="text-[9px] text-center text-gray-500 px-4 py-0.5">
                En continuant, vous acceptez nos{' '}
                <a
                    href="#"
                    className="underline hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                >
                    conditions d'utilisation
                </a>
                {' '}et notre{' '}
                <a
                    href="#"
                    className="underline hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                >
                    politique de confidentialité
                </a>.
            </footer>
        </div>
    )
}
