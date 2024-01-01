export const getOnlyOperators = (admins) => {
  return admins.reduce((accum, user ) => {
    if(user.role === "operator") {
      accum.push(user);
      return accum
    }
    return accum
  },[])
};
