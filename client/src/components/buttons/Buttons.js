import "./buttons.scss";

const Button = ({ onclick, className, disabled, label }) => {
  return (
    <button
      onClick={onclick}
      disabled={disabled}
      className={`custom-button ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
