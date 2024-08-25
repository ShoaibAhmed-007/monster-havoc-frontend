import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/navigation";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

type AppContextType = {
  userData: UserDataType | null;
  loginUser: (userData: UserDataType) => void;
  logoutUser: () => void;
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

  useEffect(() => {
    const token = Cookies.get("jwt");

    if (token) {
      getUserData();
    }
  }, []);

  async function getUserData() {
    try {
      const response = await axios.get(`${baseURL}/api/getUserData`, {
        withCredentials: true,
      });

      // No need to check for response.ok, as axios will throw an error for non-2xx status codes
      const data = response.data;

      // Optionally, you can log or use the data here

      setUserData(data.userData.user); // Return data if needed elsewhere
    } catch (error) {
      // Axios error object has more information about the error
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.message);
        // Optionally, handle different types of Axios errors here
        if (error.response) {
          // The request was made, and the server responded with a status code
          // outside the range of 2xx
          console.error("Response error:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received:", error.request);
        } else {
          // Something happened in setting up the request
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
      // Make a GET request to your logout endpoint
      const response = await axios.get(`${baseURL}/api/logout`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        // Successfully logged out, clear the user data and redirect to the login page

        setUserData(null); // Clear user data in your context
        router.push("/Pages/auth/login"); // Redirect to the login page
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
