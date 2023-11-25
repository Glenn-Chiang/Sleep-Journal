import { toast } from "react-toastify"

export const notify = (message: string) => {
  toast(message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2000,
    type: "success",
  });
}