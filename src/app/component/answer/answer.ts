import {Component, Input} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'answer',
  imports: [
    NgClass
  ],
  templateUrl: './answer.html',
  standalone: true,
  styleUrl: './answer.css',
})
export class Answer {

  protected isSelected: boolean = false

  @Input({required: true}) label!: string;
  @Input({required: true}) isCorrect!: boolean;
  @Input({required: true}) displayed!: boolean;

  protected toggleSelected() {
    this.isSelected = !this.isSelected
  }
}
