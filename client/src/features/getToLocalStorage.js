const getToLocalStorage = (storName, productId, counter = 1) => {
  const local = JSON.parse(localStorage.getItem(storName));

  if (local) {
    const changeArr = local.filter((elem) => elem.id !== productId);

    localStorage.setItem(
      storName,
      JSON.stringify([
        ...changeArr,
        {
          counter,
          id: productId,
        },
      ])
    );
  } else
    localStorage.setItem(
      storName,
      JSON.stringify([
        {
          counter,
          id: productId,
        },
      ])
    );
};

export default getToLocalStorage;
