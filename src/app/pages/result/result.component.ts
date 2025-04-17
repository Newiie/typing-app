import { Component, OnInit } from '@angular/core';
import { SentenceService } from 'src/app/services/sentence.service';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  sentence: string = '';
  userInput: string = '';
  countCorrect: number = 0;
  countIncorrect: number = 0;

  constructor(
    private sentenceService: SentenceService,
    private statsService: StatsService
  ) { }

  getWPM(): number {
    return this.statsService.getWPM();
  }

  getAccuracy(): number {
    return this.statsService.getAccuracy();
  }

  getCount(): { correct: number, incorrect: number } {
    return this.statsService.getCount();
  }

  ngOnInit() {
    this.sentenceService.getSentence().subscribe((sentence) => {
      this.sentence = sentence;
    });

    this.sentenceService.getUserInput().subscribe((userInput) => {
      this.userInput = userInput;
    });

    console.log("Sentence: ", this.sentence);
    console.log("User Input: ", this.userInput);
    console.log("Count: ", this.getCount());
  }
}
