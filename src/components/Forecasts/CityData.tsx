import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { Weather } from "./Forecasts";

type CityDataProps = {
  weather?: Weather;
};

const CityData: FC<CityDataProps> = ({ weather }) => {
  if (!weather) {
    return null;
  }
  return (
    <Box>
      <Typography>city: {weather?.city}</Typography>
      <Typography>precipitation: {weather?.precipitation}</Typography>
      <Typography>temperature: {weather?.temperature}</Typography>
      <Typography>wind speed: {weather?.windSpeed}</Typography>
      <Typography>summary: {weather?.summary}</Typography>
    </Box>
  );
};

export default CityData;
