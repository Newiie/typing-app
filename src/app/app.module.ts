import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TypingtestComponent } from './pages/typingtest/typingtest.component';
import { ResultComponent } from './pages/result/result.component';
import { SentenceService } from './services/sentence.service';
import { FormsModule } from '@angular/forms';
import { StatsService } from './services/stats.service';

@NgModule({
  declarations: [
    AppComponent,
    TypingtestComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [SentenceService, StatsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
