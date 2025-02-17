import { create } from "zustand";

interface AuthorizationState {
  authorization: string;
  setAuthorization: (auth: string) => void;
}

export const useAuthorizationStore = create<AuthorizationState>((set) => ({
  authorization: "",
  setAuthorization: (auth) => set({ authorization: auth }),
}));
