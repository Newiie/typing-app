import { Component, OnInit } from '@angular/core';
import { SentenceService } from 'src/app/services/sentence.service';
import { Router } from '@angular/router';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-typingtest',
  templateUrl: './typingtest.component.html',
  styleUrls: ['./typingtest.component.css']
})
export class TypingtestComponent implements OnInit {

  sentence: string = '';
  userInput: string = '';
  // startTime: number | null = null;

 
  constructor(
    private sentenceService: SentenceService,
    private statsService: StatsService,
    private router: Router
  ) { }

  getColoredSentence(): { char: string, correct: boolean }[] {

    const result = this.sentence.split('').map((char, index) => {
      return {
        char: this.userInput[index] || this.sentence[index],
        correct: this.userInput[index] === char
      };
    });

    return result;
  }

  disableEvent(event: ClipboardEvent): void {
    event.preventDefault();
  }

  

  onUserInput() {
    if (this.statsService.startTime === 0 && this.userInput.length > 0) {
      this.statsService.setStartTime(Date.now());
      // this.intervalId = setInterval(() => this.updateWPM(), 1000);
    }

    this.sentenceService.setUserInput(this.userInput);
    if (this.userInput.length === this.sentence.length) {
      this.statsService.clearInterval();
      // this.getCount();
      // clearInterval(this.intervalId);
      this.router.navigate(['/result']);
    }
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
  
    return (correctChars / this.userInput.length) * 100;
  }
  
  getWPM(): number {
    return this.statsService.getWPM();
  }

  resetTest() {
    this.userInput = '';
    // this.startTime = null;
    this.statsService.elapsedTimeInSeconds = 0;
    // this.statsService.wpm = 0;
    clearInterval(this.statsService.intervalId);
  }

  ngOnInit() {
    this.sentenceService.getSentence().subscribe((data: any) => {
      this.sentence = data;
    });

    this.sentenceService.getUserInput().subscribe((data: any) => {
      this.userInput = data;
    });
  }
}
