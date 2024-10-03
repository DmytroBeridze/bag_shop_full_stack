import "./footer.scss";

import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  return (
    !location.pathname.includes("admin") && <div className="footer">footer</div>
  );
};

export default Footer;
