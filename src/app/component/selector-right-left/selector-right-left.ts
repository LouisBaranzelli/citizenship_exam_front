import {Component, computed, effect, Signal} from '@angular/core';
import {QuestionStateService} from '../../service/question-state.service';

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

  constructor(questionService: QuestionStateService) {
    this.questionService = questionService
    this.nextIsDisable = computed(() => questionService.theme() === null)
    this.previousIsDisable = computed(() =>
      questionService.cursor() == 0 || questionService.cursor() === null)
  }

  toNext(){
    this.questionService.goToNext();
  }


  toPrevious(){
    this.questionService.goToPrevious();
  }



}
