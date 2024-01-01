import { getArrayWithoutEmptyStrings } from "../../../utils/getArrayWithoutEmptyStrings";

export const createChangedQuestionnaireCopy = (questionnaireOriginal, answersToUpdate) => {
  let copyQuestionnaire = [...questionnaireOriginal];
  answersToUpdate.forEach((question) => {
    if(Array.isArray(question.newResponse)) {
      const arrayWithoutEmptyStrings = getArrayWithoutEmptyStrings(question.newResponse);
      copyQuestionnaire[question.index].response = arrayWithoutEmptyStrings;
      return;
    }
    copyQuestionnaire[question.index].response = question.newResponse;
  })
  return copyQuestionnaire;
}
