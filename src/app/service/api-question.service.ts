import { Injectable } from '@angular/core';
import {DEFAULT_LANGUAGE, Language} from '../model/Language';
import {Question} from '../model/Question';
import {queue} from 'rxjs';
import {Level} from '../model/Level';
import {Theme} from '../model/Theme';

@Injectable({
  providedIn: 'root',
})
export class ApiQuestionService {

  private question1: Question = {
    id: 0,
    label: "label",
    answers: [],
    language: DEFAULT_LANGUAGE
  }

  public async fetchQuestion(id: number, language: Language): Promise<Question | null> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.question1), 500)
    })
  }

  public async fetchRandomQuestion(level: Level, theme: Theme, language: Language, alreadyAskedQuestions: number[]): Promise<Question | null> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.question1), 500)
    })
  }
}
