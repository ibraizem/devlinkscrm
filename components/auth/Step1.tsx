'use client'

import { useState } from 'react'
import type { OnboardingData } from '@/hooks/useOnboarding'

export function Step1({
  data,
  onNext,
  onChange
}: {
  data: OnboardingData
  onNext: () => void
  onChange: (d: Partial<OnboardingData>) => void
}) {

  const [value, setValue] = useState(data.fullName)

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Votre nom complet
        </label>
        <input
          type="text"
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-gray-900 placeholder:text-gray-400"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ibrahim Izem"
          autoFocus
        />
      </div>

      <button
        onClick={() => {
          onChange({ fullName: value })
          onNext()
        }}
        disabled={!value.trim()}
        className="w-full mt-6 px-6 py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        Continuer →
      </button>
    </div>
  )
}
