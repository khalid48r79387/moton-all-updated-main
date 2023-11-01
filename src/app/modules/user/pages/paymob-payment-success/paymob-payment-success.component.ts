import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/core/services/order/order.service';

@Component({
  selector: 'app-paymob-payment-success',
  templateUrl: './paymob-payment-success.component.html',
  styleUrls: ['./paymob-payment-success.component.css'],
})
export class PaymobPaymentSuccessComponent implements OnInit {
  private route = inject(ActivatedRoute);
  transactionId: any = null;
  orderId: any = null;
  isLoading: boolean = false;

  constructor(
    private orderService: OrderService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.transactionId = this.route.snapshot.queryParamMap.get('id');
    this.orderId = this.route.snapshot.queryParamMap.get('order');

    console.log(this.transactionId);
    console.log(this.orderId);
  }

  onConfirm() {
    this.orderService
      .createPaymobOrder(this.transactionId, this.orderId)
      .subscribe({
        next: (response) => {
          if (response.status === 'success') {
            this.router.navigate(['success/payment/completed']);
          }
        },
        error: (err) => console.log(err),
      });
  }
}
