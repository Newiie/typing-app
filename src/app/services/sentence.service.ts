import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SentenceService {
  private sentenceSubject: BehaviorSubject<string>;
  private userInputSubject: BehaviorSubject<string>;


  constructor() {
    this.userInputSubject = new BehaviorSubject<string>('');
    this.sentenceSubject = new BehaviorSubject<string>('The quick brown fox jumps over the lazy dog');
  }

  getSentence(): Observable<string> {
    return this.sentenceSubject.asObservable();
  }

  setSentence(newSentence: string): void {
    this.sentenceSubject.next(newSentence);
  }

  setUserInput(newInput: string): void {
    this.userInputSubject.next(newInput);
  }

  getUserInput(): Observable<string> {
    return this.userInputSubject.asObservable();
  }
}
