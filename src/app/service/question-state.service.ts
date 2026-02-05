import {computed, effect, Injectable, Injector, runInInjectionContext, signal} from '@angular/core';
import {Question} from '../model/Question';
import {Theme} from '../model/Theme';
import {DEFAULT_LANGUAGE, Language, LanguageID, LANGUAGES} from '../model/Language';
import {ApiQuestionService} from './api-question.service';
import {Level} from '../model/Level';
import {log} from '@angular-devkit/build-angular/src/builders/ssr-dev-server';

@Injectable({
  providedIn: 'root',
})
export class QuestionStateService {

  private apiService: ApiQuestionService;

  public level = signal<Level>(Level.L1);

  public theme = signal<Theme | null>(null);

  public language =  signal<Language>(DEFAULT_LANGUAGE)

  public cursor = signal<number | null>(null);

  public historyId = signal<Array<number>>([]);

  private cacheQuestion = signal<Map<string, Map<number, Question>>>(new Map()) // id langue {id question / Question)

  // pour indiquer si une question a été validé ou pas
  public showResults = signal<Map<number, boolean>>(new Map()) // id Question, ...

  public disableNextQuestion = computed(() => {
    const theme: Theme | null = this.theme()
    const level: Level | null = this.level()
    if (!theme || !level) {
      return true
    } else {
      if (!this.apiService.mapRunningOutOfQuestion().has(this.apiService.getKey(theme, level))) {
        return false
      }
      return this.apiService.mapRunningOutOfQuestion().get(this.apiService.getKey(theme, level))
    }

  })
  constructor(apiService: ApiQuestionService, injector: Injector) {
    this.apiService = apiService
    apiService.test()
    runInInjectionContext(injector, () => {

      for (let language of LANGUAGES){
        this.cacheQuestion.update(old => {
          const newMap = new Map(old);
          newMap.set(language, new Map<number, Question>());
          return newMap;
        });
      }

      effect(() => {
        const language = this.language();
        const historyId = this.historyId();
        const cursor = this.cursor();

        console.log("effect language activate")
        if (cursor !== null && cursor < historyId.length) {
          const id = historyId[cursor];
          const cache = this.cacheQuestion().get(language.id)!

          if (!cache.has(id)) {
            (async () => {
              await this.fetchQuestion(historyId[cursor], language);
            })();
            console.log("fetch has been performed")
          }
          else {
            console.log("No need to fetch")

          }
        }
      });



    })}



  public selectedQuestion = computed(() => {


    console.log("Selected question recalculated ")

    let index: number | null = this.cursor();
    console.log("actual cursor: " + index)

    let language: Language = this.language()
    let cache: Map<number, Question> = this.cacheQuestion().get(language.id)!
    let historyId: Array<number> = this.historyId();


    if (index === null || historyId.length === 0){
      return null
    }

    let idSelected: number = index < historyId.length ? historyId[index] : historyId[historyId.length - 1]
    console.log("question id: " + idSelected + " at cursor: " + index)

    let questionCache: Question | null = cache.get(idSelected) ?? null;
    if (questionCache === null) {
      console.log("question in cache not found")
      return null;
    }
    console.log("question in cache found: " + questionCache.question)
    return questionCache;

  })

  public goToPrevious() {
    console.log("go to previous")
    if (this.cursor() === null || this.cursor() === 0){
      return;
    }
    this.cursor.update((i => i !== null ? i-1 : null))
  }

  public async goToNext() {

    console.log("goToNext")
    let index: number | null = this.cursor()
    if (index !== null && index < this.historyId().length - 1){
      this.cursor.update((i => i !== null ? i+1 : null))
      return;
    }

    const theme: Theme | null = this.theme()
    if (this.level === null || theme === null) {
      return
    }

    let newIndex: number;
    let question:  Question | null
    console.log("fetche random question")
    if (this.cursor() === null){
      question = await this.apiService.fetchRandomQuestion(this.level(), theme, this.language(), [])

      newIndex = 0
    } else {
      question = await this.apiService.fetchRandomQuestion(this.level(), theme, this.language(), this.historyId())
      newIndex = this.historyId().length
    }
     if (question === null){
       console.log("question fetched is null")
       return;
     } else{
       this.updateCache(this.language(), question);
       console.log("fetched: " + question.question)
       this.historyId.update(ids => [...ids, question.id])
       this.cursor.set(newIndex)
     }

  }

  private async fetchQuestion(id: number, language: Language) {
    console.log("fetch new question id: " + id + " language: " + language.id)
    const question: Question | null = await this.apiService.fetchQuestion(id, language);
    if (question !== null) {
      console.log("Update du cache avec question id: " + id + " language: " + language.id + " question: " + question.question)
      this.updateCache(language, question);
    }
  }


  private updateCache(language: Language, question: Question | null){
    if (question === null){
      console.log("failed to save in the cache")
      return
    }
    this.cacheQuestion.update(old => {
      const newMap = new Map(old);
      let mapLanguageSelected : Map<number, Question> = newMap.get(language.id)!
      mapLanguageSelected.set(question.id,  question)
      newMap.set(language.id, mapLanguageSelected)
      return newMap
    })
  }

}
