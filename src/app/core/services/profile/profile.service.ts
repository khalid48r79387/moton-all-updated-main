import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';

const BASE_URL = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private client: HttpClient) {}

  getProfile(): Observable<any> {
    return this.client.get(BASE_URL + `users/getMe`);
  }

  updateUserProfile(userProfileData: object) {
    return this.client.put(
      BASE_URL + `users/updateMe`,
      userProfileData
    );
  }

  changeUserPassword(passwordData: string) {
    return this.client.put(
      BASE_URL + `users/changeMyPassword`,
      passwordData
    );
  }
}
