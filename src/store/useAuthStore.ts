import { LoginResponse } from "@/types/auth";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: LoginResponse | null;
  setUser: (user: LoginResponse) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: "auth-storage",
    },
  ),
);
