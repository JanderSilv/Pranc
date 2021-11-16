import { IQuestion } from '.'

export interface IEvaluate {
  evaluate: (question: IQuestion) => number
}
