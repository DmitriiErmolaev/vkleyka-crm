export const getShortApplicationId = (docId) => {
  let id = docId.slice(0,4).toUpperCase();
  return id
}
