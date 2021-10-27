import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(private http: HttpClient) { }

  fetchUserInfo(tokenId: string) {
    return this.http.get("https://www.googleapis.com/oauth2/v3/userinfo?access_token=" + tokenId).
      pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    let errMsg: string = '';
    if (err.error instanceof Error) {
      console.log('A client-side or network error occurred:', err.error.message);
      errMsg = err.error.message;
    }
    else {
      console.log(`Backend returned code ${err.status}`);
      errMsg = err.error.status;
    }
    return throwError(errMsg);
  }

}
