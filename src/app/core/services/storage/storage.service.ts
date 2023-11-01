import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

const USER_KEY = 'authUser';
const USER_TOKEN = 'userToken';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any, userToken: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.removeItem(USER_TOKEN);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    window.sessionStorage.setItem(
      USER_TOKEN,
      JSON.stringify(userToken)
    );
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public getUserToken(): any {
    const authToken = window.sessionStorage.getItem(USER_TOKEN);
    if (authToken) {
      return JSON.parse(authToken);
    }

    return {};
  }

  public isLoggedIn(): boolean {
    const token = window.sessionStorage.getItem(USER_TOKEN);
    const user = window.sessionStorage.getItem(USER_KEY);
    if (token && user) {
      return true;
    }

    return false;
  }

  public hasAnyRole(allowedRoles: string[], role: string): boolean {
    if (allowedRoles.includes(role)) {
      return true;
    } else {
      return false;
    }
  }
}
