import {
  createContext,
  SetStateAction,
  Dispatch,
  useContext,
} from "react";

type AuthContextProps = {
  token?: string;
  setToken: Dispatch<SetStateAction<string | undefined>>;
};

export const AuthContext = createContext<AuthContextProps>({
  token: undefined,
  setToken: () => {},
});

export const useAuth = () => useContext(AuthContext);