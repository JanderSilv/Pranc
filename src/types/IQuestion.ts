import { QuestionScore } from '.'
import { ApplicableSystem, QuestionType, VRF } from './enums'
import IAlternative from './IAlternative'

export interface IQuestionEvaluate {
  (question: IQuestion): QuestionScore
}

export type IFuncTable = {
  keys: number[]
  func: IQuestionEvaluate
}[]

interface IQuestion {
  id?: number
  title: string
  helper?: string
  type: QuestionType
  vrf?: VRF
  notRequired?: boolean
  applicableSystem?: ApplicableSystem
  alternatives: IAlternative[]
  solutions: string[]
}

export default IQuestion
