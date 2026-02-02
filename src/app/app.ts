import { Component, signal } from '@angular/core';
import {MainLayout} from './component/main-layout/main-layout';

@Component({
  selector: 'app',
  imports: [MainLayout],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('examen_citoyennete');
}
