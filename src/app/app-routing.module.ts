import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypingtestComponent } from './pages/typingtest/typingtest.component';
import { ResultComponent } from './pages/result/result.component';

const routes: Routes = [
  {
    path: '',
    component: TypingtestComponent
  }, 
  {
    path: 'result',
    component: ResultComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
