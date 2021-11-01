import { ApplicableSystem, QuestionType } from './enums'
import IAlternative from './IAlternative'

export interface IQuestionEvaluate {
  (question:IQuestion,alternatives: IAlternative[]): number
}

export type IFuncTable = {
  keys: number[]
  func: IQuestionEvaluate
}[]

interface IQuestion {
  id: number
  title: string
  helper?: string
  type: QuestionType
  applicableSystem?: ApplicableSystem
  alternatives: IAlternative[]
}

export default IQuestion
