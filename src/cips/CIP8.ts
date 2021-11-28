import IQuestion, { IFuncTable } from '../types/IQuestion'
import { loadQuestions, QuestionScore } from 'src/types/CIP'
import { IAlternative } from 'src/types';

const evaluateYN = (question: IQuestion): QuestionScore => {

    const maxScore = 3 * (question?.vrf? question.vrf : 2);

    const { alternatives } = question
    const response = alternatives[0].value
    const score = (response == true) ? 0 : maxScore
  
    return {
      maxScore,
      score
    };
  }
  

const evaluateAssetsIdentification = (question: IQuestion): QuestionScore => {
    const maxScore = 3 * (question?.vrf? question.vrf : 3);
    const frac = maxScore/4;

    const alt: IAlternative = question.alternatives.filter( v => v.value == true)[0];
    const score = frac * (alt?.vsl?alt.vsl : 3);

    return {
        maxScore,
        score
    };
}

const cip8funcs: IFuncTable = [
    {
      keys: [1,2],
      func: evaluateAssetsIdentification,
    },
    {
      keys: [0,3,4],
      func: evaluateYN,
    },
  ]

const cip8 = async () => await loadQuestions(8, cip8funcs)
export default cip8