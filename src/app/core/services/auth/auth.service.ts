import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';

const AUTH_API = environment.apiURL + 'auth/';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private client: HttpClient) {}

  login(UserData: object): Observable<any> {
    return this.client.post(AUTH_API + 'login', UserData);
  }

  signUp(UserData: object): Observable<any> {
    return this.client.post(AUTH_API + 'signup', UserData);
  }

  forgotPassword(email: string): Observable<any> {
    return this.client.post(AUTH_API + 'forgotPassword', email);
  }

  verifyResetCode(code: string): Observable<any> {
    return this.client.post(AUTH_API + 'verifyResetCode', code);
  }

  resetPassword(password: string): Observable<any> {
    return this.client.put(AUTH_API + 'resetPassword', password);
  }
}
