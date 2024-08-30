import { toast } from "react-toastify";
const toastPopupService = (status) => {
  if (status) {
    switch (status) {
      case "Wrong password":
      case "User does not exist":
      case "This name already exists":
      case "You are logged out":
        return toast.error(status, { position: "bottom-right" });
      case "You are logged in":
      case "Goods created":
      case "Goods edited":
        return toast.success(status, { position: "bottom-right" });
      default:
        toast.info(status, { position: "bottom-right" });
    }
  } else return;
};

export default toastPopupService;
