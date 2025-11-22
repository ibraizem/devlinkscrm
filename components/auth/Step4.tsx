'use client'

import { useState } from 'react'
import type { OnboardingData } from '@/hooks/useOnboarding'

export function Step4({
  data,
  onNext,
  onBack,
  onChange
}: {
  data: OnboardingData
  onNext: () => void
  onBack?: () => void
  onChange: (d: Partial<OnboardingData>) => void
}) {
  const [value, setValue] = useState(data.teamSize)

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Taille de votre équipe
        </label>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-gray-900 placeholder:text-gray-400"
          placeholder="1–5 | 5–20 | 20–50…"
          autoFocus
        />
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={onBack}
          className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all"
        >
          ← Retour
        </button>

        <button
          onClick={() => {
            onChange({ teamSize: value })
            onNext()
          }}
          disabled={!value.trim()}
          className="flex-1 px-6 py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          Continuer →
        </button>
      </div>
    </div>
  )
}
