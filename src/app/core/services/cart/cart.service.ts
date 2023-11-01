import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environment';

const BASE_URL = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private client: HttpClient) {}

  getUserCart(): Observable<any> {
    return this.client.get(BASE_URL + 'cart');
  }

  updateUserCart(itemId: string, quantity: number): Observable<any> {
    return this.client.put(BASE_URL + `cart/${itemId}`, {
      quantity: quantity,
    });
  }

  addToCart(bookId: string): Observable<any> {
    return this.client.post(BASE_URL + 'cart', { bookId: bookId });
  }

  removeFromCart(bookId: string): Observable<any> {
    return this.client.delete(BASE_URL + `cart/${bookId}`);
  }

  clearCart(): Observable<any> {
    return this.client.delete(BASE_URL + 'cart');
  }
}
