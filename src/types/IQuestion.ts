import { ApplicableSystem, QuestionType, VRF } from './enums'
import IAlternative from './IAlternative'

export interface IQuestionEvaluate {
  (question: IQuestion): number
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
  vrf?: VRF
  applicableSystem?: ApplicableSystem
  alternatives: IAlternative[]
  solutions: string[]
}

export default IQuestion
