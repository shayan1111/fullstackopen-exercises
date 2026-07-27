import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
    }
});

export const { setNotification } = notificationSlice.actions

export const displayNotification = (message, duration = 5000) => {
  return dispatch => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(setNotification(''))
    }, duration)
  }
}

export default notificationSlice.reducer