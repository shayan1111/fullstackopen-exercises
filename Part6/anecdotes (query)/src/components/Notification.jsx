import NotificationContext from "./NotificationContext";
import useNotification from "../../hooks/useAnecdote";

const Notification = () => {
  const { notification } = useNotification();

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  // if (true) return null

  if (notification) return <div style={style}>{notification}</div>;
};

export default Notification;
