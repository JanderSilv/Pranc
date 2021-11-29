import IQuestion, { IFuncTable } from '../types/IQuestion'
import { loadQuestions, QuestionScore } from 'src/types/CIP'

const evaluateYN = (question: IQuestion): QuestionScore => {
  const maxScore = 3 * (question?.vrf ? question.vrf : 3)

  const { alternatives } = question
  const response = alternatives[0].value
  const score = response == true ? 0 : maxScore

  return {
    maxScore,
    score,
  }
}

const cip9funcs: IFuncTable = [
  {
    keys: [0, 1, 2, 3],
    func: evaluateYN,
  },
]

const cip9 = async () => await loadQuestions(9, cip9funcs)
export default cip9
