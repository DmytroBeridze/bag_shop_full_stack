import SaleNavbarDropdown from "../salePage/SaleNavbarDropdown";

const SaleSublist = ({ sale, popupMenueHendler, clearMenuState }) => {
  return (
    <div
      className={`burger__list_sublist ${sale && "open-sale"}`}
      onClick={() => {
        popupMenueHendler();
        clearMenuState();
      }}
    >
      <SaleNavbarDropdown />
    </div>
  );
};

export default SaleSublist;
