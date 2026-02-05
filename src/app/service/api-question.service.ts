import {Injectable, signal, Signal} from '@angular/core';
import {DEFAULT_LANGUAGE, Language} from '../model/Language';
import {Question} from '../model/Question';
import {Level} from '../model/Level';
import {Theme} from '../model/Theme';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiQuestionService {

  public mapRunningOutOfQuestion =  signal<Map<string, boolean>>(new Map<string, boolean>())

  private question1: Question = {
    id: 0,
    question: "Quelle est la capital de la france ?",
    answers: [{id: 0, answer:"Oui", correct:true},
            {id: 1, answer:"Non", correct:false},
            {id: 2, answer:"Peut-être", correct:false},
            {id: 3, answer:"bien-sûr", correct:false},
            ],
    language: DEFAULT_LANGUAGE,
    theme: "T1",
    level: "L1",
  }

  private question2: Question = {
    id: 2,
    question: "Quel est le plus grand pays ?",
    answers: [{id: 0, answer:"Grand", correct:true},
      {id: 1, answer:"petit", correct:false},
      {id: 2, answer:"moyen", correct:false},
    ],
    language: DEFAULT_LANGUAGE,
    theme: "T1",
    level: "L1",
  }
  // private question3: Question = {
  //   id: 3,
  //   label: "Comment t'appeles tu ? ",
  //   answers: [],
  //   language: DEFAULT_LANGUAGE
  // }
  private question4: Question = {
    id: 4,
    question: "Quel est le nom de notre planète ?",
    answers: [{id: 0, answer:"Oui", correct:true},
      {id: 1, answer:"Non", correct:false}
    ],
    language: DEFAULT_LANGUAGE,
    theme: "T1",
    level: "L1",

  }
  // private question5: Question = {
  //   id: 5,
  //   label: "Ou es tu né ?",
  //   answers: [],
  //   language: DEFAULT_LANGUAGE
  // }
  private questions: Question[];
  private httpClient: HttpClient

  constructor(httpClient: HttpClient) {
    this.questions = [this.question1, this.question2, this.question4];
    this.httpClient = httpClient
  }




  public async fetchQuestion(id: number, language: Language): Promise<Question | null> {
    let question = this.getRandomQuestion()
    question.id = id
    console.log("Generate random question to simulate api: " + question.question)
    return new Promise(resolve => {
      setTimeout(() => resolve(question), 500)
    })
  }

  public async fetchRandomQuestion(level: Level, theme: Theme, language: Language, alreadyAskedQuestions: number[]): Promise<Question | null> {

    try {
      const question: Question = await firstValueFrom(this.httpClient.post<Question>(environment.apiUrl + "/questions/" + language.id.slice(-2) + "/" + theme.id.slice(-2) + "/" + level.slice(-2), alreadyAskedQuestions))
      return question
    } catch (error){
      console.error(error)
      this.mapRunningOutOfQuestion.update((old) => {
        const newMap: Map<string, boolean> = new Map(old)
        newMap.set(this.getKey(theme, level), true)
        return newMap
      })
      return null
    }
  }

  getRandomQuestion(): Question{

    const randomIndex = Math.floor(Math.random() * this.questions.length);
    const randomQuestion = this.questions[randomIndex];
    return randomQuestion

  }

  public test() {
    this.httpClient.get(environment.apiUrl + "/questions/test").subscribe(res => console.log(res))
  }

  public getKey(theme:Theme, level: Level) : string {
    return `${theme}-${level}`
  }
}
