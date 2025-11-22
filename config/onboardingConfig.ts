import { ComponentType } from 'react'
import { Step1 } from '@/components/auth/Step1'
import { Step2 } from '@/components/auth/Step2'
import { Step3 } from '@/components/auth/Step3'
import { Step4 } from '@/components/auth/Step4'
import { Step5 } from '@/components/auth/Step5'

import AppointementsCard from '@/components/auth/AppointementsCard'
import CampaignsCard from '@/components/auth/CampaignsCard'
import FilesCard from '@/components/auth/FilesCard'
import LeadsCard from '@/components/auth/LeadsCard'
import IntegrationsCard from '@/components/auth/IntegrationsCard'

import type { OnboardingData } from '@/hooks/useOnboarding'

export interface StepConfig {
    id: number
    title: string
    description: string
    StepComponent: ComponentType<{
        data: OnboardingData
        onNext: () => void
        onBack?: () => void
        onChange: (d: Partial<OnboardingData>) => void
        onFinish?: () => void
        isLoading?: boolean
    }>
    SectionComponent: ComponentType
}

export const onboardingSteps: StepConfig[] = [
    {
        id: 1,
        title: 'Informations personnelles',
        description: 'Commencez votre parcours',
        StepComponent: Step1,
        SectionComponent: AppointementsCard,
    },
    {
        id: 2,
        title: 'Votre organisation',
        description: 'Parlez-nous de votre entreprise',
        StepComponent: Step2,
        SectionComponent: CampaignsCard,
    },
    {
        id: 3,
        title: 'Secteur d\'activité',
        description: 'Votre domaine d\'expertise',
        StepComponent: Step3,
        SectionComponent: FilesCard,
    },
    {
        id: 4,
        title: 'Taille de l\'équipe',
        description: 'Combien êtes-vous ?',
        StepComponent: Step4,
        SectionComponent: LeadsCard,
    },
    {
        id: 5,
        title: 'Finalisation',
        description: 'Dernière étape',
        StepComponent: Step5,
        SectionComponent: IntegrationsCard,
    },
]
