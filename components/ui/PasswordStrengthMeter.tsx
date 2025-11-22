'use client';

import { useEffect, useState } from 'react';
import { Check, X, Eye, EyeOff } from 'lucide-react';

type PasswordStrengthMeterProps = {
  password: string;
  minLength?: number;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  className?: string;
};

export function PasswordStrengthMeter({ 
  password, 
  minLength = 8, 
  showPassword = false, 
  onTogglePassword,
  className = '' 
}: PasswordStrengthMeterProps) {
  const [strength, setStrength] = useState<{
    score: number;
    requirements: Array<{ text: string; valid: boolean }>;
  }>({ score: 0, requirements: [] });

  useEffect(() => {
    const requirements = [
      {
        text: `Au moins ${minLength} caractères`,
        valid: password.length >= minLength,
      },
      {
        text: 'Contient une majuscule (A-Z)',
        valid: /[A-Z]/.test(password),
      },
      {
        text: 'Contient une minuscule (a-z)',
        valid: /[a-z]/.test(password),
      },
      {
        text: 'Contient un chiffre (0-9)',
        valid: /[0-9]/.test(password),
      },
      {
        text: 'Contient un caractère spécial (!@#$%^&*)',
        valid: /[+-/!@#$%^&*(),.?":{}|<>]/.test(password),
      },
    ];

    const score = requirements.filter((req) => req.valid).length;
    
    setStrength({
      score,
      requirements,
    });
  }, [password, minLength]);

  const getStrengthColor = (score: number) => {
    if (score <= 1) return 'bg-red-500';
    if (score <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthText = (score: number) => {
    if (score <= 1) return 'Faible';
    if (score <= 3) return 'Moyen';
    return 'Fort';
  };

  return (
    <div className={`w-full space-y-3 mt-2 ${className}`}>
      {/* Toggle password visibility */}
      {onTogglePassword && (
        <div className="flex justify-end mb-1">
          <button
            type="button"
            onClick={onTogglePassword}
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
            aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
          >
            {showPassword ? (
              <>
                <EyeOff className="w-4 h-4 mr-1" />
                <span>Masquer</span>
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 mr-1" />
                <span>Afficher</span>
              </>
            )}
          </button>
        </div>
      )}
      <div className="flex items-center justify-between mb-1">
        <div className="text-sm font-medium text-gray-700">
          Force du mot de passe:{' '}
          <span
            className={`font-semibold ${
              strength.score <= 1 ? 'text-red-600' : strength.score <= 3 ? 'text-yellow-600' : 'text-green-600'
            }`}
          >
            {getStrengthText(strength.score)}
          </span>
        </div>
        <div className="text-xs text-gray-500">
          {strength.score}/{strength.requirements.length}
        </div>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(strength.score)}`}
          style={{
            width: `${(strength.score / strength.requirements.length) * 100}%`,
          }}
        />
      </div>

      <div className="space-y-1.5 mt-3">
        <p className="text-xs font-medium text-gray-700">Exigences :</p>
        <ul className="space-y-1.5">
          {strength.requirements.map((req, index) => (
            <li key={index} className="flex items-center">
              {req.valid ? (
                <Check className="w-3.5 h-3.5 text-green-500 mr-2" />
              ) : (
                <X className="w-3.5 h-3.5 text-gray-400 mr-2" />
              )}
              <span
                className={`text-xs ${req.valid ? 'text-green-600' : 'text-gray-500'}`}
              >
                {req.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
