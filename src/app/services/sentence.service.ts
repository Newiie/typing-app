import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SentenceService {
  private sentence: BehaviorSubject<string>;
  private userInput: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() {
    this.sentence = new BehaviorSubject<string>('The quick brown fox jumps over the lazy dog');
  }

  getSentence(): Observable<string> {
    return this.sentence.asObservable();
  }

  setSentence(newSentence: string): void {
    this.sentence.next(newSentence);
  }

  setUserInput(newInput: string): void {
    this.userInput.next(newInput);
  }

  getUserInput(): Observable<string> {
    return this.userInput.asObservable();
  }

  getColoredSentence(): { char: string, correct: boolean }[] {
    const result = [];
    for (let i = 0; i < this.sentence.getValue().length; i++) {
      result.push({
        char: this.userInput.getValue()[i],
        correct: this.userInput.getValue()[i] === this.sentence.getValue()[i]
      });
    }
    return result;
  }
}
