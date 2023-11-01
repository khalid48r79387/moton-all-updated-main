import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';

const BASE_URL = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private client: HttpClient) {}

  getAllUsers(): Observable<any> {
    return this.client.get<any>(BASE_URL + 'users');
  }

  getUser(iid: string): Observable<any> {
    return this.client.get<any>(BASE_URL + 'users/' + iid);
  }

  deleteUser(iid: string): Observable<any> {
    return this.client.delete(BASE_URL + 'users/' + iid);
  }

  uploadUserImage(imageData: any): Observable<any> {
    return this.client.post<any>(
      BASE_URL + 'userimageupload/userimage',
      imageData
    );
  }

  addUser(PublisherData: object): Observable<any> {
    return this.client.post<any>(BASE_URL + 'users', PublisherData);
  }

  HomePagePhoto(imageData: any){
    return this.client.post<any>(
      BASE_URL + 'mainimageupload/mainimage',
      imageData
    );
  }

  Add_ToHomePage(UserHome_Data: object): Observable<any> {
    return this.client.post<any>( BASE_URL +'pageimage', UserHome_Data);
}

}
