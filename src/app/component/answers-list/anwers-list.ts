import {Component, Input, OnInit} from '@angular/core';
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
export class AnwersList implements OnInit{
   @Input({required: true}) answers!: Answer[]

  public rows: Answer[][] = [];

  ngOnInit() {
     this.answers.sort(() => Math.random() - 0.5);
     const chunkSize = 3;
     for (let i = 0; i < this.answers.length; i += chunkSize) {
       this.rows.push(this.answers.slice(i, i + chunkSize));
     }

   }
}
