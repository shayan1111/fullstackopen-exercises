import { create } from "zustand";

export const useNotificationStore = create((set) => ({
    notification: '',
    actions: {
        // function for updating the notification
        setNotification: notification => set(() => ({ notification }))
    }
}))

export const useNotifications = () => useNotificationStore(state => state.notification)
export const useNotificationsActions = () => useNotificationStore(state => state.actions)