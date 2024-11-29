const setToLocalStorage = (storName, data) => {
  const local = JSON.parse(localStorage.getItem(storName));

  if (local) {
    const changeArr = local.filter((elem) => elem._id !== data._id);

    localStorage.setItem(storName, JSON.stringify([...changeArr, data]));
  } else localStorage.setItem(storName, JSON.stringify([data]));
};

export default setToLocalStorage;
