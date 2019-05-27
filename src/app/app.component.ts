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
  round = 0;

  vote(i) {
    if (!this.blocks[i].voter) {
      this.blocks[i].voter = this.turn;
      this.round += 1;
      this.checkWiner(i);
    }
  }

  checkWiner(i) {
    let vColumn: number = i%3;
    let vRow: number = Math.floor(i/3);

    let row: number[] = [ vRow*3, vRow*3+1, vRow*3+2 ];
    let column: number[] = [ vColumn, 1*3+vColumn, 2*3+vColumn ];

    if ((this.blocks[row[0]].voter === this.blocks[row[1]].voter && this.blocks[row[1]].voter === this.blocks[row[2]].voter)
         || (this.blocks[column[0]].voter === this.blocks[column[1]].voter && this.blocks[column[1]].voter === this.blocks[column[2]].voter)
         || ((vRow === vColumn) && (this.blocks[0].voter === this.blocks[4].voter && this.blocks[4].voter === this.blocks[8].voter))
         || (((vRow + vColumn) === 2) && (this.blocks[2].voter === this.blocks[4].voter && this.blocks[4].voter === this.blocks[6].voter))) {
      setTimeout(() => alert('贏家是 ' + this.blocks[i].voter), 0);
    } else if (this.round === 9) {
      setTimeout(() => alert('平手'), 0);
    } else {
      this.turn = (this.turn === 'o') ? 'x' : 'o';
    }
  }
}
