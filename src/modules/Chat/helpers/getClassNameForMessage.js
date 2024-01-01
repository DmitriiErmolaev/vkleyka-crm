export const getClassNameForMessage = (sender) => {
  return (sender === "me") ? "message__content applicant" : "message__content operator";
}
