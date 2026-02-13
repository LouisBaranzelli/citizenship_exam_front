import {Language} from './Language';
import {Answer} from './Answer';

export interface Question {
  id: number,
  language: Language,
  question: string,
  answers: Answer[],
  theme: String,
  level: String
  pathImage: string
}
