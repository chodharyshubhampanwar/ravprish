import { toast } from "react-hot-toast";

export enum ToastType {
  SUCCESS = "success",
  ERROR = "error",
  LOADING = "loading",
  DISMISS = "dismiss",
}

interface ToastOptions {
  message: string;
  type: ToastType;
  duration?: number;
  position?:
    | "top-right"
    | "top-center"
    | "top-left"
    | "bottom-right"
    | "bottom-center"
    | "bottom-left";
  id?: string; // For dismissing specific toasts
}

export const showToast = ({
  message,
  type,
  duration = 3000,
  position = "top-center",
  id,
}: ToastOptions) => {
  switch (type) {
    case ToastType.SUCCESS:
      return toast.success(message, { duration, position });
    case ToastType.ERROR:
      return toast.error(message, { duration, position });
    case ToastType.LOADING:
      return toast.loading(message, { duration, position, id }); // Include id for loading toasts
    case ToastType.DISMISS:
      if (id) {
        toast.dismiss(id);
      } else {
        toast.dismiss(); // Dismiss all toasts if no id provided
      }
      return;
    default:
      console.warn("Invalid toast type provided.");
  }
};
