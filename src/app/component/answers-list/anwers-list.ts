import {Component, computed, Input, OnInit, Signal} from '@angular/core';
import {NgForOf} from '@angular/common';
import {Answer} from '../../model/Answer';
import {AnswerButton} from '../answer/answer';

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

  rows = computed(() => {
    const shuffled = [...this.answers()].sort(() => Math.random() - 0.5);
    const chunkSize = 3;
    const result: Answer[][] = [];

    for (let i = 0; i < shuffled.length; i += chunkSize) {
      result.push(shuffled.slice(i, i + chunkSize));
    }

    return result;
  });
}
