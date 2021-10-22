import { ApplicabeSystem, QuestionType } from "./enums";
import IResponse from "./IResponse";

interface IQuestion{
    id: number;
    title: string;
    text: string;
    type: QuestionType;
    applicabeSystem: ApplicabeSystem;
    responses: IResponse[];
    evaluate : (response: IResponse[])=> number;
}



export default IQuestion;