import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { FC, useState } from "react";
import { useLogin } from "./useLogin";

const Login: FC = () => {
  const [ref, setRef] = useState<HTMLFormElement | null>(null);
  const login = useLogin(ref);

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
      <form ref={setRef}>
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
      <Button onClick={login?.handleLogin} variant="contained">
        {login?.isLoading ? <CircularProgress size={24.5} /> : "Login"}
      </Button>
    </Box>
  );
};

export default Login;
