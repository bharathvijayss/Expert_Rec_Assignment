import { Component, OnDestroy } from '@angular/core';
import { NbAuthOAuth2Token, NbAuthResult, NbAuthService } from '@nebular/auth';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-nb-oauth2-login',
  templateUrl: './nb-oauth2-login.component.html',
  styleUrls: ['./nb-oauth2-login.component.scss']
})
export class NbOAuth2LoginComponent  implements OnDestroy {

  token: NbAuthOAuth2Token;
  private destroy$ = new Subject<void>();

  constructor(private authService: NbAuthService) {
    this.authService.onTokenChange()
      .pipe(takeUntil(this.destroy$))
      .subscribe((token: NbAuthOAuth2Token) => {
        this.token = null;
        if (token && token.isValid()) {
          this.token = token;
        }
      });
  }

  login() {
    this.authService.authenticate('google')
      .pipe(takeUntil(this.destroy$))
      .subscribe((authResult: NbAuthResult) => {
        localStorage.setItem('token',authResult.toString());
      });
  }

  logout() {
    this.authService.logout('google')
      .pipe(takeUntil(this.destroy$))
      .subscribe((authResult: NbAuthResult) => {
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
