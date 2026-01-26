import { Injectable } from '@angular/core';
import {DEFAULT_LANGUAGE, Language} from '../model/Language';
import {Question} from '../model/Question';
import {Level} from '../model/Level';
import {Theme} from '../model/Theme';

@Injectable({
  providedIn: 'root',
})
export class ApiQuestionService {

  private question1: Question = {
    id: 0,
    label: "Quelle est la capital de la france ?",
    answers: [],
    language: DEFAULT_LANGUAGE
  }

  private question2: Question = {
    id: 2,
    label: "Quel est le plus grand pays ?",
    answers: [],
    language: DEFAULT_LANGUAGE
  }
  private question3: Question = {
    id: 3,
    label: "Comment t'appeles tu ? ",
    answers: [],
    language: DEFAULT_LANGUAGE
  }
  private question4: Question = {
    id: 4,
    label: "Quel est le nom de notre planète ?",
    answers: [],
    language: DEFAULT_LANGUAGE
  }
  private question5: Question = {
    id: 5,
    label: "Ou es tu né ?",
    answers: [],
    language: DEFAULT_LANGUAGE
  }
  private questions: Question[];

  constructor() {
    this.questions = [this.question1, this.question2, this.question3, this.question4, this.question5];
  }




  public async fetchQuestion(id: number, language: Language): Promise<Question | null> {
    let question = this.getRandomQuestion()
    question.id = id
    console.log("Generate random question to simulate api: " + question.label)

    return new Promise(resolve => {
      setTimeout(() => resolve(question), 500)
    })
  }

  public async fetchRandomQuestion(level: Level, theme: Theme, language: Language, alreadyAskedQuestions: number[]): Promise<Question | null> {

    let question = this.getRandomQuestion()
    console.log("Generate random question to simulate api: " + question.label)

    return new Promise(resolve => {
      setTimeout(() => resolve(question), 500)
    })
  }

  getRandomQuestion(): Question{

    const randomIndex = Math.floor(Math.random() * this.questions.length);
    const randomQuestion = this.questions[randomIndex];
    return randomQuestion

  }
}
