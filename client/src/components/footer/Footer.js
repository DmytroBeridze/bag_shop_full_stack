import "./footer.scss";

import { NavLink } from "react-router-dom";

const Footer = () => {
  // const location = useLocation();

  const information = [
    { label: "home", link: "/" },
    { label: "catalog", link: "/catalog" },
    { label: "blog", link: "/blog" },
    { label: "about us", link: "/about" },
    { label: "contact us", link: "/contact" },
  ];
  const socialLinks = [
    { icon: "fa-brands fa-facebook-f", link: "https://facebook.com" },
    { icon: "fa-brands fa-twitter", link: "https://twitter.com" },
    { icon: "fa-brands fa-instagram", link: "https://instagram.com" },
    { icon: "fa fa-youtube", link: "https://www.youtube.com" },
  ];

  const creditCards = [
    "fa-brands fa-cc-mastercard",
    "fa-brands fa-cc-visa",
    "fa-brands fa-cc-paypal",
  ];
  return (
    <footer className="footer">
      <div className="main-container">
        <nav className="footer__nav d-flex flex-wrap justify-content-between gap-5">
          {/* information */}
          <div className="footer__section">
            <h3>information</h3>
            <ul className="footer__menu ">
              {information.map(({ label, link }) => (
                <li key={label}>
                  <NavLink to={link}>{label}</NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/*contacts  */}
          <div className="footer__section">
            <h3>contacts</h3>
            <ul className="footer__menu">
              <li>
                <div>12345, Main Street, Fictional City, FL 54321, USA</div>
              </li>
              <li>
                <div>Phone: +1 (555) 123-4567</div>
              </li>
              <li>
                <div>
                  Email:
                  <NavLink to={"mailto:contact@fakecompany.com"}>
                    contact@fakecompany.com
                  </NavLink>
                </div>
              </li>
            </ul>
          </div>

          {/*socialLinks  */}
          <div className="footer__section ">
            <h3>follow us</h3>
            <ul className=" follow-us footer__menu d-flex">
              {socialLinks.map(({ icon, link }) => (
                <li key={link}>
                  <a href={link}>
                    <i className={icon}></i>
                  </a>
                </li>
              ))}
            </ul>
            <h3>Supported payment card types</h3>
            <div className="d-flex card-types">
              {creditCards.map((elem) => (
                <i className={elem} key={elem}></i>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </footer>
    /**
    !location.pathname.includes("admin") && <div className="footer">footer</div>
    */
  );
};

export default Footer;
