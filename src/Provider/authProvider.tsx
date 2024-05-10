import axios from "axios";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
// import jwt from "jsonwebtoken";

type AuthContextType = {
  token: string | null;
  setTokenFn: (newToken: string) => void;
};
const AuthContext = createContext<AuthContextType>({
  token: null,
  setTokenFn: () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState(localStorage.getItem("Artify-token"));
  const setTokenFn = (newToken: string) => {
    setToken(newToken);
  };
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["x-access-token"] = "Bearer" + token;
      // const decodedToken = jwt.decode(token, { complete: true });
      // console.log(decodedToken);
    } else {
      delete axios.defaults.headers.common["x-access-token"];
      localStorage.removeItem("Artify-token");
    }
  }, [token]);
  const contextValue = useMemo(
    () => ({
      token,
      setTokenFn,
    }),
    [token]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
