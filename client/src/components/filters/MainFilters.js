import "./mainfilters.scss";

import { mainfilterValue } from "./mainFilters.slice";
import { useDispatch, useSelector } from "react-redux";

const MainFilters = () => {
  const filterElements = ["bags", "backpacks", "handbags", "wallets"];
  const dispatch = useDispatch();
  const { mainfilterType } = useSelector((state) => state.mainFilterReducer);

  const filterHandle = (value) => {
    dispatch(mainfilterValue(value));
  };

  return (
    <div className="main-container">
      <ul className="main__filters ">
        {filterElements.map((elem, i) => {
          const listStyle =
            elem === mainfilterType
              ? { color: "#bb7311" }
              : { color: "inherit" };
          return (
            <li
              style={listStyle}
              data-value={elem}
              key={elem}
              onClick={() => {
                filterHandle(elem);
              }}
            >
              {elem}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MainFilters;
