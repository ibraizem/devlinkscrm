'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { toast } from 'react-hot-toast'

export interface OnboardingData {
    fullName: string
    organizationName: string
    industry: string
    teamSize: string
    email: string
}

export const initialOnboardingData: OnboardingData = {
    fullName: '',
    organizationName: '',
    industry: '',
    teamSize: '',
    email: ''
}

export function useOnboarding() {
    const [currentStep, setCurrentStep] = useState(1)
    const [data, setData] = useState<OnboardingData>(initialOnboardingData)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const nextStep = () => {
        setCurrentStep((prev) => Math.min(prev + 1, 5))
    }

    const prevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1))
    }

    const updateData = (newData: Partial<OnboardingData>) => {
        setData((prev) => ({ ...prev, ...newData }))
    }

    const generateTemporaryPassword = (): string => {
        // Génère un mot de passe sécurisé aléatoire
        const length = 16
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,.\/=-';
        let password = ''
        const values = new Uint32Array(length)
        window.crypto.getRandomValues(values)
        for (let i = 0; i < length; i++) {
            password += charset[values[i] % charset.length]
        }
        return password
    }

    const finishOnboarding = async () => {
        if (!data.email) {
            toast.error('Veuillez fournir une adresse email valide')
            return
        }

        setIsLoading(true)
        try {
            const password = generateTemporaryPassword()
            
            // 1. Enregistrer l'utilisateur dans Supabase Auth
            const { error: signUpError } = await supabase.auth.signUp({
                email: data.email,
                password: password,
                options: {
                    data: {
                        full_name: data.fullName,
                        organization_name: data.organizationName,
                        industry: data.industry,
                        team_size: data.teamSize,
                    },
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                },
            })

            if (signUpError) {
                console.error('Erreur d\'inscription:', signUpError)
                throw signUpError
            }

            // 2. Rediriger vers la page de configuration du mot de passe
            window.location.href = `${window.location.origin}/auth/reset-password`

        } catch (error) {
            console.error('Erreur lors de l\'inscription:', error)
            toast.error('Une erreur est survenue lors de l\'inscription. Veuillez réessayer.')
        } finally {
            setIsLoading(false)
        }
    }

    return {
        currentStep,
        data,
        nextStep,
        prevStep,
        updateData,
        finishOnboarding,
        isLoading,
    }
}
