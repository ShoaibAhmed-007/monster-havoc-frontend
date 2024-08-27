import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/navigation";
import { io, Socket } from "socket.io-client";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

type AppContextType = {
  userData: UserDataType | null;
  loginUser: (userData: UserDataType) => void;
  logoutUser: () => void;
  socket: React.MutableRefObject<Socket | null>;
  isConnected: boolean;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export type UserDataType = {
  _id: string;
  name: string;
  email: string;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [userData, setUserData] = useState<UserDataType | null>(null);

  // Socket ref
  const socket = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const token = Cookies.get("jwt");

    if (token) {
      getUserData();
    }
  }, []);

  useEffect(() => {
    if (userData) {
      socket.current = io(`${baseURL!}/`, {
        withCredentials: true,
        transports: ["websocket"],
      });

      socket.current.on("connect", () => {
        setIsConnected(true);
        console.log("Connected to the server");

        socket.current?.emit("register_player", userData._id);
      });

      socket.current.on("disconnect", () => {
        setIsConnected(false);
        console.log("Disconnected from the server");
      });

      return () => {
        socket.current?.close();
      };
    }
  }, [userData]);

  async function getUserData() {
    try {
      const response = await axios.get(`${baseURL}/api/getUserData`, {
        withCredentials: true,
      });

      const data = response.data;
      setUserData(data.userData);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.message);
        if (error.response) {
          console.error("Response error:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error in setup:", error.message);
        }
      } else {
        console.error("General error:", error);
      }
    }
  }

  function loginUser(userData: UserDataType) {
    if (userData) {
      setUserData(userData);
    }
  }

  const logoutUser = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/logout`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setUserData(null);
        router.push("/Pages/auth/login");
      } else {
        throw new Error("Failed to log out");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        // User Data
        userData: userData,
        loginUser: loginUser,
        logoutUser: logoutUser,
        // Socket data
        socket,
        isConnected,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
