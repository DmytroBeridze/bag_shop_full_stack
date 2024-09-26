import { useState } from "react";

const useCounter = () => {
  const [counter, setCounter] = useState(1);

  const decrement = () => {
    setCounter((counter) => {
      if (counter <= 1) {
        return 1;
      }
      return counter - 1;
    });
  };
  const increment = () => {
    setCounter((counter) => counter + 1);
  };

  return { decrement, increment, counter };
};

export default useCounter;
