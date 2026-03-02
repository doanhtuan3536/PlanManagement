import { useEffect, useState } from "react";
function useNotification(){
      const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'danger'
  });

  useEffect(() => {
    if (!notification.show) return;

    const timeoutId = setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 5000);

    return () => {
      console.log('use effect use notification')
      clearTimeout(timeoutId);
    };
  }, [notification.show]);

  const showNotification = (message, type = 'danger') => {
    setNotification({
      show: true,
      message,
      type
    });
  };

  return { notification, setNotification, showNotification };
}

export default useNotification;