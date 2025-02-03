import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LoginResponse } from "@/types/auth";

const INITIAL_USER: LoginResponse = {
  loginId: "",
  name: "",
  email: "",
  role: "",
  profileUrl: "",
  companyId: 0,
  companyName: "",
  department: "",
  position: "",
};

interface AuthState {
  user: LoginResponse; // null 대신 항상 객체 유지
  setUser: (user: LoginResponse) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: INITIAL_USER,
      setUser: (user) => set({ user }),
      logout: () => set({ user: INITIAL_USER }),
    }),
    {
      name: "auth-storage",
    },
  ),
);
