import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/core/interfaces/order';
import { OrderService } from 'src/app/core/services/order/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  orders: IOrder[] = [];
  constructor(private orderService: OrderService) {}
  isLoading: boolean = false;

  ngOnInit(): void {
    this.orderService.getPaymobTokens().subscribe((token) => {
      console.log(token);
    });
    this.isLoading = true;
    this.orderService.getAllOrders().subscribe((response) => {
      this.orders = response.data;
      // console.log(this.orders);
      this.isLoading = false;
    });
  }
}
