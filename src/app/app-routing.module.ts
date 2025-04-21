import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypingtestComponent } from './pages/typingtest/typingtest.component';
import { ResultComponent } from './pages/result/result.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: TypingtestComponent,
    canActivate: [authGuard]
  }, 
  {
    path: 'result',
    component: ResultComponent,
    canActivate: [authGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
