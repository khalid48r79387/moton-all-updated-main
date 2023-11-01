import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';

const BASE_URL = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private client: HttpClient) {}

  getAllOrders(): Observable<any> {
    return this.client.get(BASE_URL + 'order');
  }

  getSpecificOrder(id: string): Observable<any> {
    return this.client.get(BASE_URL + `order/${id}`);
  }

  createCashOrder(
    cartId: string,
    shippingAddress: string
  ): Observable<any> {
    return this.client.post(
      BASE_URL + `order/${cartId}`,
      shippingAddress
    );
  }

  checkoutSession(
    cartId: string,
    paymentGateway: string
  ): Observable<any> {
    return this.client.get(
      BASE_URL +
        `order/checkout-session/${cartId}?payment_getaway=${paymentGateway}`
    );
  }

  createPaypalOrder(paymentId: any): Observable<any> {
    return this.client.get(
      BASE_URL + `order/create-paypal-order?paymentId=${paymentId}`
    );
  }

  createPaymobOrder(
    transactionId: any,
    orderId: any
  ): Observable<any> {
    return this.client.get(
      BASE_URL +
        `order/create-paymob-order?transactionId=${transactionId}&orderId=${orderId}`
    );
  }

  getPaymobTokens(): Observable<any> {
    return this.client.get(BASE_URL + `order/paymobTokens`);
  }

  GetTotalPrice(): Observable<any> {
    return this.client.get<any>(BASE_URL + 'order/totalPrices');
  }
}
