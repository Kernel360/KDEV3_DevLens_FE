import { create } from "zustand";
import type { LinkResponse } from "@/lib/api/generated/main/models";

interface LinkStore {
  links: LinkResponse[];
  setLinks: (links: LinkResponse[]) => void;
  addLink: (link: LinkResponse) => void;
  removeLink: (linkId: number) => void;
  reset: () => void;
}

export const useLinkStore = create<LinkStore>((set) => ({
  links: [],
  setLinks: (links) => set({ links }),
  addLink: (link) =>
    set((state) => ({
      links: [...state.links, link],
    })),
  removeLink: (linkId) =>
    set((state) => ({
      links: state.links.filter((link) => link.id !== linkId),
    })),
  reset: () => set({ links: [] }),
}));
