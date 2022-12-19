import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { ROUTE } from "../../routes";
import { Endpoint, ParsedError, postRequest } from "../../services/requests";

export const useLogin = (element: HTMLFormElement | null) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ParsedError>();

  const { setToken } = useAuth();
  const navigateTo = useNavigate();

  const handleLogin = async () => {
    if (!element) {
      return;
    }

    error && setError(undefined);
    setIsLoading(true);

    const { username, password } = element;
    const { data, error: _error } = await postRequest(
      { password: password.value, username: username.value },
      Endpoint.AUTHORIZE
    );

    if (_error) {
      setIsLoading(false);
      return setError(_error);
    }

    setToken?.((_token) => {
      navigateTo(ROUTE.Forecasts);
      return data.token;
    });

    setIsLoading(false);
  };

  const handleLogout = () => setToken?.(undefined);

  return { handleLogout, handleLogin, isLoading, error, setError };
};
