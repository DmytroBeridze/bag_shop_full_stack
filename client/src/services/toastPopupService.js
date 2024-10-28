import { toast } from "react-toastify";

const toastPopupService = (status, close) => {
  if (status) {
    switch (status) {
      case "Wrong password":
      case "User does not exist":
      case "This name already exists":
      case "You are logged out":
      case "Sending error.":
        return toast.error(status, {
          position: "bottom-right",
          onClose: () => {
            close && close(false);
            // console.log("Close");
          },
        });
      case "You are logged in":
      case "Goods created":
      case "Goods edited":
      case "Post created":
      case "Sending successfull.":
        return toast.success(status, {
          position: "bottom-right",
          onClose: () => {
            close && close(false);
            // console.log("Close");
          },
        });
      default:
        toast.info(status, { position: "bottom-right" });
    }
  } else return;
};

export default toastPopupService;
