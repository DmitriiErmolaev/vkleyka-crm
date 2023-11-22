export const addZero = (num) => {
  return (num < 10) ? `0${num}` : num;
}

export const getShortYear = (year) => {
  return +String(year).slice(2);
}

export const getFileExtension = (str) => {
  return str.slice(str.lastIndexOf(".") + 1);
}

export const  sklonenie = (number, txt, cases = [2, 0, 1, 1, 1, 2]) => {
  return txt[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

export const getNumberOfApplications = (applicationsNumber) => {
  const word = sklonenie(applicationsNumber, ['заявка', 'заявки', 'заявок'])
  return `${applicationsNumber} ${word}`
}