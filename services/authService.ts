import { supabase } from '@/lib/supabase/client';
import { toast } from 'react-hot-toast';

// Configuration de sécurité
const SECURITY_CONFIG = {
  // Configuration pour la force brute
  MAX_LOGIN_ATTEMPTS: parseInt(process.env.NEXT_PUBLIC_MAX_LOGIN_ATTEMPTS || '5', 10),
  LOCKOUT_DURATION: parseInt(process.env.NEXT_PUBLIC_LOCKOUT_DURATION_MINUTES || '15', 10) * 60 * 1000, // en millisecondes
  // Configuration pour la validation des mots de passe
  PASSWORD_MIN_LENGTH: parseInt(process.env.NEXT_PUBLIC_PASSWORD_MIN_LENGTH || '12', 10),
  PASSWORD_REQUIREMENTS: {
    hasUppercase: /[A-Z]/,
    hasLowercase: /[a-z]/,
    hasNumber: /[0-9]/,
    // Liste des caractères spéciaux acceptés: !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~
    hasSpecialChar: /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/,
  },
};

// Stockage local pour le suivi des tentatives de connexion
const loginAttempts = new Map<string, { attempts: number; lastAttempt: number }>();

/**
 * Valide la force d'un mot de passe selon les critères de sécurité
 * @param password Le mot de passe à valider
 * @returns Un objet avec la validité et un message d'erreur si nécessaire
 */
export const validatePassword = (password: string): { isValid: boolean; message?: string } => {
  if (password.length < SECURITY_CONFIG.PASSWORD_MIN_LENGTH) {
    return {
      isValid: false,
      message: `Le mot de passe doit contenir au moins ${SECURITY_CONFIG.PASSWORD_MIN_LENGTH} caractères`,
    };
  }

  const requirements = [
    { test: SECURITY_CONFIG.PASSWORD_REQUIREMENTS.hasUppercase, message: 'au moins une majuscule' },
    { test: SECURITY_CONFIG.PASSWORD_REQUIREMENTS.hasLowercase, message: 'au moins une minuscule' },
    { test: SECURITY_CONFIG.PASSWORD_REQUIREMENTS.hasNumber, message: 'au moins un chiffre' },
    { test: SECURITY_CONFIG.PASSWORD_REQUIREMENTS.hasSpecialChar, message: 'au moins un caractère spécial' },
  ];

  const failedRequirements = requirements.filter(({ test }) => !test.test(password));

  if (failedRequirements.length > 0) {
    return {
      isValid: false,
      message: `Le mot de passe doit contenir ${failedRequirements.map(r => r.message).join(', ')}`,
    };
  }

  return { isValid: true };
};

/**
 * Vérifie si une adresse email est verrouillée à cause de trop de tentatives
 * @param email L'email à vérifier
 * @returns Un objet indiquant si l'email est verrouillé et le temps restant
 */
const isAccountLocked = (email: string): { locked: boolean; remainingTime?: number } => {
  const attempt = loginAttempts.get(email);
  if (!attempt) return { locked: false };

  const now = Date.now();
  const timeSinceLastAttempt = now - attempt.lastAttempt;

  if (attempt.attempts >= SECURITY_CONFIG.MAX_LOGIN_ATTEMPTS) {
    if (timeSinceLastAttempt < SECURITY_CONFIG.LOCKOUT_DURATION) {
      return {
        locked: true,
        remainingTime: Math.ceil((SECURITY_CONFIG.LOCKOUT_DURATION - timeSinceLastAttempt) / 1000 / 60), // en minutes
      };
    } else {
      // Réinitialiser le compteur après la période de verrouillage
      loginAttempts.delete(email);
      return { locked: false };
    }
  }

  return { locked: false };
};

/**
 * Gère la connexion avec protection contre la force brute
 */
export const secureSignIn = async (email: string, password: string) => {
  // Vérifier si le compte est verrouillé
  const { locked, remainingTime } = isAccountLocked(email);
  if (locked) {
    throw new Error(`Trop de tentatives de connexion. Réessayez dans ${remainingTime} minutes.`);
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // Incrémenter le compteur d'échecs
      const attempt = loginAttempts.get(email) || { attempts: 0, lastAttempt: 0 };
      const now = Date.now();
      
      // Réinitialiser le compteur si la dernière tentative date de plus de 5 minutes
      if (now - attempt.lastAttempt > 5 * 60 * 1000) {
        attempt.attempts = 1;
      } else {
        attempt.attempts += 1;
      }
      
      attempt.lastAttempt = now;
      loginAttempts.set(email, attempt);

      // Calculer les tentatives restantes
      const remainingAttempts = SECURITY_CONFIG.MAX_LOGIN_ATTEMPTS - attempt.attempts;
      
      if (remainingAttempts > 0) {
        throw new Error(`Identifiants incorrects. ${remainingAttempts} tentative(s) restante(s).`);
      } else {
        throw new Error(`Trop de tentatives. Réessayez dans 15 minutes.`);
      }
    }

    // Réinitialiser le compteur en cas de succès
    loginAttempts.delete(email);
    return data;
  } catch (error) {
    console.error('Erreur de connexion sécurisée:', error);
    throw error;
  }
};

/**
 * Réinitialise le mot de passe avec validation
 * @param newPassword Le nouveau mot de passe
 * @param accessToken Le token d'accès pour la réinitialisation (optionnel)
 */
export const resetPassword = async (newPassword: string, accessToken?: string) => {
  // Valider le nouveau mot de passe
  const { isValid, message } = validatePassword(newPassword);
  if (!isValid) {
    throw new Error(message || 'Mot de passe invalide');
  }

  try {
    let result;
    
    if (accessToken) {
      // Si un token d'accès est fourni, l'utiliser pour la réinitialisation
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      
      if (error) throw error;
      result = data;
    } else {
      // Sinon, utiliser la session courante
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !sessionData?.session) {
        throw new Error('Aucune session active. Veuillez vous reconnecter.');
      }
      
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      
      if (error) throw error;
      result = data;
    }
    
    return result;
  } catch (error) {
    console.error('Erreur lors de la réinitialisation du mot de passe:', error);
    
    // Gestion des erreurs spécifiques
    if (error instanceof Error) {
      if (error.message.includes('AuthSessionMissingError')) {
        throw new Error('La session a expiré. Veuillez redémarrer le processus de réinitialisation.');
      }
      throw error;
    }
    
    throw new Error('Une erreur est survenue lors de la réinitialisation du mot de passe');
  }
};

/**
 * Déconnecte l'utilisateur et nettoie les données sensibles
 */
export const secureSignOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    // Nettoyer les données sensibles du stockage local
    localStorage.removeItem('supabase.auth.token');
  } catch (error) {
    console.error('Erreur lors de la déconnexion sécurisée:', error);
    throw error;
  }
};
