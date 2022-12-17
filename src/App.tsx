import { useCallback, useState } from "react";
import { createTheme, ThemeProvider, Paper, Box, Button } from "@mui/material";
import Forecasts from "./components/Forecasts";
import Login from "./components/Login";
import { getAuthToken } from "./services/utils";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  // TODO: add router
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [token, setToken] = useState(getAuthToken());

  const handleLogin = async (token: string) => {
    if (token) {
      setIsUserLoggedIn(true);
      setToken(token);
    }
  };

  const handleLogout = () => {
    setIsUserLoggedIn(false);
    setToken(undefined);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Paper square={true}>
        <Box sx={{ height: "100vh" }}>
          <div>
            {isUserLoggedIn && token ? (
              <>
                <Button onClick={handleLogout}>Logout</Button>
                <Forecasts token={token} />
              </>
            ) : (
              <Login onLogin={handleLogin} />
            )}
          </div>
        </Box>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
