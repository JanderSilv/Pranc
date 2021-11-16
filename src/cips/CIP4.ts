import { VRF, loadQuestions } from 'src/types'
import IQuestion, { IFuncTable } from '../types/IQuestion'
import { addMonths, differenceInDays, differenceInMonths } from 'date-fns'

const evaluateYN = (question: IQuestion): number => {
  const { alternatives } = question
  const resp = alternatives[0]
  return resp.value == 1 || resp.value == true
    ? 0
    : question.vrf === VRF.low
    ? 3
    : 5
}

const evaluateLastGoodPracticesUpdate = (question: IQuestion): number => {
  const { alternatives } = question
  if (alternatives[1].value == true || alternatives[1].value == 1) return 10
  const lastUpdate = new Date(alternatives[0].value)
  const now = new Date()

  const diff = differenceInMonths(now, lastUpdate)

  if (diff <= 3) return 0
  const limit = addMonths(lastUpdate, 3)
  const limitDiff = differenceInDays(now, limit)

  if (limitDiff < 10) return 3
  if (limitDiff < 30) return 5
  return 8
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
