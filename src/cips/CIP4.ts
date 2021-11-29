import { VRF, loadQuestions, QuestionScore } from 'src/types'
import IQuestion, { IFuncTable } from '../types/IQuestion'
import { addMonths, differenceInDays, differenceInMonths } from 'date-fns'

const evaluateYN = (question: IQuestion): QuestionScore => {
  const { alternatives } = question
  const response = alternatives[0]
  let score

  if (response.value === true) score = 0
  else if (question.vrf === VRF.low) score = 3
  else score = 5

  return {
    maxScore: question.vrf === VRF.low ? 3 : 5,
    score,
  }
}

const evaluateLastGoodPracticesUpdate = (question: IQuestion): QuestionScore => {
  const { alternatives } = question
  const maxScore = 10

  if (alternatives[1].value === 1) return { maxScore, score: 10 }
  const lastUpdate = new Date(alternatives[0].value)
  const now = new Date()

  const diff = differenceInMonths(now, lastUpdate)

  if (diff <= 3) return { maxScore, score: 0 }
  const limit = addMonths(lastUpdate, 3)
  const limitDiff = differenceInDays(now, limit)

  let score = 0
  if (limitDiff < 10) score = 3
  else if (limitDiff < 30) score = 5
  else score = 8

  return { maxScore, score }
}

const cip4funcs: IFuncTable = [
  {
    keys: [0],
    func: evaluateLastGoodPracticesUpdate,
  },
  {
    keys: [1, 2],
    func: evaluateYN,
  },
]

const cip4 = async () => await loadQuestions(4, cip4funcs)
export default cip4
