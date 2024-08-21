import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import axios from "axios";

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
  const [userData, setUserData] = useState<UserDataType | null>(null);

  useEffect(() => {
    console.log("UserData", userData);
    const token = Cookies.get("jwt"); // or wherever your token is stored

    if (token) {
      console.log("here");
      const decodedToken = jwtDecode(token);
      getUserData(decodedToken.userID);
    }

    // if (userDataFromLS) {
    //   setUserData(userDataFromLS);
    // }
  }, []);

  async function getUserData(_id: string) {
    try {
      const response = await axios.post(
        `${baseURL}/api/getUserData`,
        { _id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // No need to check for response.ok, as axios will throw an error for non-2xx status codes
      const data = response.data;

      // Optionally, you can log or use the data here
      console.log(data);
      setUserData(data.userData); // Return data if needed elsewhere
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
      localStorage.setItem("userData", JSON.stringify(userData));
    }
  }

  function logoutUser() {
    localStorage.clear();
    setUserData(null);
  }

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
