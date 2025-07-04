import { QuestionType } from '../../../enums/question-type.enum';

export interface CreateForm {
  firstStep: {
    type: QuestionType;
  };
  secondStep: {
    title: string;
  };
}
