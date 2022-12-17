import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { FC, useCallback, useEffect, useState } from "react";
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

const FETCH_INTERVAL = 15000;

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
        return setCities(data);
      }
    );
    return () => {
      controller.abort();
    };
  }, []);

  const [intervalId, setIntervalId] = useState<number>();

  useEffect(() => {
    return () => {
      intervalId && clearInterval(intervalId);
    };
  }, [intervalId]);

  const [currentCity, setCurrentCity] = useState();
  const [weather, setWeather] = useState<Weather>();

  const handleChange = useCallback(
    (_event: any, newValue: any) => {
      if (newValue) {
        setCurrentCity(newValue);
        const id = setInterval(() => {
          getRequest(`${Endpoint.WEATHERS}/${newValue}`, token).then(
            ({ data, error }) => {
              if (error) {
                return;
              }
              return setWeather(data);
            }
          );
        }, FETCH_INTERVAL);
        setIntervalId(id);
      }
    },
    [token]
  );

  const isLoading = currentCity !== weather?.city;

  return (
    <div>
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
