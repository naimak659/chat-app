import { toast, Bounce } from "react-toastify";

const SuccesfullToast = (
  msg = "successfully done",
  position = "top-right",
  autoClose = 5000
) => {
  toast.success(msg, {
    position,
    autoClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};

const ErrorToast = (
  msg = "something is wrong",
  position = "top-right",
  autoClose = 5000
) => {
  toast.error(msg, {
    position,
    autoClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};

const InfoToast = (
  msg = "information",
  position = "top-right",
  autoClose = 5000
) => {
  toast.info(msg, {
    position,
    autoClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};

export { SuccesfullToast, ErrorToast, InfoToast };
