import {Component, computed, Input, OnInit, Signal} from '@angular/core';
import {NgForOf} from '@angular/common';
import {Answer} from '../../model/Answer';
import {AnswerButton} from '../answer/answer';
import {QuestionStateService} from '../../service/question-state.service';

@Component({
  selector: 'answers-list',
  imports: [
    NgForOf,
    AnswerButton
  ],
  templateUrl: './answers-list.html',
  styleUrl: './answers-list.css',
})

export class AnswersList {
  @Input({required: true}) answers!: Signal<Answer[]>;
  @Input({required: true}) showResults!: Signal<boolean>;
  private questionStateService: QuestionStateService;

  constructor(questionStateService: QuestionStateService) {
    this.questionStateService = questionStateService
  }

  rows = computed(() => {
    const shuffled = [...this.answers()].sort((a, b) => this.questionStateService.randomConstInt % this.answers().indexOf(a));
    const chunkSize = 3;
    const result: Answer[][] = [];

    for (let i = 0; i < shuffled.length; i += chunkSize) {
      result.push(shuffled.slice(i, i + chunkSize));
    }

    return result;
  });

  selelectionQuestion(answer: Answer, isSelected: boolean){
    this.answers().find(a => a.id === answer.id)!.isSelected = isSelected
  }
}
