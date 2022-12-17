import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { Endpoint, getRequest } from "../../services/requests";
import { getQueryParams } from "../../services/utils";
import CityData from "./CityData";

export type Weather = {
  city: string;
  precipitation: number;
  summary: "string";
  temperature: number;
  windSpeed: number;
};

type ForecastsProps = {
  token: string;
};

const Forecasts: FC<ForecastsProps> = ({ token }) => {
  const [cities, setCities] = useState(getQueryParams("cities"));

  useEffect(() => {
    if (cities.length) {
      return;
    }
    const controller = new AbortController();
    getRequest(Endpoint.CITIES, token, controller.signal).then(
      ({ data, error }) => {
        if (error) {
          return;
        }
        setCities(data);
      }
    );
    return () => {
      controller.abort();
    };
  }, []);

  const inputRef = useRef();
  const [currentCity, setCurrentCity] = useState();
  const [weather, setWeather] = useState<Weather>();

  const handleChange = useCallback(
    (_event: any, newValue: any) => {
      if (newValue) {
        setCurrentCity(newValue);
        getRequest(`${Endpoint.WEATHERS}/${newValue}`, token).then(
          ({ data, error }) => {
            setWeather(data);
          }
        );
      }
    },
    [token]
  );

  const isLoading = currentCity !== weather?.city;

  return (
    <div>
      <Autocomplete
        ref={inputRef}
        options={cities}
        renderInput={(params) => <TextField {...params} label="City" />}
        onChange={handleChange}
      />
      {!isLoading ? (
        weather ? (
          <CityData weather={weather} />
        ) : null
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default Forecasts;
