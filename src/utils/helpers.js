import { ToastContainer, toast } from 'react-toastify';

export function showToast(message, type = 'default') {
    toast(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
        type: type
    });
}