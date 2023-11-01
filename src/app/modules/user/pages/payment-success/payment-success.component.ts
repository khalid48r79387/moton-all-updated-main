import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/core/services/order/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css'],
})
export class PaymentSuccessComponent implements OnInit {
  private route = inject(ActivatedRoute);
  paymentId: any;

  isLoading: boolean = false;
  constructor(
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.paymentId =
      this.route.snapshot.queryParamMap.get('paymentId');
  }

  onConfirm() {
    this.orderService.createPaypalOrder(this.paymentId).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.router.navigate(['success/payment/completed']);
        }
      },
      error: (err) => console.log(err),
    });
  }
}
