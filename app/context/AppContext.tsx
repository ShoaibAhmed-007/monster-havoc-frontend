import React, { createContext, useContext, useEffect, useState } from "react";

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
    const userDataFromLS = JSON.parse(localStorage.getItem("userData")!);

    if (userDataFromLS) {
      setUserData(userDataFromLS);
    }
  }, []);

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
