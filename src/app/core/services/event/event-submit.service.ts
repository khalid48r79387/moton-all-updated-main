import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environment';

const BASE_URL = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class EventSubmitService {
  constructor(private client: HttpClient) {}

  eventFormSubmission(
    eventId: string,
    eventFormData: object
  ): Observable<any> {
    return this.client.post(
      BASE_URL + `eventform/${eventId}`,
      eventFormData
    );
  }
}
