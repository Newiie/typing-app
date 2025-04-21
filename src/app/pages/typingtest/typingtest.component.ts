import { Component, OnInit, OnDestroy } from '@angular/core';
import { SentenceService } from 'src/app/services/sentence.service';
import { Router } from '@angular/router';
import { StatsService } from 'src/app/services/stats.service';
import { takeUntil, Subject } from 'rxjs';

@Component({
  selector: 'app-typingtest',
  templateUrl: './typingtest.component.html',
  styleUrls: ['./typingtest.component.css'],
})
export class TypingtestComponent implements OnInit, OnDestroy {
  sentence: string = '';
  userInput: string = '';

  wpm: number = 0;
  accuracy: number = 0;

  private destroy$ = new Subject<void>();
  private incorrectIndices = new Set<number>();

  constructor(
    private sentenceService: SentenceService,
    private statsService: StatsService,
    private router: Router
  ) {}

  getCursorIndex(): number {
    return this.userInput.length - 1;
  }

  getColoredSentence(): { char: string; correct: string; isCursor: boolean }[] {
    const cursorIndex = Math.min(
      this.getCursorIndex(),
      this.sentence.length - 1
    );
  
    return this.sentence.split('').map((char, index) => {
      const userChar = this.userInput[index];
  
      if (userChar !== undefined && userChar !== char && !this.incorrectIndices.has(index)) {
        this.incorrectIndices.add(index);
        this.statsService.incrementCountIncorrect();
      }
  
      const color =
        userChar === undefined ? 'grey' : userChar === char ? 'green' : 'red';
  
      return { char, correct: color, isCursor: index === cursorIndex };
    });
  }
  

  disableEvent(event: ClipboardEvent): void {
    event.preventDefault();
  }

  onUserInput() {
    if (this.statsService.startTime === 0 && this.userInput.length > 0) {
      this.statsService.setStartTime(Date.now());
    }


    this.sentenceService.setUserInput(this.userInput);

    if (this.userInput.length === this.sentence.length) {
      this.statsService.clearInterval();
      // clearInterval(this.intervalId);
      this.router.navigate(['/result']);
    }
  }


  resetTest() {
    this.userInput = '';
    this.statsService.elapsedTimeInSeconds = 0;
    clearInterval(this.statsService.intervalId);
  }

  ngOnInit() {
    this.sentenceService
      .getSentence()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: string) => {
          this.sentence = data;
        },
        error: (error) => {
          console.error('Error fetching sentence:', error);
        }
      });
  
    this.sentenceService
      .getUserInput()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: string) => {
            this.userInput = data;
        },
        error: (error) => {
          console.error('Error fetching user input:', error);
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
