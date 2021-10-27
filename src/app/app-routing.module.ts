import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { AuthGuard } from './auth-guard.service';
import { NbOAuth2LoginComponent } from './nb-oauth2-login/nb-oauth2-login.component';
import { OAuth2CallbackComponent } from './oauth2-callback/oauth2-callback.component';

export const routes: Routes = [
  { path: 'login', component: NbOAuth2LoginComponent },
  { path: 'callback', component: OAuth2CallbackComponent },
  { path: 'viewProfile', canActivate: [AuthGuard], component: ViewProfileComponent },
  { path: '', redirectTo: '/viewProfile', pathMatch: 'full' },
  { path: '**', redirectTo: '/viewProfile', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
