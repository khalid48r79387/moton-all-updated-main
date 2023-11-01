import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';

const BASE_URL = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor(private client: HttpClient) {}

  getUserWishlist(): Observable<any> {
    return this.client.get(BASE_URL + 'wishlist');
  }

  addBookToWishlist(bookId: string): Observable<any> {
    return this.client.post(BASE_URL + 'wishlist', {
      bookId: bookId,
    });
  }

  removeBookFromWishlist(bookId: string): Observable<any> {
    return this.client.delete(BASE_URL + `wishlist/${bookId}`);
  }
}
