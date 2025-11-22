'use client';

import { motion } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';

type AuthCardProps = {
  title: string;
  subtitle: string | ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  highlightText?: string;
  rightComponent?: ReactNode;
  className?: string;
};

// Composant pour l'état de chargement
function LoadingSkeleton() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-linear-to-br from-blue-50 via-white to-blue-50">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8 sm:p-12">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Composant par défaut pour la partie droite
const DefaultRightContent = ({ highlightText }: { highlightText?: string }) => (
  <div className="h-full flex flex-col justify-center items-center text-center relative z-10 p-8">
    <div className="max-w-md mx-auto space-y-6">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6">
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z" />
        </svg>
      </div>
      <h2 className="text-3xl font-bold text-white mb-4">
        {highlightText || 'Gérez vos leads efficacement'}
      </h2>
      <p className="text-blue-100 text-lg">
        Une solution complète pour suivre, gérer et convertir vos prospects en clients fidèles.
      </p>
      
      <div className="flex justify-center space-x-2 mt-8">
        <div className="w-3 h-3 bg-white rounded-full"></div>
        <div className="w-3 h-3 bg-white/50 rounded-full"></div>
        <div className="w-3 h-3 bg-white/50 rounded-full"></div>
      </div>
    </div>
  </div>
);

export function AuthCard({ 
  title, 
  subtitle, 
  children, 
  footer,
  highlightText,
  rightComponent,
  className = ''
}: AuthCardProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler un chargement
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 p-8 sm:p-12 flex items-center justify-center bg-white">
        <div className={`w-full max-w-md ${className}`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
              {typeof subtitle === 'string' ? (
                <p className="mt-3 text-gray-600">{subtitle}</p>
              ) : (
                subtitle
              )}
            </div>
            
            <div className="space-y-4">
              {children}
            </div>

            {footer && (
              <div className="mt-6 text-center text-sm text-gray-500">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Right Side - Decorative */}
      <div className="hidden md:flex md:w-1/2 bg-linear-to-br from-blue-600 to-blue-800">
        {rightComponent || <DefaultRightContent highlightText={highlightText} />}
      </div>
    </div>
  );
}