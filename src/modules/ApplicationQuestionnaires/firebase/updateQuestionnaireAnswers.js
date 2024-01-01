import { updateDoc } from "firebase/firestore"
import { createChangedQuestionnaireCopy } from "../helpers/createChangedQuestionnaireCopy"

export const updateQuestionnaireAnswers = async (ref, questionnaireOriginal, answersToUpdate) => {
  const copy = createChangedQuestionnaireCopy(questionnaireOriginal, answersToUpdate)
  await updateDoc(ref, "questionnary.answers", copy )
}
