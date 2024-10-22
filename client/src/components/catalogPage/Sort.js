const sort = (arr, sortAttr, sortProducts) => {
  return [...arr].sort((a, b) => {
    // price
    const price1 = JSON.parse(a.parameters).price;
    const price2 = JSON.parse(b.parameters).price;
    // name
    const name1 = a.name.toLowerCase();
    const name2 = b.name.toLowerCase();
    // added
    const date1 = new Date(a.createdAt);
    const date2 = new Date(b.createdAt);

    switch (sortAttr) {
      case "price":
        return sortProducts === "high" ? price2 - price1 : price1 - price2;
      case "name": {
        if (sortProducts === "a-z") {
          return name1.localeCompare(name2);
        } else if (sortProducts === "z-a") return name2.localeCompare(name1);
      }
      case "added":
        return sortProducts === "old-new" ? date2 - date1 : date1 - date2;

      default:
        break;
    }
  });
};

export default sort;
