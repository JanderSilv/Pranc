import IQuestion, { IFuncTable, IQuestionEvaluate } from './IQuestion'
import Question from './Question'

export const loadQuestions = async (
  id: number,
  funcs: IFuncTable
): Promise<Question[]> => {
  const response = await import(`src/utils/data/cip-${id}.json`)
  const rawQuestions: IQuestion[] = response.default as IQuestion[]
  return rawQuestions.map(rq => new Question(rq, funcs))
}

export const evaluateQuestions = (questions: Question[]): number => {
  let result: number = 0
  questions.forEach(q => {
    result += q.evaluate()
  })
  return result
}
