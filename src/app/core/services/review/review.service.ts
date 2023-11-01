import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environment';

const BASE_URL = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private client: HttpClient) {}

  getAllReviews(): Observable<any> {
    return this.client.get(BASE_URL + 'reviews');
  }

  getReviewById(id: string): Observable<any> {
    return this.client.get(BASE_URL + `reviews/${id}`);
  }

  createReview(reviewData: Object): Observable<any> {
    return this.client.post(BASE_URL + `reviews`, reviewData);
  }
}
