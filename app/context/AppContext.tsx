import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

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
      const response = await fetch(`${baseURL}/api/getUserData`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id }),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);
      setUserData(data.userData); // Return data if needed elsewhere
    } catch (error) {
      console.error("Error fetching user data:", error);
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
