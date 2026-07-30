import { Alert } from "@mui/material";
import { useNotificationVariable } from "../store/notificationStore";

const Notification = () => {
  const { text, type } = useNotificationVariable()
  // If the notification is null, return nothing
  if (text === '' && type === '') {
    return null;
  }

  // Otherwise return an alert for it
  return (
    <Alert
      style={{ marginTop: 10, marginBottom: 10 }}
      severity={type}
    >
      {text}
    </Alert>
  );
};

export default Notification