import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { NbAuthOAuth2Token, NbAuthResult, NbAuthService } from '@nebular/auth';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { UserInfoService } from '../services/user-info.service';
import { NbToastrService, NbComponentStatus } from '@nebular/theme';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnDestroy, OnInit {

  private destroy$ = new Subject<void>();
  authTokenValue;
  tokenIndex;
  tokenEndIndex;
  token;
  userObj;
  errorMessage;
  name;
  email;
  profilePhoto;


  constructor(private authService: NbAuthService, private router: Router,
    private userInfo: UserInfoService, private toastrService: NbToastrService,
    private dialogService: NbDialogService) {

  }

  ngOnInit(): void {
    this.authTokenValue = localStorage.getItem("auth_app_token");
    this.tokenIndex = this.authTokenValue.indexOf("access_token") + 17;
    this.tokenEndIndex = this.authTokenValue.indexOf("\\", this.tokenIndex);
    this.token = this.authTokenValue.substring(this.tokenIndex, this.tokenEndIndex);
    this.userInfo.fetchUserInfo(this.token).subscribe(
      info => {
        this.userObj = info;
        this.name = this.userObj.name;
        this.email = this.userObj.email;
        this.profilePhoto = this.userObj.picture;
        this.showToast(this.userObj.given_name, 'bottom-end', 'primary');
      },
      error => this.errorMessage = <any>error
    );
  }


  logout(dialog) {
    const dialogRef = this.dialogService.open(dialog).onClose
      .subscribe(name => {
        if (name === 'Yes') {
          this.authService.logout('google')
            .pipe(takeUntil(this.destroy$))
            .subscribe((authResult: NbAuthResult) => {
              this.router.navigate(["login"]);
            });
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  showToast(givenName, position, status: NbComponentStatus) {
    this.toastrService.show(
      `Login with Google Successfull`,
      `Welcome Back ${givenName} !!`,
      { status, position, duration: 6000 },
    );
  }

}
