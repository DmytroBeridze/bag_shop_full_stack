import "./buttons.scss";

const Button = ({ onclick, className, disabled, label }) => {
  return (
    <button
      onClick={onclick}
      disabled={disabled}
      className={`custom-button ${className}`}
    >
      <span> {label} </span>
    </button>
  );
};

export default Button;
