import {Component, computed, effect, Signal} from '@angular/core';
import {QuestionStateService} from '../../service/question-state.service';
import {Question} from '../../model/Question';

@Component({
  selector: 'selector-right-left',
  imports: [],
  templateUrl: './selector-right-left.html',
  styleUrl: './selector-right-left.css',
})
export class SelectorRightLeft {
  private questionService: QuestionStateService;
  protected nextIsDisable: Signal<boolean>;
  protected previousIsDisable: Signal<boolean>;
  protected showAnswerIsDisable: Signal<boolean>;

  constructor(questionService: QuestionStateService) {
    this.questionService = questionService
    this.nextIsDisable = computed(() => questionService.theme() === null)
    this.previousIsDisable = computed(() =>
      questionService.cursor() == 0 || questionService.cursor() === null)

    this.showAnswerIsDisable = computed(() => {
      const question: Question | null = questionService.selectedQuestion()
      if (question === null || questionService.showResults().get(question.id) == true){
        return true
      }
      return false
    })
  }

  toNext(){
    this.questionService.goToNext();
  }


  toPrevious(){
    this.questionService.goToPrevious();
  }


  protected showAnswer() {
    const question: Question | null = this.questionService.selectedQuestion()
    if (question !== null){
      this.questionService.showResults.update((old) => {
        const updated = new Map(old)
        console.log("show result set à true with id: " + question.id)
        updated.set(question.id, true)
        return updated
      })
    }
  }
}
