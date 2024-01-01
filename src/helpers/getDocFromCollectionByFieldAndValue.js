export const getDocFromCollectionByFieldAndValue = (collection, field, value) => {
  return collection.docs.find(docSnap => {
    return docSnap.get(field) === value;
  })
}
