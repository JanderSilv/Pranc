import { IQuestion, QuestionScore } from '.'

export interface IEvaluate {
  evaluate: (question: IQuestion) => QuestionScore
}
