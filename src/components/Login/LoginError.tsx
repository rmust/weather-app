import { FC } from "react";
import { Alert, Box } from "@mui/material";

type LoginErrorProps = {
  onClose: () => void;
  errorMessage?: string;
};

const LoginError: FC<LoginErrorProps> = ({ onClose, errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return (
    <Box mb={2} width="100%" sx={{ position: "fixed" }}>
      <Alert severity="error" onClose={onClose}>
        Login error: {errorMessage}
      </Alert>
    </Box>
  );
};

export default LoginError;
