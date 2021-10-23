import IQuestion from './IQuestion'

interface CIP {
  id: number
  questions: IQuestion[]
  evaluate: (response: IQuestion[]) => number
}

export default CIP
