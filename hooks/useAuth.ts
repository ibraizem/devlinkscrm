import React, { useState, useEffect, useContext, createContext, ReactNode, FC } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { 
  secureSignIn as login, 
  secureSignOut as logout,
  resetPassword
} from '../services/authService';
import { supabase } from '@/lib/supabase/client';

type Profile = any;
type Organization = any;
type UserRole = 'admin' | 'member';

// Mock des fonctions non implémentées
const authService = {
  getUserProfile: async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    return { data, error };
  },
  
  getOrganization: async (orgId: string) => {
    const { data, error } = await supabase
      .from('organizations')
      .select('*')
      .eq('id', orgId)
      .single();
    return { data, error };
  },
  
  getSession: async () => {
    const { data, error } = await supabase.auth.getSession();
    return { data, error };
  },
  
  updateUserRole: async (memberId: string, newRole: UserRole) => {
    const { data, error } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('id', memberId)
      .select()
      .single();
    return { data, error };
  },
  
  registerUser: async (email: string, password: string, fullName?: string, organizationName?: string) => {
    // Créer l'utilisateur
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName || '',
        },
      },
    });

    if (signUpError) return { data: null, error: signUpError };
    
    // Créer l'organisation si nécessaire
    let organizationId: string | null = null;
    if (organizationName) {
      const { data: orgData, error: orgError } = await supabase
        .from('organizations')
        .insert([{ name: organizationName }])
        .select()
        .single();
        
      if (orgError) return { data: null, error: orgError };
      organizationId = orgData.id;
    }

    // Mettre à jour le profil utilisateur
    if (authData.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: fullName || '',
          organization_id: organizationId,
          role: 'admin'
        })
        .eq('id', authData.user.id);
        
      if (profileError) return { data: null, error: profileError };
    }

    return { data: authData, error: null };
  },
  
  createMember: async (email: string, password: string, fullName: string, role: UserRole) => {
    // Créer l'utilisateur
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (signUpError) return { data: null, error: signUpError };
    
    // Récupérer l'organisation de l'utilisateur actuel
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return { data: null, error: new Error('Non authentifié') };
    
    const { data: profileData } = await authService.getUserProfile(session.user.id);
    if (!profileData?.organization_id) {
      return { data: null, error: new Error('Vous devez appartenir à une organisation pour ajouter des membres') };
    }
    
    // Mettre à jour le profil du nouveau membre
    if (authData.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          organization_id: profileData.organization_id,
          role
        })
        .eq('id', authData.user.id);
        
      if (profileError) return { data: null, error: profileError };
    }

    return { data: authData, error: null };
  },
  
  forgotPassword: async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
    return { data, error };
  }
};

// Type pour la réponse de réinitialisation du mot de passe
interface ResetPasswordResponse {
  data: { user: User | null } | null;
  error: Error | null;
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  organization: Organization | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<any>;
  register: (email: string, password: string, fullName?: string, organizationName?: string) => Promise<any>;
  createMember: (email: string, password: string, fullName: string, role: UserRole) => Promise<any>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<any>;
  resetPassword: (password: string) => Promise<any>;
  updateMemberRole: (memberId: string, newRole: UserRole) => Promise<any>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfileAndOrg = async (userId: string) => {
    const { data: profileData } = await authService.getUserProfile(userId);
    if (profileData) {
      setProfile(profileData);
      if (profileData.organization_id) {
        const { data: orgData } = await authService.getOrganization(profileData.organization_id);
        setOrganization(orgData);
      }
    }
  };

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      setLoading(true);
      const { data } = await authService.getSession();
      if (data?.session) {
        setSession(data.session);
        setUser(data.session.user);
        await fetchProfileAndOrg(data.session.user.id);
      }
      setLoading(false);
    };

    getInitialSession();

    // Gérer les changements de session
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: string, newSession: Session | null) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);
        
        if (newSession?.user) {
          await fetchProfileAndOrg(newSession.user.id);
        } else {
          setProfile(null);
          setOrganization(null);
        }
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const loginUser = async (email: string, password: string) => {
    return login(email, password);
  };

  const register = async (email: string, password: string, fullName?: string, organizationName?: string) => {
    return authService.registerUser(email, password, fullName, organizationName);
  };

  const createMember = async (email: string, password: string, fullName: string, role: UserRole) => {
    return authService.createMember(email, password, fullName, role);
  };

  const logout = async () => {
    await logout();
    setSession(null);
    setUser(null);
    setProfile(null);
    setOrganization(null);
  };

  const forgotPassword = async (email: string) => {
    return authService.forgotPassword(email);
  };

  const resetUserPassword = async (password: string): Promise<ResetPasswordResponse> => {
    try {
      // Appel direct à la fonction resetPassword de authService
      const userData = await resetPassword(password);
      
      // Si on arrive ici, c'est que la réinitialisation a réussi
      // car resetPassword lance une exception en cas d'erreur
      setSession(null);
      setUser(null);
      setProfile(null);
      setOrganization(null);
      
      return { 
        data: { 
          user: userData?.user || null
        }, 
        error: null 
      };
      
    } catch (error) {
      return { 
        data: null, 
        error: error instanceof Error ? error : new Error('Une erreur inattendue est survenue') 
      };
    }
  };

  const updateMemberRole = async (memberId: string, newRole: UserRole) => {
    return authService.updateUserRole(memberId, newRole);
  };

  const contextValue: AuthContextType = {
    session,
    user,
    profile,
    organization,
    loading,
    login: loginUser,
    register,
    createMember,
    logout,
    forgotPassword,
    resetPassword: resetUserPassword,
    updateMemberRole
  };

  return React.createElement(
    AuthContext.Provider,
    { value: contextValue },
    children
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
