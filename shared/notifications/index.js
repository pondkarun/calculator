import { store } from 'react-notifications-component';

// success
// danger
// info
// default
// warning
export const Notifications = async (message = "ข้อความจากระบบ", type = "default",) => {
    return store.addNotification({
        title: "ข้อความจากระบบ",
        message,
        type,
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 3000,
            onScreen: true
        }
    });
};