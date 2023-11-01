import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import { Cart } from 'src/app/core/interfaces/cart';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { OrderService } from 'src/app/core/services/order/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  private route = inject(ActivatedRoute);
  cartId$ = this.route.params.pipe(map((params) => params['cartId']));
  isChecked: boolean = true;
  showCashPaymentDiv: boolean = true;
  isLoading: boolean = false;

  cart: Cart = {
    cartItems: [
      {
        _id: '',
        book: '',
        bookDetails: {
          bookName: '',
          image: '',
          type: '',
        },
        price: 0,
        quantity: 0,
      },
    ],
    totalCartPrice: 0,
    _id: '',
  };
  errorMessage: boolean = false;
  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  paymentForm = new FormGroup({
    payment: new FormControl('cash', Validators.required),
    shippingAddress: new FormControl(''),
  });

  ngOnInit(): void {
    this.cartService.getUserCart().subscribe((response: any) => {
      this.cart = response.data;
      console.log(this.cart);
    });

    this.onPaymentGatewayChange();
  }

  handlePaymentForm(paymentForm: FormGroup) {
    this.isLoading = true;
    if (paymentForm.controls['payment'].value === 'cash') {
      if (this.verifyCartItem(this.cart, 'electronic') > 0) {
        this.errorMessage = true;
        this.isLoading = false;
        return;
      } else {
        this.orderService
          .createCashOrder(
            this.cart._id,
            paymentForm.controls['shippingAddress'].value
          )
          .subscribe((response) => {
            if (response.status === 'success') {
              this.router.navigate(['success/payment/completed']);
            }
          });
      }
    } else if (paymentForm.controls['payment'].value === 'paypal') {
      this.orderService
        .checkoutSession(
          this.cart._id,
          paymentForm.controls['payment'].value
        )
        .subscribe({
          next: (response) => {
            console.log(response);
            if (response.status === 'success') {
              window.location.href = response.session;
            }
          },
          error: (err) => console.log(err),
        });
    } else if (paymentForm.controls['payment'].value === 'paymob') {
      this.orderService
        .checkoutSession(
          this.cart._id,
          paymentForm.controls['payment'].value
        )
        .subscribe({
          next: (response) => {
            if (response.status === 'success') {
              window.location.href = `https://accept.paymobsolutions.com/api/acceptance/iframes/790910?payment_token=${response.session}`;
              console.log(response.session);
            }
          },
          error: (err) => console.log(err),
        });
    }
  }
  onPaymentGatewayChange() {
    this.paymentForm.controls['payment'].valueChanges.subscribe(
      (value) => {
        const shippingAddress =
          this.paymentForm.controls['shippingAddress'];
        const validators = [Validators.required];
        this.errorMessage = false;
        if (value === 'cash') {
          this.showCashPaymentDiv = true;
          shippingAddress.setValidators(validators);
        } else {
          this.showCashPaymentDiv = false;
          shippingAddress.clearValidators();
        }

        shippingAddress.updateValueAndValidity();
      }
    );
  }

  verifyCartItem(cart: Cart, type: string) {
    let result = cart.cartItems.filter(
      (o) => o.bookDetails.type === type
    );
    return result.length;
  }
}
