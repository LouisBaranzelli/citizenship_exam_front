import {Component, EventEmitter, Input, Output, output} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {CapitalizePipe} from '../../pipe/capitalize-pipe';
import {required} from '@angular/forms/signals';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-drop-down',
  imports: [
    TranslateModule,
    CapitalizePipe,
    NgForOf,
    NgIf
  ],
  templateUrl: './drop-down.html',
  styleUrl: './drop-down.css',
})
export class DropDown {

  @Input({required: true}) items!: string[]
  @Input({required: true}) label!: string
  @Input({required: true}) width!: number
  @Output() selectedChange = new EventEmitter<string>


  public open: boolean = false
  public itemSelected: string | null = null

  protected toggle() {
    this.open = !this.open
    console.log(this.open)
  }

  protected selectItem(item: string) {
    this.open = false;
    this.itemSelected = item
    this.selectedChange.emit(item)
  }
}
