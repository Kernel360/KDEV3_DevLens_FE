import { create } from "zustand";

interface AuthorizationState {
  authorization: string | null;
  setAuthorization: (auth: string) => void;
}

export const useAuthorizationStore = create<AuthorizationState>((set) => ({
  authorization: null,
  setAuthorization: (auth) => set({ authorization: auth }),
}));
