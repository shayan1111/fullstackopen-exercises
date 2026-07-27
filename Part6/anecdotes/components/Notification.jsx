import { useNotifications } from '../store/notificationStore'

const Notification = () => {
    const notification = useNotifications()


  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  if (notification != '') return (
      <div style={style}>
        { notification }
      </div>
    )
}

export default Notification