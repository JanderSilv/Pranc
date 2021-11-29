import IQuestion, { IFuncTable } from '../types/IQuestion'
import { addMonths, differenceInMonths } from 'date-fns'
import { loadQuestions, QuestionScore } from 'src/types/CIP'

const evaluateYN = (question: IQuestion): QuestionScore => {
  const { alternatives } = question
  const response = alternatives[0].value
  const score = response === true ? 0 : 3

  return {
    maxScore: 3,
    score,
  }
}

const evaluateAssetsIdentification = (question: IQuestion): QuestionScore => {
  const { alternatives } = question
  let score
  if (alternatives[1].value === true) score = 10
  else {
    const lastUpdate = new Date(alternatives[0].value)
    const now = new Date()

    const diff = differenceInMonths(now, lastUpdate)

    if (diff <= 15) score = 0
    const limit = addMonths(lastUpdate, 15)
    const limitDiff = differenceInMonths(now, limit)

    if (limitDiff <= 1) score = 3
    else if (limitDiff <= 2) score = 5
    else if (limitDiff <= 3) score = 7
    else score = 10
  }
  return {
    maxScore: 10,
    score,
  }
}

const cip2funcs: IFuncTable = [
  {
    keys: [0],
    func: evaluateAssetsIdentification,
  },
  {
    keys: [1],
    func: evaluateYN,
  },
]

const cip2 = async () => await loadQuestions(2, cip2funcs)
export default cip2
