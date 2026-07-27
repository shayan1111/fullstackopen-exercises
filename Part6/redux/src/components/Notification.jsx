import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  // If the notification is empty, return null
  if (!notification || notification === '') return null

  // If it isn't, display the message instead
  return <div style={style}>
      { notification }
    </div>
}

export default Notification
