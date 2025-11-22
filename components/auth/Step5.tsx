'use client'

import { useState, useEffect } from 'react'
import type { OnboardingData } from '@/hooks/useOnboarding'
import { Loader2 } from 'lucide-react'

export function Step5({
  data,
  onNext,
  onBack,
  onChange,
  onFinish,
  isLoading = false
}: {
  data: OnboardingData
  onNext: () => void
  onBack?: () => void
  onChange: (d: Partial<OnboardingData>) => void
  onFinish?: () => void
  isLoading?: boolean
}) {
  const [value, setValue] = useState(data.email)
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    setIsValid(emailRegex.test(value))
  }, [value])

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Votre email
        </label>
        <input
          type="email"
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            onChange({ email: e.target.value })
          }}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-gray-900 placeholder:text-gray-400"
          placeholder="email@exemple.com"
          autoFocus
        />
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={onBack}
          disabled={isLoading}
          className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all disabled:opacity-50"
        >
          ← Retour
        </button>

        <button
          onClick={onFinish}
          disabled={!isValid || isLoading}
          className="flex-1 px-6 py-3 bg-linear-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:from-green-700 hover:to-emerald-700 transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
              Inscription en cours...
            </>
          ) : (
            '✓ Terminer'
          )}
        </button>
      </div>
    </div>
  )
}
