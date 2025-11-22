import React, { useState, useEffect, useContext, createContext, ReactNode, FC } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { AuthService, Profile, Organization, UserRole } from '../services/authService';

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
    const { data: profileData } = await AuthService.getUserProfile(userId);
    if (profileData) {
      setProfile(profileData);
      if (profileData.organization_id) {
        const { data: orgData } = await AuthService.getOrganization(profileData.organization_id);
        setOrganization(orgData);
      }
    }
  };

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      setLoading(true);
      const { data } = await AuthService.getSession();
      if (data?.session) {
        setSession(data.session);
        setUser(data.session.user);
        await fetchProfileAndOrg(data.session.user.id);
      }
      setLoading(false);
    };

    getInitialSession();

    // Subscribe to auth changes
    const { data } = AuthService.onAuthStateChange(async (newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
      if (newSession?.user) {
        await fetchProfileAndOrg(newSession.user.id);
      } else {
        setProfile(null);
        setOrganization(null);
      }
    });

    return () => {
      data?.subscription?.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    const { data, error } = await AuthService.login({ email, password });
    if (!error && data?.session) {
      setSession(data.session);
      setUser(data.session.user);
      await fetchProfileAndOrg(data.session.user.id);
    }
    return { data, error };
  };

  const register = async (email: string, password: string, fullName?: string, organizationName?: string) => {
    if (!organizationName) {
      return { data: null, error: new Error('Organization name is required for new registration') };
    }
    const { data, error } = await AuthService.register({
      email,
      password,
      fullName,
      organizationName,
    });
    return { data, error };
  };

  const createMember = async (email: string, password: string, fullName: string, role: UserRole) => {
    if (!profile?.organization_id) {
      return { data: null, error: new Error('Current user is not associated with an organization') };
    }
    // Check if current user is admin
    if (profile.role !== 'admin' && profile.role !== 'superadmin') {
      return { data: null, error: new Error('Only admins can create members') };
    }

    const { data, error } = await AuthService.createMember({
      email,
      password,
      fullName,
      role,
      organizationId: profile.organization_id,
    });
    return { data, error };
  };

  const logout = async () => {
    await AuthService.logout();
    setSession(null);
    setUser(null);
    setProfile(null);
    setOrganization(null);
  };

  const forgotPassword = async (email: string) => {
    return await AuthService.forgotPassword(email);
  };

  const resetPassword = async (password: string) => {
    const { data, error } = await AuthService.resetPassword(password);
    if (!error) {
      setSession(null);
      setUser(null);
      setProfile(null);
      setOrganization(null);
    }
    return { data, error };
  };

  const updateMemberRole = async (memberId: string, newRole: UserRole) => {
    if (!profile?.organization_id) {
      return { data: null, error: new Error('Current user is not associated with an organization') };
    }
    if (profile.role !== 'admin' && profile.role !== 'superadmin') {
      return { data: null, error: new Error('Only admins can update roles') };
    }
    if (memberId === user?.id) {
      return { data: null, error: new Error('You cannot update your own role') };
    }

    // Ideally we should check if the member belongs to the same organization
    // But we'll rely on RLS or backend validation for now, or fetch the member first.
    // Let's fetch member to be safe.
    const { data: memberProfile } = await AuthService.getUserProfile(memberId);
    if (!memberProfile || memberProfile.organization_id !== profile.organization_id) {
      return { data: null, error: new Error('Member not found in your organization') };
    }

    return await AuthService.updateMemberRole(memberId, newRole);
  };

  const contextValue: AuthContextType = {
    session,
    user,
    profile,
    organization,
    loading,
    login,
    register,
    createMember,
    logout,
    forgotPassword,
    resetPassword,
    updateMemberRole,
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
