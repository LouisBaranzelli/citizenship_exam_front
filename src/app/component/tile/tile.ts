import {Component, EventEmitter, Input, Output} from '@angular/core';
import {required} from '@angular/forms/signals';
import {TranslatePipe} from '@ngx-translate/core';
import {CapitalizePipe} from '../../pipe/capitalize-pipe';
import {NgClass} from '@angular/common';

@Component({
  selector: 'tile',
  imports: [
    TranslatePipe,
    CapitalizePipe,
    NgClass
  ],
  templateUrl: './tile.html',
  styleUrl: './tile.css',
})
export class Tile {
@Input({required: true}) size!: number
  @Input({required: true}) label!: string
  @Input() selected: boolean = false;
  @Output() emitter: EventEmitter<string> = new EventEmitter

  constructor() {
  }

  clickOnTile(){
    this.emitter.emit(this.label)
  }

}
