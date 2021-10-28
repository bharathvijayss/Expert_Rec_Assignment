import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbCardModule, NbThemeModule, NbLayoutModule, NbButtonModule, NbListModule, NbUserModule, NbSpinnerModule, NbTooltipModule, NbToastrModule, NbDialogModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbIconModule } from '@nebular/theme';
import { HttpClientModule } from '@angular/common/http';
import { NbOAuth2AuthStrategy, NbAuthModule, NbOAuth2ResponseType, NbAuthJWTToken } from '@nebular/auth';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { AuthGuard } from './services/auth-guard.service';
import { NbOAuth2LoginComponent } from './nb-oauth2-login/nb-oauth2-login.component';
import { OAuth2CallbackComponent } from './oauth2-callback/oauth2-callback.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewProfileComponent,
    NbOAuth2LoginComponent,
    OAuth2CallbackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbIconModule,
    NbListModule,
    NbUserModule,
    NbSpinnerModule,
    NbButtonModule,
    NbCardModule,
    NbToastrModule.forRoot(),
    NbDialogModule.forRoot(),
    NbTooltipModule,
    HttpClientModule,
    NbAuthModule.forRoot({
      strategies: [
        NbOAuth2AuthStrategy.setup({
          name: 'google',
          clientId:'550118843940-hb386koogq4os0iajim3mskm0fq4ooik.apps.googleusercontent.com',
          clientSecret: '',
          authorize: {
            endpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
            responseType: NbOAuth2ResponseType.TOKEN,
            scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
            //Need to change redirectURI
            redirectUri: 'http://localhost:4200/callback', 
          },
          redirect: {
            success: '/viewProfile',
            failure: null,
          }
        })
      ],
      forms: {},
    }), 
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
