import { Box, Button, TextField } from "@mui/material";
import { FC, useCallback, useRef } from "react";
import { Endpoint, postRequest } from "../../services/requests";

type LoginProps = {
  onLogin: (token: string) => void;
};

const Login: FC<LoginProps> = ({ onLogin }) => {
  const formRef = useRef<any>();

  const handleClick = useCallback(async () => {
    if (formRef?.current) {
      const { username, password } = formRef.current;
      const { data, error } = await postRequest(
        { password: password.value, username: username.value },
        Endpoint.AUTHORIZE
      );
      if (error) {
        return;
      }
      onLogin(data?.token);
    }
  }, [onLogin]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <form ref={formRef}>
        <TextField name="username" label="Username" variant="outlined" />
        <Box mb={2} mt={2}>
          <TextField
            name="password"
            type="password"
            label="Password"
            variant="outlined"
          />
        </Box>
      </form>
      <Button onClick={handleClick} variant="contained">
        Login
      </Button>
    </Box>
  );
};

export default Login;
