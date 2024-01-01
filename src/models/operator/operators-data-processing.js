





export const findRole = (admins, authorizedUser) => {
  const findedUser = admins.find((admin) => {
    return admin.email === authorizedUser.email;
  })
  return findedUser.role;
}

export const getAuthorizedOperator = (admins, authorizedUserID) => {
  const findedUser = admins.find((admin) => {
    return admin.id === authorizedUserID;
  })
  return findedUser;
}

export const findOperatorName = (admins, userID) => {
  const findedUser = admins.find((admin) => {
    return admin.id === userID;
  })
  return findedUser.name;
}





