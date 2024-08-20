// src/context/AlertContext.tsx
import React, { createContext, useContext, useState } from "react";
import Alert from "../components/utils/Alert/Alert";

type AlertType = "info" | "danger" | "success" | "warning" | "dark";

type AlertContextType = {
  showAlert: (message: string, type: AlertType) => void;
  hideAlert: () => void;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [alert, setAlert] = useState<{
    message: string;
    type: AlertType;
  } | null>(null);

  const showAlert = (message: string, type: AlertType) => {
    setAlert({ message, type });
  };

  const hideAlert = () => {
    setAlert(null);
  };

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          setVisible={hideAlert}
        />
      )}
      {children}
    </AlertContext.Provider>
  );
};
