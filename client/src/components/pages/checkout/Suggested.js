import React from "react";

const Suggested = ({ elem, setCityToInput, index }) => {
  return (
    <li
      className="list-group-item checkout__suggested"
      onClick={() => setCityToInput(elem.name)}
    >
      <span>{elem.name}</span>
      {index === "city" ? <span> {`(${elem.countryName})`}</span> : null}
    </li>
  );
};
// const CitiesSuggested = ({ elem, setCityToInput }) => {
//   return (
//     <li
//       className="list-group-item checkout__suggested"
//       onClick={() => setCityToInput(elem.name)}
//     >
//       <span>{elem.name}</span>
//       <span> {`(${elem.countryName})`}</span>
//     </li>
//   );
// };

export default Suggested;
