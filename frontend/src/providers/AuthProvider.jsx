import { useAuth } from "@clerk/react";
import { createContext, useEffect } from "react";
import { axiosInstance } from "../lib/axios";

const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const { getToken } = useAuth();

  useEffect(() => {
    //setup axios interceptor

    const interceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        try {
          const token = await getToken();
          if (token) config.headers.Authorization = `Bearer ${token}`;
        } catch (error) {
          if (
            error.message?.includes("auth") ||
            error.message?.includes("token")
          ) {
            toast.error("Authentication Issue. Please refresh thee page.");
          }
          console.log("Error getting Token:", error);
        }
        return config;
      },
      (error) => {
        console.error("Axios request error:", error);
        return Promise.reject(error);
      },
    );

    //Cleanup function to remove the interceptor , this is important to avoid memory leaks
    return () => axiosInstance.interceptors.request.eject(interceptor);
  }, [getToken]);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}
