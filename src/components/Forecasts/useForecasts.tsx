import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { Endpoint, getRequest } from "../../services/requests";
import { getQueryParams } from "../../services/utils";

export type Weather = {
  city: string;
  precipitation: number;
  summary: "string";
  temperature: number;
  windSpeed: number;
};

const FETCH_INTERVAL = 15000;

export const useForecasts = () => {
  const { token } = useAuth();

  useEffect(() => {
    if (cities.length) {
      return;
    }
    const controller = new AbortController();
    getRequest(Endpoint.CITIES, token!, controller.signal).then(
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

  const [intervalId, setIntervalId] = useState<NodeJS.Timer>();

  useEffect(() => {
    return () => {
      intervalId && clearInterval(intervalId);
    };
  }, [intervalId]);

  const [cities, setCities] = useState(getQueryParams("cities"));
  const [currentCity, setCurrentCity] = useState();
  const [weather, setWeather] = useState<Weather>();

  const handleChange = useCallback(
    (_event: any, newValue: any) => {
      if (newValue) {
        setCurrentCity(newValue);
        const id = setInterval(() => {
          getRequest(`${Endpoint.WEATHERS}/${newValue}`, token!).then(
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

  return { handleChange, isLoading, cities, weather };
};
