import { IAlternative } from '.'

export interface IEvaluate {
  evaluate: (alternatives: IAlternative[]) => number
}
