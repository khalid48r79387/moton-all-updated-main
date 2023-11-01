import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/core/interfaces/order';
import { OrderService } from 'src/app/core/services/order/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  constructor(private ordersService: OrderService) {}

  orders: IOrder[] = [];

  ngOnInit(): void {
    this.ordersService.getAllOrders().subscribe({
      next: (res) => {
        this.orders = res.data;
        console.log(res.data);

        for (const order of this.orders) {
          for (const cartItem of order.cartItems) {
            const bookName: string = cartItem.book.bookName;
            console.log(`Book Name: ${bookName}`);
          }
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
