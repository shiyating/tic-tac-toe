import { Component } from '@angular/core';
import { Block } from './block';
import { BLOCKS } from './mock-blocks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tic-tac-toe';

  blocks = BLOCKS;

  turn = 'o';

}
