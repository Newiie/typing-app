import { Injectable } from '@angular/core';
import { SentenceService } from './sentence.service';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  elapsedTimeInSeconds: number = 0;
  private wpm: number = 0;
  intervalId: any;
  private accuracy: number = 0;
  startTime: number = 0;
   
  private countCorrect: number = 0;
  private countIncorrect: number = 0;

  private sentence: string = '';
  private userInput: string = '';

  constructor(private sentenceService : SentenceService) { 
   this.sentenceService.getSentence().subscribe((sentence) => {
      this.sentence = sentence;
    });

    this.sentenceService.getUserInput().subscribe((userInput) => {
      this.userInput = userInput;
    })
  }

  setStartTime(startTime: number) {
    this.startTime = startTime;
    this.intervalId = setInterval(() => {
      this.elapsedTimeInSeconds = Math.floor((Date.now() - this.startTime) / 1000);
    }, 1000);
  }

  clearInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  getWPM(): number {
    if (this.elapsedTimeInSeconds === 0) return 0;
    const wordsTyped = this.userInput.split(' ').length;
    this.wpm = Math.round((wordsTyped / this.elapsedTimeInSeconds) * 60);
    return this.wpm;
  }

  getAccuracy(): number {
    if (this.userInput.length === 0) return 100;
    let correctChars = 0;
    const minLength = Math.min(this.userInput.length, this.sentence.length);
    for (let i = 0; i < minLength; i++) {
      if (this.userInput[i] === this.sentence[i]) {
        correctChars++;
      }
    }
    this.accuracy = Math.round((correctChars / this.userInput.length) * 100);
    return this.accuracy;
  }

  getCount(): { correct: number, incorrect: number } {
    this.countCorrect = 0;
    this.countIncorrect = 0;
    for (let i = 0; i < this.userInput.length; i++) {
      if (this.userInput[i] === this.sentence[i]) {
        this.countCorrect++;
      } else {
        this.countIncorrect++;
      }
    }
    return {
      correct: this.countCorrect,
      incorrect: this.countIncorrect
    };
  }
}
