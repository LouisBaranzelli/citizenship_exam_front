import {computed, effect, Injectable, Injector, output, runInInjectionContext, signal} from '@angular/core';
import {Question} from '../model/Question';
import {Theme} from '../model/Theme';
import {DEFAULT_LANGUAGE, Language} from '../model/Language';
import {ApiQuestionService} from './api-question.service';
import {Level} from '../model/Level';

@Injectable({
  providedIn: 'root',
})
export class QuestionStateService {

  private apiService: ApiQuestionService;

  private level: Level | null = null;

  private _theme: Theme | null = null

  private language =  signal<Language>(DEFAULT_LANGUAGE)

  private cursor = signal<number | null>(null);

  public historyId = signal<Array<number>>([]);

  private cacheQuestion = signal<Map<string, Map<number, Question>>>(new Map())

  constructor(apiService: ApiQuestionService, injector: Injector) {
    this.apiService = apiService

    runInInjectionContext(injector, () => {
      effect(() => {
        const q = this.selectedQuestion();
        const index = this.cursor();
      });
    });
  }

  public selectedQuestion = computed(() => {
    let index: number | null = this.cursor();
    let language: Language = this.language()
    let cache: Map<number, Question> = this.cacheQuestion().get(language.id) ?? new Map<number, Question>()
    let previousQuestions: Array<number> = this.historyId();


    if (index === null || previousQuestions.length === 0){
      return null
    }

    let idSelected: number = index <previousQuestions.length ? previousQuestions[index] : previousQuestions[previousQuestions.length - 1]
    let questionCache: Question | null = cache.get(idSelected) ?? null;
    if (questionCache === null) {
      return null;
    }
    return questionCache;

  })

  public goToPrevious() {
    if (this.cursor() === null || this.cursor() === 0){
      return;
    }
    this.cursor.update((i => i !== null ? i-1 : null))
  }

  public async goToNext() {

    let index: number | null = this.cursor()
    if (index !== null && index < this.historyId().length - 1){
      this.cursor.update((i => i !== null ? i+1 : null))
      return;
    }

    if (this.level === null || this._theme === null) {
      return
    }

    let newIndex: number;
    let question:  Question | null
    if (this.cursor() === null){
      question = await this.apiService.fetchRandomQuestion(this.level, this._theme, this.language(), [])
      newIndex = 0
    } else {
      question = await this.apiService.fetchRandomQuestion(this.level, this._theme, this.language(), this.historyId())
      newIndex = this.historyId().length
    }
     if (question === null){
       return;
     } else{
       this.updateCache(this.language(), question);
       this.historyId.update(ids => [...ids, question.id])
       this.cursor.set(newIndex)
     }

  }

  private async fetchQuestion(id: number, language: Language) {
    let cache: Map<number, Question> = this.getCache(language)
    let output: Question | null = cache.get(id) ?? null;
    if (output === null){
      const question: Question | null = await this.apiService.fetchQuestion(id, language);
      if (question !== null) {
        this.updateCache(language, question);
      }
    }
  }

  private getCache(language: Language): Map<number, Question> {
    return  this.cacheQuestion().get(language.id) ?? new Map()
  }

  private updateCache(language: Language, question: Question){
    this.cacheQuestion.update(old => {
      const newMap = new Map(old);
      let mapLanguageSelected : Map<number, Question> = newMap.get(language.id) ?? new Map()
      mapLanguageSelected.set(question.id,  question)
      newMap.set(language.id, mapLanguageSelected)
      return newMap
    })
  }

  set theme(value: Theme | null) {
    this._theme = value;
  }


}
