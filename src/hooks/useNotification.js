import { useEffect, useRef, useState } from "react";
// function useNotification(){
//   const [notification, setNotification] = useState({
//     // show: true,
//     message: '',
//     type: 'danger'
//   });
//   const timeoutID = useRef(null);
//   console.log(notification)

//   const [visible, setVisible] = useState(false);
//   const [collapsed, setCollapsed] = useState(true);

//   function showNotificationAnimation(){
//     setCollapsed(false)

//     setTimeout(() => setVisible(true), 0);
//   }

//   function hideNotificationAnimation(){
//     setVisible(false);

//     setTimeout(() => setCollapsed(true), 300);
//   }

//   function hideNotification(){
//     setCollapsed(true);
//     setVisible(false);
//     clearTimeout(timeoutID.current);
//   }

//   useEffect(() => {
//     if (collapsed) return;

//     timeoutID.current = setTimeout(() => {
//       hideNotificationAnimation()
//       // setNotification(prev => ({ ...prev, show: false }));
//     }, 5000);
//     const timeoutid = timeoutID.current

//     return () => {
//       console.log('use effect use notification')
//       clearTimeout(timeoutid);
//     };
//   }, [collapsed]);

//   const showNotification = (message, type = 'danger') => {
//     showNotificationAnimation()
//     setNotification({
//       // show: true,
//       message,
//       type
//     });
//   };

//   return { notification, setNotification, showNotification, hideNotification ,visible, collapsed};
// }
function useNotification(){
  const [notification, setNotification] = useState({
    message: '',
    type: 'danger'
  });
  const timeoutID = useRef(null);
  const animationTimeoutID = useRef(null);

  const [visible, setVisible] = useState(false);
  const [collapsed, setCollapsed] = useState(true);

  // Clean up all timeouts
  const clearAllTimeouts = () => {
    if (timeoutID.current) {
      clearTimeout(timeoutID.current);
      timeoutID.current = null;
    }
    if (animationTimeoutID.current) {
      clearTimeout(animationTimeoutID.current);
      animationTimeoutID.current = null;
    }
  };

  function showNotificationAnimation(){
    setCollapsed(false);
    
    // Use a ref to track the animation timeout
    animationTimeoutID.current = setTimeout(() => setVisible(true), 50);
  }

  function hideNotificationAnimation(){
    setVisible(false);

    // Use a ref to track the animation timeout
    animationTimeoutID.current = setTimeout(() => setCollapsed(true), 300);
  }

  function hideNotification(){
    clearAllTimeouts();
    setCollapsed(true);
    setVisible(false);
  }

  // Effect for auto-hide timer
  useEffect(() => {
    if (collapsed) return;

    // Clear any existing timeout before setting a new one
    if (timeoutID.current) {
      clearTimeout(timeoutID.current);
    }

    timeoutID.current = setTimeout(() => {
      hideNotificationAnimation();
    }, 5000);

    return () => {
      if (timeoutID.current) {
        clearTimeout(timeoutID.current);
      }
    };
  }, [collapsed, notification.message]); // Add notification.message to dependency

  const showNotification = (message, type = 'danger') => {
    // If a notification is already showing, hide it first
    if (!collapsed) {
      // Immediately hide the current notification
      setVisible(false);
      setCollapsed(true);
      clearAllTimeouts();
    }

    // Small delay to ensure the previous notification is hidden
    setTimeout(() => {
      // Update the notification content
      setNotification({
        message,
        type
      });
      
      // Show the new notification
      showNotificationAnimation();
    }, 0);
    // collapsed ? 0 : 350); // Wait for hide animation if needed
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearAllTimeouts();
    };
  }, []);

  return { 
    notification, 
    setNotification, 
    showNotification, 
    hideNotification,
    visible, 
    collapsed
  };
}

export default useNotification;