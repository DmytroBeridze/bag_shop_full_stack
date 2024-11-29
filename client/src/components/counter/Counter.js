import "./counter.scss";

import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";

const Counter = ({ valueCounter, setValueCounter }) => {
  const increment = () => {
    setValueCounter((valueCounter) => +valueCounter + 1);
  };

  const decrement = () => {
    setValueCounter((valueCounter) =>
      valueCounter > 0 ? valueCounter - 1 : 0
    );
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setValueCounter(value);
    } else setValueCounter(0);
  };

  return (
    <div className="order-counter__quantity">
      <div className="order-counter__couner">
        <input
          type="text"
          value={valueCounter}
          onChange={(e) => {
            handleInputChange(e);
          }}
        />
        <span className="order-counter__decrement" onClick={decrement}>
          <FiMinus />
        </span>
        <span className="order-counter__increment" onClick={increment}>
          <FaPlus />
        </span>
      </div>
    </div>
  );
};

export default Counter;
