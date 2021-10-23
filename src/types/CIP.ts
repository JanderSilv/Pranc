import ICIP from './ICIP'
import { IEvaluate } from './IEvaluate'
import IQuestion, { IFuncTable, IQuestionEvaluate } from './IQuestion'
import Question from './Question'

class CIP implements IEvaluate {
  #id: number
  #questions: Question[]
  #funcs: IFuncTable

  evaluate = () => {
    let result: number = 0
    this.#questions.forEach(q => {
      result += q.evaluate()
    })
    return result
  }

  constructor(id: number, funcs: IFuncTable) {
    this.#id = id
    this.#funcs = funcs
    const rawQuestions: IQuestion[] = JSON.parse(
      `src/utils/data/cip-${id}.json`
    ) as IQuestion[]
    this.#questions = rawQuestions.map(rq => new Question(rq, this.#funcs))
  }

  updateState = (response: IQuestion[]) => {
    this.#questions = response.map(rq => new Question(rq, this.#funcs))
  }
}

export default CIP
