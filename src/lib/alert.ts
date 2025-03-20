import { toast, ToastOptions } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { nanoid } from "nanoid"

interface myToast {
    msg: string,
    type: 'error' | 'success' | 'warning';
}

const defaultOption: ToastOptions = {
    position: 'top-right',
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: 'light'
}

let activeToastId: string | null = null;
export const myToast = (msg: string, type: 'error' | 'success' | 'warning') => {
    if (activeToastId && toast.isActive(activeToastId)) return;
    activeToastId = nanoid();
    const options: ToastOptions = {
        ...defaultOption,
        toastId: activeToastId
    }
    switch (type) {


        case 'error':
            console.log(type);
            return toast.error(msg, options);
        case 'success':
            console.log(type);
            return toast.success(msg, options);
        case 'warning':
            console.log(type);
            return toast.warning(msg, options);
        default:
            return toast.error(msg, options);
    }
}