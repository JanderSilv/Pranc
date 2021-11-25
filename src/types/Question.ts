import { QuestionType, ApplicableSystem, VRF } from './enums'
import IAlternative from './IAlternative'
import { IEvaluate } from './IEvaluate'
import IQuestion, { IFuncTable, IQuestionEvaluate } from './IQuestion'

class Question implements IQuestion, IEvaluate {
  id: number
  title: string
  helper?: string | undefined
  type: QuestionType
  vrf?: VRF
  applicableSystem?: ApplicableSystem | undefined
  alternatives: IAlternative[]
  solutions: string[]
  evaluateFunc: IQuestionEvaluate = (question: IQuestion) => 0;

  constructor(data: IQuestion) {
    this.id = data.id!=undefined? data.id:0;
    this.title = data.title
    this.helper = data.helper
    this.type = data.type
    this.vrf = data.vrf
    this.applicableSystem = data.applicableSystem
    this.alternatives = data.alternatives
    this.solutions = data.solutions 
  }

  setEvaluateFuncs = (funcs: IFuncTable) =>{
    const myFunc = funcs.find(func => func.keys.includes(this.id))
    if(myFunc)
    this.evaluateFunc = myFunc.func
  }

  evaluate = (question: IQuestion) => this.evaluateFunc(question)
}

export default Question
