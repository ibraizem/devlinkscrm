'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { toast } from 'react-hot-toast'
import { AUTH_ROUTES } from '@/config/auth'

export interface OnboardingData {
    fullName: string
    organizationName: string
    industry: string
    teamSize: string
    email: string
    password?: string
}

export const initialOnboardingData: OnboardingData = {
    fullName: '',
    organizationName: '',
    industry: '',
    teamSize: '',
    email: '',
    password: ''
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

    const generateTemporaryPassword = useCallback((): string => {
    try {
      // Utilisation de l'API Web Crypto pour une meilleure sécurité
      // Générer 36 octets (288 bits) pour avoir une bonne entropie
      const array = new Uint8Array(36)
      window.crypto.getRandomValues(array)
      
      // Convertir en chaîne base64 et échapper les caractères spéciaux
      const password = btoa(String.fromCharCode(...array))
        .replace(/[+\/]/g, '') // Enlever les caractères spéciaux
        .slice(0, 72) // S'assurer que le mot de passe ne dépasse pas 72 caractères
      
      return password
    } catch (error) {
      console.error('Erreur lors de la génération du mot de passe temporaire:', error)
      // Solution de secours avec une longueur limitée à 72 caractères
      return (Math.random().toString(36).slice(2) + Date.now().toString(36)).slice(0, 72)
    }
  }, [])

    const validateOnboardingData = (data: OnboardingData): { isValid: boolean; error?: string } => {
      if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        return { isValid: false, error: 'Veuillez fournir une adresse email valide' }
      }
      if (!data.fullName?.trim()) {
        return { isValid: false, error: 'Le nom complet est requis' }
      }
      if (!data.organizationName?.trim()) {
        return { isValid: false, error: 'Le nom de l\'organisation est requis' }
      }
      // Validation de la longueur du mot de passe s'il est fourni
      if (data.password && data.password.length > 72) {
        return { isValid: false, error: 'Le mot de passe ne peut pas dépasser 72 caractères' }
      }
      return { isValid: true }
    }

    const finishOnboarding = async () => {
      // Validation des données
      const { isValid, error: validationError } = validateOnboardingData(data)
      if (!isValid) {
        toast.error(validationError || 'Données de formulaire invalides')
        return
      }

      setIsLoading(true)
      
      try {
        const password = generateTemporaryPassword()
        const redirectUrl = `${window.location.origin}${AUTH_ROUTES.VERIFY_EMAIL}?type=signup`
        
        // 1. Enregistrer l'utilisateur dans Supabase Auth
        const { data: authData, error: signUpError } = await supabase.auth.signUp({
          email: data.email,
          password: password,
          options: {
            data: {
              full_name: data.fullName,
              organization_name: data.organizationName,
              industry: data.industry,
              team_size: data.teamSize,
              email_verified: false,
            },
            emailRedirectTo: redirectUrl,
          },
        })

        if (signUpError) {
          console.error('Erreur d\'inscription:', signUpError)
          // Gestion spécifique des erreurs courantes
          if (signUpError.message.includes('already registered')) {
            throw new Error('Cette adresse email est déjà utilisée. Veuillez vous connecter ou utiliser une autre adresse.')
          } else if (signUpError.message.includes('password')) {
            throw new Error('Le mot de passe ne respecte pas les exigences de sécurité')
          }
          throw signUpError
        }

        // 2. Rediriger vers la page de vérification d'email
        if (authData.user) {
          // Stocker temporairement les données de l'utilisateur pour la page suivante
          sessionStorage.setItem('tempUserData', JSON.stringify({
            email: data.email,
            fullName: data.fullName
          }))
          
          // Rediriger vers la page de vérification d'email
          window.location.href = redirectUrl
        }

      } catch (error) {
        console.error('Erreur lors de l\'inscription:', error)
        const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue lors de l\'inscription.'
        toast.error(errorMessage)
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
