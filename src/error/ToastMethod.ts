import { Theme, ToastPosition, toast } from "react-toastify";

export class ToastMethod{

    static autoClose : number = 5000;
    static position : ToastPosition = "top-right"
    static hideProgressBar : boolean = true;
    static closeOnClick : boolean = true;
    static pauseOnHover : boolean = true;
    static draggable : boolean = false;
    static progress = undefined
    static theme : Theme  = "light";

    static info(msg : string) {
        return toast.info(msg, {
            position: this.position,
            autoClose: this.autoClose,
            hideProgressBar: this.hideProgressBar,
            closeOnClick: this.closeOnClick,
            pauseOnHover: this.pauseOnHover,
            draggable: this.draggable,
            progress: this.progress,
            theme: this.theme,
            });
    }

    static error(msg : string) {
        return toast.error(msg, {
            position: this.position,
            autoClose: this.autoClose,
            hideProgressBar: this.hideProgressBar,
            closeOnClick: this.closeOnClick,
            pauseOnHover: this.pauseOnHover,
            draggable: this.draggable,
            progress: this.progress,
            theme: this.theme,
            });
    }

    static success(msg : string) {
        return toast.success(msg, {
            position: this.position,
            autoClose: this.autoClose,
            hideProgressBar: this.hideProgressBar,
            closeOnClick: this.closeOnClick,
            pauseOnHover: this.pauseOnHover,
            draggable: this.draggable,
            progress: this.progress,
            theme: this.theme,
            });
    } 
}