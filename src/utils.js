export const addZero = (num) => {
  return (num < 10) ? `0${num}` : num;
}

export const getShortYear = (year) => {
  return +String(year).slice(2);
}

export const getCollectionFirstDocRef = (collSnapShot) => {
  return collSnapShot.docs[0].ref;
}

export const getFileExtension = (str) => {
  return str.slice(str.lastIndexOf(".") + 1);
}
