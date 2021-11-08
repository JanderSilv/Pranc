import IAlternative from '../types/IAlternative'
import IQuestion, { IFuncTable } from '../types/IQuestion'
import { addMonths, differenceInMonths, differenceInDays } from 'date-fns'
import { loadQuestions } from 'src/types/CIP'

const evaluateYN = (
  question: IQuestion,
  alternatives: IAlternative[]
): number => {
  const response = alternatives[0].value
  return response == 1 || response == true ? 0 : 5
}

const evaluateManagerCIP = (
  question: IQuestion,
  alternatives: IAlternative[]
): number => {
  if (alternatives[0].value == true || alternatives[1].value == 1) return 10
  const lastUpdate = new Date(alternatives[0].value)
  const now = new Date()

  const diff = differenceInDays(lastUpdate, now)

  if (diff <= 30) return 0
  const limit = addMonths(lastUpdate, 30)
  const limitDiff = differenceInMonths(limit, now)

  if (limitDiff <= 10) return 3
  if (limitDiff <= 20) return 5
  if (limitDiff <= 30) return 7
  return 10
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
