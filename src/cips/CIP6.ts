import IQuestion, { IFuncTable } from '../types/IQuestion'
import { loadQuestions, QuestionScore } from 'src/types/CIP'
import { IAlternative } from 'src/types'

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


const cip6funcs: IFuncTable = [
  {
    keys: [ 0,1,2],
    func: evaluateYN,
  }
]

const cip6 = async () => await loadQuestions(6, cip6funcs)
export default cip6
