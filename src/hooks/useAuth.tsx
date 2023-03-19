import { useContext, useDebugValue, useEffect } from "react";
import { AuthContext } from "../contexts/AuthProvider";

const useAuth = () => {
  const { auth, setAuth } = useContext<any>(AuthContext);
  useDebugValue(auth, (auth) => (auth?.user ? "Logged In" : "Logged Out"));

  // console.log("useAuth auth >>>", auth)

  useEffect(() => {
    const data = { ...window.localStorage };
    // console.log("useAuth data >>>", data);

    setAuth(data);
    // eslint-disable-next-line
  }, []);

  return useContext(AuthContext);
};

export default useAuth;
