import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile, 
  type AuthError,
} from "firebase/auth";
import { GoogleAuthProvider ,} from "firebase/auth";
import { useState} from "react";
import { useAuth } from "reactfire";
import { useUserActions } from "./use-user-actions";

interface AuthActionsResponse {
  success: boolean;
  error: AuthError | null;
}

export const useAuthActions = () => {
  const {createOrUpdateUser} = useUserActions()
  const [loading, setLoading] = useState<boolean>(false);
  const auth = useAuth();

  const loginWithGoogle = async (): Promise<AuthActionsResponse> => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const data = await signInWithPopup(auth, provider);
      await createOrUpdateUser(data.user)      
      return {
        success: true,
        error: null,
      };
    } catch (error) {
      const AuthError = error as AuthError;
      return {
        success: false,
        error: AuthError,
      };
    } finally {
      setLoading(false);
    }
  };

  const login = async (data: {
    email: string;
    password: string;
  }): Promise<AuthActionsResponse> => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);      
      return {
        success: true,
        error: null,
      };
    } catch (error) {
      const authError = error as AuthError;
      return {
        success: false,
        error: authError,
      };
    } finally {
      setLoading(false);
    }
  };
    
  const register = async (data: {
    displayName: string;
    email: string;
    password: string;
  }): Promise<AuthActionsResponse> => {
    setLoading(true);
    try {
      const currentUser = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      if (currentUser.user) {
        await updateProfile(currentUser.user, {
          displayName: data.displayName,
        });
        await createOrUpdateUser(currentUser.user)
        await currentUser.user.reload();
      }
      return {
        success: true,
        error: null,
      };
    } catch (error) {
      const authError = error as AuthError;
      return {
        success: false,
        error: authError,
      };
    } finally {
      setLoading(false)
    }
  };

  const logout = async (): Promise<AuthActionsResponse> => {
    setLoading(true);
    try {
      await signOut(auth);
      window.location.href = "/auth/login";
      return {
        success: false,
        error: null,
      };
    } catch (error) {
      const authError = error as AuthError;
      return {
        success: true,
        error: authError,
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    loginWithGoogle,
    login,
    register,
    logout,
  };
};
