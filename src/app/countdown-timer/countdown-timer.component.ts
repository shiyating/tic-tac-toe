import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-countdown-timer',
  template: `{{ seconds | number:'2.1' }}`
})
export class CountdownTimerComponent implements OnInit, OnDestroy {
  @Output() timeout = new EventEmitter<boolean>();

  private defaultSeconds = 60;

  intervalId = 0;
  seconds = this.defaultSeconds;

  clearTimer() { clearInterval(this.intervalId); }

  ngOnInit()    { }
  ngOnDestroy() { this.clearTimer(); }

  start() { this.countDown(); }
  stop()  {
    this.clearTimer();
  }
  reset() {
    this.seconds = this.defaultSeconds;
  }

  private countDown() {
    this.clearTimer();
    this.intervalId = window.setInterval(() => {
      this.seconds -= 0.1;
      if (this.seconds <= 0) {
        this.stop();
        this.timeout.emit(true);
        if (this.seconds < 0) { this.seconds = 0; }
      }
    }, 100);
  }
}
