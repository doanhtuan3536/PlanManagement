import { useState } from "react";
function useNotification(){
    const [notification, setNotification] = useState({ show: false, message: '', type: 'danger' });

    const showNotification = (message, type = 'danger') => {
        setNotification({ show: true, message, type });
        setTimeout(() => {
            setNotification({ ...notification, show: false });
        }, 5000);
    };

    return {notification, setNotification, showNotification}
}

export default useNotification;