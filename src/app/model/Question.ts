import {Language} from './Language';
import {Answer} from './Answer';

export interface Question {
  id: number,
  language: Language,
  label: string,
  answers: Answer[]
}
