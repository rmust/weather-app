import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { ROUTE } from "../../routes";
import { Endpoint, postRequest } from "../../services/requests";

export const useLogin = (element: HTMLFormElement | null) => {
  const [isLoading, setIsLoading] = useState(false);

  const { setToken } = useAuth();
  const navigateTo = useNavigate();

  const handleLogin = async () => {
    if (!element) {
      return;
    }

    setIsLoading(true);

    const { username, password } = element;
    const { data, error } = await postRequest(
      { password: password.value, username: username.value },
      Endpoint.AUTHORIZE
    );

    if (error) {
      return;
    }

    setToken((_token) => {
      navigateTo(ROUTE.Forecasts);
      return data.token;
    });

    setIsLoading(false);
  };

  const handleLogout = () => setToken(undefined);

  return { handleLogout, handleLogin, isLoading };
};
