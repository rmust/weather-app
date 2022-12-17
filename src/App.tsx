import { createTheme, ThemeProvider, Paper, Box } from "@mui/material";
import { useCallback, useState } from "react";
import Forecasts from "./components/Forecasts";
import Login from "./components/Login";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  // TODO: add router
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const handleLogin = useCallback((name: string, password: string) => {
    console.log(name, password);
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <Paper square={true}>
        <Box sx={{ height: "100vh" }}>
          <div>
            {isUserLoggedIn ? <Forecasts /> : <Login onLogin={handleLogin} />}
          </div>
        </Box>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
