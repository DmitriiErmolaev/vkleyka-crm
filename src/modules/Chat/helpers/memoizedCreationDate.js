export const memoizedCreationDate = () => {
  let dateCached;

  return creationDate => {
    if (!dateCached || (creationDate !== dateCached)) {
      dateCached = creationDate;
      return true;
    } else {
      return false;
    }
  }
}
