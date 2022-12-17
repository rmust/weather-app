import { Box, Button, TextField } from "@mui/material";
import { FC, useCallback, useRef, useState } from "react";

type LoginProps = {
  onLogin: (name: string, password: string) => void;
};

const Login: FC<LoginProps> = ({ onLogin }) => {
  const formRef = useRef<any>();
  const [hasError, setHasError] = useState(false);

  const handleSubmit = useCallback(() => {
    if (formRef?.current) {
      const { userName, password } = formRef.current;
      userName.value && password.value
        ? onLogin(userName.value, password.value)
        : setHasError(true);
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
        <TextField name="userName" label="Username" variant="outlined" />
        <Box mb={2} mt={2}>
          <TextField
            name="password"
            type="password"
            label="Password"
            variant="outlined"
          />
        </Box>
      </form>
      <Button onClick={handleSubmit} variant="contained">
        Login
      </Button>
    </Box>
  );
};

export default Login;