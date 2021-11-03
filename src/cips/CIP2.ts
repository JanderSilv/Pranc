import IAlternative from '../types/IAlternative'
import IQuestion, { IFuncTable } from '../types/IQuestion'
import { addMonths, differenceInDays, differenceInMonths } from 'date-fns'
import { loadQuestions } from 'src/types/CIP'

const evaluateYN = (
  question: IQuestion,
  alternatives: IAlternative[]
): number => {
  const response = alternatives[0].value
  return response == 1 || response == true ? 0 : 3
}

const evaluateAssetsIdentification = (
  question: IQuestion,
  alternatives: IAlternative[]
): number => {
  if (alternatives[0].value == true || alternatives[1].value == 1) return 10
  const lastUpdate = new Date(alternatives[0].value)
  const now = new Date()

  const diff = differenceInMonths(lastUpdate, now)

  if (diff <= 15) return 0
  const limit = addMonths(lastUpdate, 15)
  const limitDiff = differenceInMonths(limit, now)

  if (limitDiff <= 1) return 3
  if (limitDiff <= 2) return 5
  if (limitDiff <= 3) return 7
  return 10
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

// const obj = new CIP4();

// //jandinho pega as questoes
// const questions =  obj.getQuestions();

// //renderiza
// //{...}
// //pega as resposta

// obj.updateState(/* e bota aqui */questions);

// //e pega as nota
// const nota = obj.evaluate();
