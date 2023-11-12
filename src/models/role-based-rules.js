export const GLOBAL_ROLES = {
  admin: "admin",
  operator: "operator",
}

export const roleBasedContent = {
  admin: {
    collectionConstraints: "all-applications",
    initialQueryConstraints: null,
    columnsIncluded: ["all", "admin"],
    cardOperatorAssigmentDisplayProperty: "flex",
  },
  operator:{
    collectionConstraint: "assigned-only",
    columnsIncluded: ["all", "operator"],
    cardOperatorAssigmentDisplayProperty: "none"
  }
}
