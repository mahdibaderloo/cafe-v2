import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { AdminStore } from "../types/dashboard.type";

export const useAdminStore = create<AdminStore>()(
  persist(
    (set) => ({
      admin: null,
      isAuthenticated: false,

      setAdmin: (admin) =>
        set({
          admin,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          admin: null,
          isAuthenticated: false,
        }),

      updateAdmin: (data) =>
        set((state) => ({
          admin: state.admin ? { ...state.admin, ...data } : null,
        })),
    }),
    {
      name: "liilo-admin",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
