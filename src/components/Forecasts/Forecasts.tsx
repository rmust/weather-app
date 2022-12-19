import { FC } from "react";
import {
  Autocomplete,
  Button,
  CircularProgress,
  TextField,
} from "@mui/material";
import { useLogin } from "../Login/useLogin";
import CityData from "./CityData";
import { useForecasts } from "./useForecasts";

const Forecasts: FC = () => {
  const { handleLogout } = useLogin(null);
  const { handleChange, isLoading, cities, weather } = useForecasts();

  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
      <Autocomplete
        options={cities}
        renderInput={(params) => <TextField {...params} label="City" />}
        onChange={handleChange}
      />
      {!isLoading ? <CityData weather={weather} /> : <CircularProgress />}
    </div>
  );
};

export default Forecasts;
