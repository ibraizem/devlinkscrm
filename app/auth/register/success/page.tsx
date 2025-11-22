'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Mail, ArrowRight } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function RegistrationSuccess() {
    const searchParams = useSearchParams()
    const email = searchParams.get('email')

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center"
            >
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        >
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                                <CheckCircle2 className="w-12 h-12 text-green-500" />
                            </div>
                        </motion.div>
                        <motion.div
                            className="absolute -inset-2 bg-green-100 rounded-full opacity-0 animate-ping"
                            initial={{ opacity: 0.6 }}
                            animate={{ opacity: 0, scale: 1.8 }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                    </div>
                </div>

                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    Félicitations !
                </h1>

                <div className="space-y-4 text-gray-600 mb-8">
                    <p>Votre inscription a bien été prise en compte !</p>
                    
                    <div className="bg-blue-50 rounded-lg p-4 text-sm text-left">
                        <div className="flex items-start">
                            <Mail className="w-5 h-5 text-blue-500 mt-0.5 mr-3 shrink-0" />
                            <div>
                                <p className="font-medium">Vérifiez votre boîte mail</p>
                                <p className="text-blue-700 font-mono break-all">{email}</p>
                                <p className="mt-2">Nous vous avons envoyé un email de confirmation avec un lien pour activer votre compte.</p>
                            </div>
                        </div>
                    </div>

                    <p className="text-sm text-gray-500">
                        Si vous ne voyez pas notre email, vérifiez votre dossier de courrier indésirable.
                    </p>
                </div>

                <div className="space-y-3">
                    <Link
                        href="/login"
                        className="inline-flex items-center justify-center w-full px-6 py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                    >
                        Me connecter
                        <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                    
                    <p className="text-sm text-gray-500">
                        Vous pourrez vous connecter après avoir confirmé votre adresse email.
                    </p>
                </div>
            </motion.div>
        </div>
    )
}
