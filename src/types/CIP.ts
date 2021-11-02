import ICIP from './ICIP'
import { IEvaluate } from './IEvaluate'
import IQuestion, { IFuncTable, IQuestionEvaluate } from './IQuestion'
import Question from './Question'

class CIP implements IEvaluate {
  #id: number
  #questions: Question[] = []
  #funcs: IFuncTable

  evaluate = () => {
    let result: number = 0
    this.#questions.forEach(q => {
      result += q.evaluate()
    })
    return result
  }

  getQuestions = ()=> this.#questions;

  constructor(id: number, funcs: IFuncTable) {
    this.#id = id
    this.#funcs = funcs
  }

  loadQuestions = async ()=>{
    const response = await import(`src/utils/data/cip-${this.#id}.json`);
    const rawQuestions: IQuestion[] = JSON.parse(response.default) as IQuestion[]
    this.#questions = rawQuestions.map(rq => new Question(rq, this.#funcs))
  }

  updateState = (response: IQuestion[]) => {
    this.#questions = response.map(rq => new Question(rq, this.#funcs))
  }
}

export default CIP
