import { useRef } from "react";
import "./mainfilters.scss";

const MainFilters = () => {
  const filterElements = ["bags", "backpack", "hand bags", "wallets"];
  const filterRef = useRef([]);

  const filterToggle = (i) => {
    filterRef.current.forEach((elem) => (elem.style.color = "inherit"));
    filterRef.current[i].style.color = "#bb7311";
  };
  return (
    <div className="main-container">
      <ul className="main__filters ">
        {filterElements.map((elem, i) => (
          <li
            data-value={elem}
            key={elem}
            ref={(elem) => (filterRef.current[i] = elem)}
            onClick={() => filterToggle(i)}
          >
            {elem}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainFilters;
