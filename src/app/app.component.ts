import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { Block } from './block';
import { BLOCKS } from './mock-blocks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'tic-tac-toe';

  blocks: Block[] = [];
  turn: string;
  gameStatus: string;
  round: number;

  ngOnInit() {
    setInterval(() => {
      this.changeDetectorRef.markForCheck();
    }, 100)
  }

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.gameReset(undefined, undefined);
  }

  vote(i, oTimer, xTimer) {
    if (this.gameStatus !== 'battle' || this.blocks[i].voter) {
      return;
    }
    this.blocks[i].voter = this.turn;
    this.round += 1;
    this.checkWiner(i, oTimer, xTimer);
  }

  gameStart(oTimer) {
    this.gameStatus = 'battle';
    oTimer.start();
  }

  gameStop() {
    this.gameStatus = 'stop';
    console.log('gameReset', this.blocks, 'status', this.gameStatus);
  }

  gameReset(oTimer, xTimer) {
    this.gameStatus = 'reset';
    this.blocks = JSON.parse(JSON.stringify(BLOCKS));
    this.turn = 'o';
    this.round = 0;
    if (oTimer) { oTimer.stop(); oTimer.reset(); }
    if (xTimer) { xTimer.stop(); xTimer.reset(); }
    console.log('gameReset', this.blocks, 'status', this.gameStatus);
  }

  checkWiner(i, oTimer, xTimer) {
    let vColumn: number = i%3;
    let vRow: number = Math.floor(i/3);

    let row: number[] = [ vRow*3, vRow*3+1, vRow*3+2 ];
    let column: number[] = [ vColumn, 1*3+vColumn, 2*3+vColumn ];

    if ((this.blocks[row[0]].voter === this.blocks[row[1]].voter && this.blocks[row[1]].voter === this.blocks[row[2]].voter)
         || (this.blocks[column[0]].voter === this.blocks[column[1]].voter && this.blocks[column[1]].voter === this.blocks[column[2]].voter)
         || ((vRow === vColumn) && (this.blocks[0].voter === this.blocks[4].voter && this.blocks[4].voter === this.blocks[8].voter))
         || (((vRow + vColumn) === 2) && (this.blocks[2].voter === this.blocks[4].voter && this.blocks[4].voter === this.blocks[6].voter))) {
      this.gameStop();
      oTimer.stop();
      xTimer.stop();
      setTimeout(() => alert('贏家是 ' + this.blocks[i].voter), 0);
    } else if (this.round === 9) {
      this.gameStop();
      oTimer.stop();
      xTimer.stop();
      setTimeout(() => alert('平手'), 0);
    } else {
      if (this.turn === 'o') {
        this.turn = 'x';
        oTimer.stop();
        xTimer.start();
      } else {
        this.turn = 'o';
        oTimer.start();
        xTimer.stop();
      }
    }
  }

  winer(i) {
    this.gameStop();
    setTimeout(() => alert('贏家是 ' + i), 0);
  }
}
