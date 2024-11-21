const setToLocalStorage = (storName, data) => {
  const local = JSON.parse(localStorage.getItem(storName));

  if (local) {
    const changeArr = local.filter((elem) => elem._id !== data._id);

    localStorage.setItem(storName, JSON.stringify([...changeArr, data]));
  } else localStorage.setItem(storName, JSON.stringify([data]));
};

export default setToLocalStorage;
// const getToLocalStorage = (storName, productId, counter = 1) => {
//   const local = JSON.parse(localStorage.getItem(storName));

//   if (local) {
//     const changeArr = local.filter((elem) => elem.id !== productId);

//     localStorage.setItem(
//       storName,
//       JSON.stringify([
//         ...changeArr,
//         {
//           counter,
//           id: productId,
//         },
//       ])
//     );
//   } else
//     localStorage.setItem(
//       storName,
//       JSON.stringify([
//         {
//           counter,
//           id: productId,
//         },
//       ])
//     );
// };

// export default getToLocalStorage;
