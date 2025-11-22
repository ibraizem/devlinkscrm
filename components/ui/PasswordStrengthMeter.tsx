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
    <div className={`w-full space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="text-xs font-medium text-gray-600">
            Sécurité:
          </div>
          <div className="text-xs font-semibold">
            <span className={strength.score <= 1 ? 'text-red-600' : strength.score <= 3 ? 'text-yellow-600' : 'text-green-600'}>
              {getStrengthText(strength.score)}
            </span>
            <span className="text-gray-500 ml-1">
              ({strength.score}/{strength.requirements.length})
            </span>
          </div>
        </div>
        {onTogglePassword && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
            aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
          >
            {showPassword ? (
              <EyeOff className="w-3.5 h-3.5" />
            ) : (
              <Eye className="w-3.5 h-3.5" />
            )}
          </button>
        )}
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-1.5">
        <div
          className={`h-full rounded-full transition-all duration-300 ${getStrengthColor(strength.score)}`}
          style={{
            width: `${(strength.score / strength.requirements.length) * 100}%`,
          }}
        />
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-1 mt-1">
        {strength.requirements.map((req, index) => (
          <div key={index} className="flex items-center">
            {req.valid ? (
              <Check className="w-3 h-3 text-green-500 mr-1 shrink-0" />
            ) : (
              <X className="w-3 h-3 text-gray-300 mr-1 shrink-0" />
            )}
            <span className={`text-[10px] leading-tight ${req.valid ? 'text-green-600' : 'text-gray-400'}`}>
              {req.text.split('(')[0].trim()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
