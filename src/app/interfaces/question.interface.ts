import { QuestionType } from '../enums/question-type.enum';

export type QuestionAnswer = string | boolean | null;

export interface Question {
  title: string;
  type: QuestionType;
  answer: QuestionAnswer;
}
