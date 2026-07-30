import { create } from "zustand";

export const useUserStore = create(set => ({
    user: null,
    actions: {
        setUser: (userObject) => set(({ user: userObject })),
        logout: () => set(({ user: null }))
    }
}))

export const useUser = () => useUserStore(state => state.user)
export const useUserSetUser = () => useUserStore(state => state.actions.setUser)
export const useUserLogout = () => useUserStore(state => state.actions.logout)