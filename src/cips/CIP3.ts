import IQuestion, { IFuncTable } from '../types/IQuestion'
import { addDays, differenceInMonths, differenceInDays } from 'date-fns'
import { loadQuestions, QuestionScore } from 'src/types/CIP'

const evaluateYN = (question: IQuestion): QuestionScore => {
  
  const { alternatives } = question
  const response = alternatives[0].value
  const score= (response == 1 || response == true) ? 0 : 5

  return {
    maxScore: 5,
    score
  };
}

const evaluateManagerCIP = (question: IQuestion): QuestionScore => {
  
  const { alternatives } = question
  if (alternatives[0].value == true || alternatives[1].value == 1) return {maxScore: 10,score:10}
  const lastUpdate = new Date(alternatives[0].value)
  const now = new Date()

  const diff = differenceInDays(now, lastUpdate)

  if (diff <= 30) return {maxScore: 10,score:0}
  const limit = addDays(lastUpdate, 30)
  const limitDiff = differenceInDays(now, limit)

  if (limitDiff <= 10) return {maxScore: 10,score:3}
  if (limitDiff <= 20) return {maxScore: 10,score:5}
  if (limitDiff <= 30) return {maxScore: 10,score:7}
  return {maxScore: 10,score:10}

}

const cipFuncs: IFuncTable = [
  {
    keys: [2],
    func: evaluateManagerCIP,
  },
  {
    keys: [0],
    func: evaluateYN,
  },
]

const cip3 = async () => await loadQuestions(3, cipFuncs)
export default cip3
