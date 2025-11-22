/**
 * Configuration de l'authentification
 * Contient les constantes et configurations pour les flux d'authentification
 */

export const AUTH_ROUTES = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  REGISTER_VERIFY: '/auth/register/verify',
  DASHBOARD: '/dashboard',
} as const;

export const SECURITY_CONFIG = {
  // Configuration pour la force brute
  MAX_LOGIN_ATTEMPTS: parseInt(process.env.NEXT_PUBLIC_MAX_LOGIN_ATTEMPTS || '5', 10),
  LOCKOUT_DURATION: parseInt(process.env.NEXT_PUBLIC_LOCKOUT_DURATION_MINUTES || '15', 10) * 60 * 1000, // en millisecondes
  
  // Configuration pour la validation des mots de passe
  PASSWORD: {
    MIN_LENGTH: parseInt(process.env.NEXT_PUBLIC_PASSWORD_MIN_LENGTH || '12', 10),
    REQUIREMENTS: {
      hasUppercase: /[A-Z]/,
      hasLowercase: /[a-z]/,
      hasNumber: /[0-9]/,
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/,
    },
  },
} as const;

export const ANIMATION_CONFIG = {
  // Configuration pour les animations de fond
  GRID_SIZE: 64, // Taille de la grille en pixels
  PARTICLES_COUNT: 40, // Nombre de particules flottantes
  SHAPES_COUNT: 5, // Nombre de formes géométriques flottantes
  
  // Durées d'animation (en secondes)
  DURATIONS: {
    PARTICLE: 20,
    SHAPE: 30,
    GRID: 60,
  },
} as const;
