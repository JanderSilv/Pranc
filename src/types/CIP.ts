import IQuestion, { IFuncTable } from './IQuestion'
import Question from './Question'

export interface Score {
  cip: string
  questionsScores: {
    id: number
    title: string
    score: number
  }[]
  totalScore: number
}

export const loadQuestions = async (
  id: number,
  funcs: IFuncTable
): Promise<Question[]> => {
  const response = await import(`src/utils/data/cip-${id}.json`)
  const rawQuestions: IQuestion[] = response.default as IQuestion[]
  return rawQuestions.map(rq => new Question(rq, funcs))
}

export const evaluateQuestions = (
  cipName: string,
  questions: Question[]
): Score => {
  let totalScore = 0
  const questionsScores = questions.map(question => {
    const score = question.evaluate()
    totalScore += score
    return {
      id: question.id,
      title: question.title,
      score,
      solutions: question.solutions,
    }
  })
  return {
    cip: cipName,
    questionsScores,
    totalScore,
  }
}
