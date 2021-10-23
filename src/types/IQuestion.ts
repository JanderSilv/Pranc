import { ApplicableSystem, QuestionType } from './enums'
import IAlternative from './IAlternative'

interface IQuestion {
  id: number
  title: string
  helper?: string
  type: QuestionType
  applicableSystem?: ApplicableSystem
  alternatives?: IAlternative[]
  evaluate: (alternative: IAlternative[]) => number
}

export default IQuestion
