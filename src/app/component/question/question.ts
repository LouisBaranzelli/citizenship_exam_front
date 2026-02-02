import {Component, computed, Input, Signal, signal, WritableSignal} from '@angular/core';
import {QuestionStateService} from '../../service/question-state.service';
import {SelectorRightLeft} from '../selector-right-left/selector-right-left';
import {AnwersList} from '../answers-list/anwers-list';

@Component({
  selector: 'question',
  imports: [
    SelectorRightLeft,
    AnwersList
  ],
  templateUrl: './question.html',
  styleUrl: './question.css',
})
export class Question {
  public labelQuestion: Signal<string>;

 constructor(questionService: QuestionStateService) {

 this.labelQuestion = computed(() =>
    questionService.selectedQuestion()?.label ?? ""
  )
 }
}
