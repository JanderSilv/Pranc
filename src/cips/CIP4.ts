import { loadQuestions } from '../types/CIP'
import IAlternative from '../types/IAlternative'
import IQuestion, { IFuncTable } from '../types/IQuestion'
import { addMonths, differenceInDays, differenceInMonths } from 'date-fns'

const evaluateYN = (
  question: IQuestion,
  alternatives: IAlternative[]
): number => {
  const resp = alternatives[0]
  return resp.value == 1 || resp.value == true ? 0 : 5
}

const evaluateLastGoodPraticesUpdate = (
  question: IQuestion,
  alternatives: IAlternative[]
): number => {
  if (alternatives[1].value == true || alternatives[1].value == 1) return 10
  const lastUpdate = new Date(alternatives[0].value)
  const now = new Date()

  const diffm = differenceInMonths(now, lastUpdate)

  if (diffm <= 3) return 0
  const aux = addMonths(lastUpdate, 3)
  const diffd = differenceInDays(aux, now)
  if (diffd < 10) {
    return 3
  } else if (diffd < 30) {
    return 5
  } else {
    return 8
  }
}

const cip4funcs: IFuncTable = [
  {
    keys: [0],
    func: evaluateLastGoodPraticesUpdate,
  },
  {
    keys: [1, 2],
    func: evaluateYN,
  },
]

const cip4 = async () => await loadQuestions(4, cip4funcs)
export default cip4
