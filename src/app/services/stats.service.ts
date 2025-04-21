import { Injectable } from '@angular/core';
import { SentenceService } from './sentence.service';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  elapsedTimeInSeconds: number = 0;
  private wpm: number = 0;
  intervalId: any;
  private accuracy: number = 0;
  startTime: number = 0;

  private countIncorrectSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  countIncorrect$ = this.countIncorrectSubject.asObservable();

  private sentence: string = '';
  private userInput: string = '';

  private destroy$ = new Subject<void>();

  constructor(private sentenceService: SentenceService) {
    this.sentenceService
      .getSentence()
      .pipe(takeUntil(this.destroy$))
      .subscribe((sentence) => {
        this.sentence = sentence;
      });

    this.sentenceService
      .getUserInput()
      .pipe(takeUntil(this.destroy$))
      .subscribe((userInput) => {
        this.userInput = userInput;
      });
  }

  incrementCountIncorrect() {
    this.countIncorrectSubject.next(this.countIncorrectSubject.value + 1);
  }

  resetCountIncorrect() {
    this.countIncorrectSubject.next(0);
  }

  setStartTime(startTime: number) {
    this.startTime = startTime;
    this.intervalId = setInterval(() => {
      this.elapsedTimeInSeconds = Math.floor(
        (Date.now() - this.startTime) / 1000
      );
    }, 1000);
  }

  clearInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  getWPM(): number {
    if (this.elapsedTimeInSeconds === 0 || this.userInput.trim().length === 0)
      return 0;
    const wordsTyped = this.userInput.trim().split(/\s+/).length;
    this.wpm = Math.round((wordsTyped / this.elapsedTimeInSeconds) * 60);
    return this.wpm;
  }

  getAccuracy(): number {
    if (this.userInput.length === 0) return 100;
  
    const totalChars = Math.max(this.userInput.length, this.sentence.length);
    const incorrect = Math.min(this.countIncorrectSubject.value, totalChars);
  
    this.accuracy = Math.round(((totalChars - incorrect) / totalChars) * 100);
    return this.accuracy;
  }
  

  // getAccuracy(): number {
  //   if (this.userInput.length === 0) return 100;
  //   let correctChars = 0;
  //   const minLength = Math.min(this.userInput.length, this.sentence.length);
  //   for (let i = 0; i < minLength; i++) {
  //     if (this.userInput[i] === this.sentence[i]) {
  //       correctChars++;
  //     }
  //   }
  //   this.accuracy = Math.round((correctChars / this.userInput.length) * 100);
  //   return this.accuracy;
  // }

  getCount(): { correct: number; incorrect: number } {
    // this.countIncorrect$ = 0;

    const minLength = Math.min(this.userInput.length, this.sentence.length);

    // for (let i = 0; i < minLength; i++) {
    //   if (this.userInput[i] === this.sentence[i]) {
    //     this.countCorrect++;
    //   } else {
    //     // this.countIncorrect++;
    //   }
    // }

    // this.countIncorrect += Math.abs(
    //   this.userInput.length - this.sentence.length
    // );

    return {
      correct: minLength - this.countIncorrectSubject.value,
      incorrect: this.countIncorrectSubject.value,
    };
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
