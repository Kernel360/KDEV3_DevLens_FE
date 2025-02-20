import { create } from "zustand";
import { persist } from "zustand/middleware";
import { APIResponseLoginResponse } from "@/lib/api/generated/main/models";

interface AuthState {
  user: APIResponseLoginResponse["data"] | null;
  setUser: (user: APIResponseLoginResponse["data"]) => void;
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
