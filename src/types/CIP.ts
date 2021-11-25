import IQuestion, { IFuncTable } from './IQuestion'
import Question from './Question'

export interface Score {
  cip: string
  description: string
  questionsScores: {
    id: number
    title: string
    score: number
    solutions: string[]
  }[]
  totalScore: number
}

export const loadQuestions = async (
  id: number,
  funcs: IFuncTable
): Promise<Question[]> => {
  const response = await import(`src/utils/data/cip-${id}.json`)
  const rawQuestions: IQuestion[] = response.default as IQuestion[]
  const questions = rawQuestions.map(rq => new Question(rq));
  
  questions.forEach((question,index)=>{
    question.id = index;
    question.alternatives.forEach((alternative,idx)=>{
      alternative.id = idx;
    })
    question.setEvaluateFuncs(funcs);
  })
  console.log(questions)
  return questions;
}

export const evaluateQuestions = (
  cipName: string,
  cipDescription: string,
  questions: Question[]
): Score => {
  let totalScore = 0
  const questionsScores = questions.map(question => {
    const score = question.evaluate(question)
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
    description: cipDescription,
    questionsScores,
    totalScore,
  }
}
