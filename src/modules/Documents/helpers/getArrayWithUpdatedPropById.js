export const getArrayWithUpdatedPropById = (array, objectToUpdateId, propToUpdate, value) => {
  return array.map((file) => {
    if (file.uid === objectToUpdateId) {
      return {...file, [propToUpdate]: value}
    }
    return file;
  })
};
