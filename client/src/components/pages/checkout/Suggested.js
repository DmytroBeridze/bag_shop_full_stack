const Suggested = ({ elem, setToInput, index }) => {
  return (
    <li
      className="list-group-item checkout__suggested"
      onClick={() => setToInput(elem.name)}
    >
      <span>{elem.name}</span>
      {index === "city" ? <span> {`(${elem.countryName})`}</span> : null}
    </li>
  );
};

export default Suggested;
