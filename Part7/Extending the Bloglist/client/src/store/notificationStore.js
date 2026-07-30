import { create } from "zustand";

const useNotificationStore = create(set => ({
    variables: {
        text: '',
        type: '',
    },
    actions: {
        // Action for changing the notification
        setNotification: (messageText, messageType) => set((state) => ({
            variables: {
                ...state.variables,
                text: messageText,
                type: messageType
            }
        }))
    }
}))

export default useNotificationStore
export const useNotificationVariable = () => useNotificationStore(state => state.variables)
export const useNotificationSetNotification = () => useNotificationStore(state => state.actions.setNotification)