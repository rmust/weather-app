import React, { FC, useState } from "react";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import ErrorToast from "../common/ErrorToast";
import { useLogin } from "./useLogin";

const Login: FC = () => {
  const [ref, setRef] = useState<HTMLFormElement | null>(null);
  const { isLoading, handleLogin, error, setError } = useLogin(ref);

  return (
    <Box>
      <ErrorToast
        onClose={() => setError(undefined)}
        errorMessage={error?.message}
      />
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
        <Button
          onClick={handleLogin}
          variant={isLoading ? "outlined" : "contained"}
        >
          {isLoading ? <CircularProgress size={24.5} /> : "Login"}
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
