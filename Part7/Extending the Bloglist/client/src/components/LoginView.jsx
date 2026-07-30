import { TextField, Button } from "@mui/material";

const LoginView = ({
  handleLogin,
  username,
  handleUsername,
  password,
  handlePassword,
}) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        {/* First the username */}
        <TextField
          variant="standard"
          label="Username"
          value={username}
          onChange={handleUsername}
        />
        <br></br>
        {/* Then the password */}
        <TextField
          variant="standard"
          label="Password"
          type="password"
          value={password}
          onChange={handlePassword}
        />
        <br></br>
        {/* And finally the button */}
        <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
          login
        </Button>
      </form>
    </div>
  );
};

export default LoginView;
