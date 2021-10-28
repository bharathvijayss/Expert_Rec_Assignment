import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbAuthOAuth2Token, NbAuthResult, NbAuthService } from '@nebular/auth';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { UserInfoService } from '../services/user-info.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnDestroy, OnInit {

  private destroy$ = new Subject<void>();
  authTokenValue;
  tokenIndex;
  token;
  userObj;
  errorMessage;
  name;
  email;
  profilePhoto;

  constructor(private authService: NbAuthService, private router: Router,
    private userInfo: UserInfoService) {

  }

  ngOnInit(): void {
    this.authTokenValue = localStorage.getItem("auth_app_token");
    this.tokenIndex = this.authTokenValue.indexOf("access_token");
    this.token = this.authTokenValue.substr(this.tokenIndex + 17, 163);
    this.userInfo.fetchUserInfo(this.token).subscribe(
      info => {
        this.userObj = info;
        this.name = this.userObj.name;
        this.email = this.userObj.email;
        this.profilePhoto = this.userObj.picture;
      },
      error => this.errorMessage = <any>error
    );
  }


  logout() {
    this.authService.logout('google')
      .pipe(takeUntil(this.destroy$))
      .subscribe((authResult: NbAuthResult) => {
        // localStorage.clear();
        this.router.navigate(["login"]);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
