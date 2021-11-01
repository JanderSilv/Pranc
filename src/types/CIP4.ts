import CIP from './CIP'
import { VRF } from './enums'
import IAlternative from './IAlternative'
import IQuestion, { IFuncTable, IQuestionEvaluate } from './IQuestion'
import {addMonths, differenceInDays, differenceInMonths} from 'date-fns'

const evaluateYN = (question:IQuestion,alternatives: IAlternative[]):number =>{
    const resp = alternatives[0];
    return (resp.value == 1 || resp.value == true)? 0:5; 
}

const evaluateLastGoodPraticesUpdate=(question:IQuestion,alternatives: IAlternative[]):number=>{
    if(alternatives[1].value == true|| alternatives[1].value == 1) return 10;
    const lastUpdate = new Date(alternatives[0].value);
    const now = new Date();

   const diffm = differenceInMonths(lastUpdate,now);  
 
   if(diffm <= 3) return 0;
   const aux = addMonths(lastUpdate,3);
   const diffd = differenceInDays(aux,now)
   if(diffd < 10){
       return 3;
   }else if(diffd < 30){
       return 5;
   }else{
       return 8;
   }

}

const cip4funcs : IFuncTable = [
    {
        keys:[0],
        func:evaluateLastGoodPraticesUpdate
    },
    {
        keys:[1,2],
        func:evaluateYN
    }
]

class CIP4 extends CIP{
    constructor() {
        super(4, cip4funcs)
      }
}

// const obj = new CIP4();

// //jandinho pega as questoes
// const questions =  obj.getQuestions();

// //renderiza 
// //{...}
// //pega as resposta

// obj.updateState(/* e bota aqui */questions);

// //e pega as nota
// const nota = obj.evaluate();