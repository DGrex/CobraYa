import { signInWithPopup, signOut, type AuthError } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";
import { useAuth } from "reactfire";

interface AuthActionsResponse {
  success: boolean;
  error: AuthError | null;
}

export const useAuthActions = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const auth = useAuth()

  const loginWithGoogle = async (): Promise<AuthActionsResponse> => {
    setLoading(true)
    try {
        const provider = new GoogleAuthProvider()
        const data = await signInWithPopup(auth,provider)
        console.log(data)
        return{
            success: true,
            error: null
        };

    } catch (error) {
        const AuthError = error as AuthError
        return{
            success: false,
            error: AuthError
        }
    } finally {
        setLoading(false)
    }
  };

  const logout = async (): Promise<AuthActionsResponse> => {
    setLoading(true)
    try {
      await signOut(auth)
      window.location.href = "/auth/login"
      return{
        success: false,
        error: null,
      }
    } catch (error) {
      const authError = error as AuthError
      return{
        success: true,
        error: authError
      }
    } finally{
      setLoading(false)
    }
  }
  

  return {
    loading, loginWithGoogle,logout
  };
};
