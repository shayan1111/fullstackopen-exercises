import { useContext } from 'react'
import NotificationContext from '../src/components/NotificationContext'

const useNotification = () => useContext(NotificationContext)

export default useNotification
