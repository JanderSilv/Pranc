import { QuestionType, ApplicableSystem } from './enums'
import IAlternative from './IAlternative'
import { IEvaluate } from './IEvaluate'
import IQuestion, { IFuncTable, IQuestionEvaluate } from './IQuestion'

class Question implements IQuestion, IEvaluate {
  id: number
  title: string
  helper?: string | undefined
  type: QuestionType
  applicableSystem?: ApplicableSystem | undefined
  alternatives: IAlternative[]
  evaluateFunc: IQuestionEvaluate

  constructor(data: IQuestion, funcs: IFuncTable) {
    this.id = data.id
    this.title = data.title
    this.helper = data.helper
    this.type = data.type
    this.applicableSystem = data.applicableSystem
    this.alternatives = data.alternatives

    this.evaluateFunc = funcs.find(func => func.keys.includes(this.id))!.func
  }
  evaluate = () => this.evaluateFunc(this.alternatives)
}

export default Question
