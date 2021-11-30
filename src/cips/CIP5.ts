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

const evaluateRadio = (question: IQuestion): QuestionScore => {
  const maxScore = 3 * (question?.vrf ? question.vrf : 3)
  const frac = maxScore / 4

  const alt: IAlternative = question.alternatives.filter(v => v.value == true)[0]
  const score = frac * (alt?.vsl ? alt.vsl : 3)

  return {
    maxScore,
    score,
  }
}

const evaluateCheckbox = (question: IQuestion): QuestionScore => {
  const maxScore = 3 * (question?.vrf ? question.vrf : 3)
  const frac = maxScore / 4

  const alt = question.alternatives.filter(v => v.value == true)
  let score = 0;
  alt.forEach(a => {
    score += frac * (a?.vsl ? a.vsl : 3)
  });
 
  return {
    maxScore,
    score,
  }
}



const cip5funcs: IFuncTable = [
  {
    keys: [ 0],
    func: evaluateCheckbox,
  },{
    keys: [ 1],
    func: evaluateRadio,
  },
]

const cip5 = async () => await loadQuestions(5, cip5funcs)
export default cip5
