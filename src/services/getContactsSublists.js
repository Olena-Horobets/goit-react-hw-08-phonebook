function getContactsSublists(contacts) {
  const sortedContacts = [...contacts].sort((x, y) => {
    let a = x.name.toUpperCase(),
      b = y.name.toUpperCase();
    return a === b ? 0 : a > b ? 1 : -1;
  });

  let firstLettersArr = [];
  let subListsArr = [];

  sortedContacts.reduce((acc, el, idx, arr) => {
    const firstLetter = el.name[0].toUpperCase();

    if (!firstLettersArr.includes(firstLetter)) {
      firstLettersArr.push(firstLetter);
      if (idx !== 0) subListsArr.push(acc);
      acc = [el];
    } else {
      acc.push(el);
    }

    if (idx === arr.length - 1) subListsArr.push(acc);
    return acc;
  }, []);

  return { firstLettersArr, subListsArr };
}

export { getContactsSublists };
