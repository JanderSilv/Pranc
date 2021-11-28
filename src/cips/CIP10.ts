import IQuestion, { IFuncTable } from '../types/IQuestion'
import { loadQuestions, QuestionScore } from 'src/types/CIP'
import {  differenceInCalendarDays } from 'date-fns'
import { IAlternative } from 'src/types';

const evaluateYN = (question: IQuestion): QuestionScore => {

    const maxScore = 3 * (question?.vrf? question.vrf : 3);

    const { alternatives } = question
    const response = alternatives[0].value
    const score = (response == true) ? 0 : maxScore
  
    return {
      maxScore,
      score
    };
  }
  
const evaluateDate = (question: IQuestion): QuestionScore => {
    const { alternatives } = question
    let score = 0;
    if (alternatives[1].value == 1) 
        score = 10
    else{
        const lastUpdate = new Date(alternatives[0].value)
        const now = new Date()

        const diff = differenceInCalendarDays(now,lastUpdate)

        if(diff>35){
            score = 10;
        }
    }
    return {
        maxScore: 10,
        score
    };
}

const evaluateNumber = (question: IQuestion): QuestionScore => {
    const { alternatives } = question;
    let score = 0;
    if (alternatives[1].value == 1) 
        score = 10
        else{
            
            if(alternatives[0].value>15){
                score = 10;
            }
        }
    return {
        maxScore: 10,
        score
    };
}

const cip10funcs: IFuncTable = [
    {
      keys: [0,3],
      func: evaluateYN,
    },
    {
        keys: [1],
        func: evaluateDate,
    },
    {
        keys: [2],
        func: evaluateNumber,
    },
  ]

const cip10 = async () => await loadQuestions(10, cip10funcs)
export default cip10