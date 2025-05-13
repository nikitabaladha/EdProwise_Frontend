import { createContext, useContext, useState, useCallback } from "react";
import getAPI from "../api/getAPI";

const NotificationContext = createContext();

export const NotificationProviderForSchool = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = useCallback(async () => {
    try {
      const response = await getAPI(`/school-notifications`, {}, true);

      if (!response.hasError && response.data && response.data.data) {
        setNotifications(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  }, []);

  const contextValue = {
    notifications,
    fetchNotifications,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
