import { create } from "zustand";
import { persist } from "zustand/middleware";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../config/firebase";
import { userService } from "../services/userService";
import { User, AuthError } from "../types/auth";
import { toast } from "react-hot-toast";

interface ApiErrorResponse {
  response?: { status: number; data?: { error: string } };
  code?: string;
  message: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: AuthError | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: AuthError | null) => void;
  signInWithGoogle: (onSuccess?: () => void) => Promise<void>;
  signOut: (onSuccess?: () => void) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      error: null,
      isAuthenticated: false,
       supabaseUserId: null,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      signInWithGoogle: async (onSuccess) => {
        const { setLoading, setUser, setError } = get();
        if (get().loading) return;
        setLoading(true);
        setError(null);

        try {
          const provider = new GoogleAuthProvider();
          provider.setCustomParameters({ prompt: "select_account" });
          const result = await signInWithPopup(auth, provider);
          const firebaseUser = result.user;

          if (!firebaseUser.email) {
            throw new Error("Email is required for registration");
          }

          const userData: Omit<User, "id"> = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            name: firebaseUser.displayName || firebaseUser.email.split("@")[0],
            username:
              firebaseUser.displayName?.toLowerCase().replace(/\s+/g, "_") ||
              `user_${Date.now()}`,
            avatar: firebaseUser.photoURL || "",
            fullName: firebaseUser.displayName || "",
          };

          try {
            const newUser = await userService.createUser(userData);
            setUser(newUser);
            toast.success("Successfully signed in");
            onSuccess?.();
          } catch (error: unknown) {
            const err = error as ApiErrorResponse;
            if (err.response?.status === 409) {
              const existingUser = await userService.getUser(firebaseUser.uid);
              setUser(existingUser);
              toast.success("Successfully signed in");
              onSuccess?.();
            } else {
              throw err;
            }
          }
        } catch (error: unknown) {
          const err = error as ApiErrorResponse;
          const authError: AuthError = {
            code: err.code || "unknown",
            message:
              err.response?.data?.error ||
              err.message ||
              "Authentication failed",
          };
          setError(authError);
          toast.error(authError.message);
        } finally {
          setLoading(false);
        }
      },
      signOut: async (onSuccess) => {
        const { setUser, setError } = get();
        try {
          await auth.signOut();
          setUser(null);
          toast.success("Successfully signed out");
          onSuccess?.();
        } catch (error: unknown) {
          const err = error as ApiErrorResponse;
          const authError: AuthError = {
            code: err.code || "unknown",
            message: err.message || "Failed to sign out",
          };
          setError(authError);
          toast.error(authError.message);
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
