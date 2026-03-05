import Notification from "~/components/Notification";
import useNotification from "~/hooks/useNotification";

const { createContext, useContext } = require("react");


const NotificationContext = createContext();

export const useNotificatonContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotificatonContext must be used within an NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
   const { notification, setNotification, showNotification, visible, collapsed, hideNotification} = useNotification();

  const value = {
    notification, 
    setNotification, 
    showNotification,
    collapsed,
  };

  return (
    <NotificationContext.Provider value={value}>
        {!collapsed && (
            <Notification notification = {notification} visible={visible} hideNotification={hideNotification} />
        )}
      {children}
    </NotificationContext.Provider>
  );
};