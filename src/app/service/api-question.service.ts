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


  private httpClient: HttpClient

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient
  }


  public async fetchQuestion(id: number, language: Language): Promise<Question | null> {

    try {
      console.info(environment.apiUrl + "/questions/" + language.id.slice(-2) + "/" + id)
      const question: Question = await firstValueFrom(this.httpClient.get<Question>(environment.apiUrl + "/questions/" + language.id.slice(-2) + "/" + id))
      return question
    } catch (error){
      console.error(error)
      }
      return null
    }

  public async fetchRandomQuestion(level: Level, theme: Theme, language: Language, alreadyAskedQuestions: number[]): Promise<Question | null> {

    try {
      const question: Question = await firstValueFrom(this.httpClient.post<Question>(environment.apiUrl + "/questions/" + language.id.slice(-2) + "/" + theme.id.slice(-2) + "/" + level.slice(-2), alreadyAskedQuestions))
      question.answers.forEach(a => a.isSelected = false)
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


  public test() {
    this.httpClient.get(environment.apiUrl + "/questions/test").subscribe(res => console.log(res))
  }

  public getKey(theme:Theme, level: Level) : string {
    return `${theme}-${level}`
  }
}
