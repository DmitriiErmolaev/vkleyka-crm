export const getAllFieldsFromDocSnapshot = (docSnapshot) => {
  if(!docSnapshot) return
  return docSnapshot.data();
}
