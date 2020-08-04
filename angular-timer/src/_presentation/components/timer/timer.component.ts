import {Component, OnInit} from "@angular/core";
import {BehaviorSubject, defer, interval, Observable, Subscription, timer} from "rxjs";
import {UnsubscribeMixin} from "../../../shared/utils/unsubscribe-mixin";
import {map, reduce, share, take, takeUntil, tap, withLatestFrom} from "rxjs/operators";
import {filter} from "rxjs/operators";

@Component({
  selector: "app-timer-component",
  templateUrl: "./timer.component.html",
  styleUrls: ["./timer.component.css"],
})
export class TimerComponent extends UnsubscribeMixin() {
  ticks = 0;
  minutesDisplay: number = 0;
  hoursDisplay: number = 0;
  secondsDisplay: number = 0;

  sub: Subscription;

  isPaused = false;
  timerState: boolean = false;

  constructor() {
    super();
  }

  public timerActions() {
    this.timerState = !this.timerState;
    if (!this.timerState) {
      this.ticks = this.secondsDisplay = this.minutesDisplay = this.hoursDisplay = 0;
      this.sub.unsubscribe();
      return;
    }
    this.startAction();
  }

  private startAction() {
    this.isPaused = false;
    let source = timer(this.isPaused ? 0 : 1000, this.isPaused ? 0 : 1000);
    this.sub = source
      .pipe(
        takeUntil(this.destroy$),
        filter(() => this.isPaused === false)
      )
      .subscribe((time) => {
        this.ticks = time;
        this.secondsDisplay = this.getSeconds(this.ticks);
        this.minutesDisplay = this.getMinutes(this.ticks);
        this.hoursDisplay = this.getHours(this.ticks);
      });
  }

  public resetAction() {
    this.sub.unsubscribe();
    this.ticks = 0;
    this.ticks = this.secondsDisplay = this.minutesDisplay = this.hoursDisplay = 0;
    this.startAction();
  }

  public pauseAction() {
    this.isPaused = !this.isPaused;
  }

  private getSeconds(ticks: number) {
    return this.pad(ticks % 60);
  }

  private getMinutes(ticks: number) {
    return this.pad(Math.floor(ticks / 60) % 60);
  }

  private getHours(ticks: number) {
    return this.pad(Math.floor(ticks / 60 / 60));
  }

  private pad(digit: any) {
    return digit <= 9 ? "0" + digit : digit;
  }
}
