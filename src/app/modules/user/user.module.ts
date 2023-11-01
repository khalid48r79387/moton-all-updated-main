import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-routing.module';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { HomeComponent } from './pages/home/home.component';
import { StarRatingComponent } from '../../../app/modules/shared/components/star-rating/star-rating.component';
import { StarRatingModule } from 'angular-star-rating';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AutoCompleteComponent } from '../shared/components/auto-complete/auto-complete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ForgottenpasswordComponent } from './pages/forgottenpassword/forgottenpassword.component';
import { VerifyResetPasswordCodeComponent } from './pages/verify-reset-password-code/verify-reset-password-code.component';
import { PasswordValidationComponent } from './pages/password-validation/password-validation.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { OrderComponent } from './pages/order/order.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { BooksComponent } from './pages/books/books.component';
import { ShowComponent } from './pages/show/show.component';
import { EventsComponent } from './pages/events/events.component';
import { EventInfoComponent } from './pages/event-info/event-info.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { PaymentSuccessComponent } from './pages/payment-success/payment-success.component';
import { PaymobPaymentSuccessComponent } from './pages/paymob-payment-success/paymob-payment-success.component';
import { PaymentCompletedComponent } from './pages/payment-completed/payment-completed.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CategoryBookComponent } from './pages/category-book/category-book.component';
import { SortPipe } from 'src/app/core/pipes/sort.pipe';
import { FilterPipe } from 'src/app/core/pipes/filter.pipe';
import { CategoryComponent } from './pages/category/category.component';
import { CategoryPipe } from 'src/app/core/pipes/category.pipe';
import { SharedModule } from '../shared/shared.module';
import { UserLayoutComponent } from './pages/user-layout/user-layout.component';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'src/app/auth.interceptor';
import { ProfileService } from 'src/app/core/services/profile/profile.service';
import { ReviewService } from 'src/app/core/services/review/review.service';
import { OrderService } from 'src/app/core/services/order/order.service';
import { WishlistService } from 'src/app/core/services/whishlist/wishlist.service';
import { ContactService } from 'src/app/core/services/contact/contact.service';

@NgModule({
  declarations: [
    UserLayoutComponent,
    HomeComponent,
    StarRatingComponent,
    AutoCompleteComponent,
    LoginComponent,
    SignupComponent,
    ForgottenpasswordComponent,
    VerifyResetPasswordCodeComponent,
    PasswordValidationComponent,
    ProfileComponent,
    OrderComponent,
    AboutComponent,
    ContactComponent,
    BooksComponent,
    ShowComponent,
    EventsComponent,
    EventInfoComponent,
    PaymentComponent,
    PaymentSuccessComponent,
    PaymobPaymentSuccessComponent,
    PaymentCompletedComponent,
    WishlistComponent,
    CategoryBookComponent,
    CategoryComponent,
    SortPipe,
    FilterPipe,
    CategoryPipe,
  ],
  imports: [
    UserRoutingModule,
    CommonModule,
    TranslocoModule,
    StarRatingModule.forRoot(),
    CarouselModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SharedModule,
  ],
  providers: [
    CartService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    ProfileService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    ReviewService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    OrderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    WishlistService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    ContactService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    SortPipe,
    FilterPipe,
  ],
  exports: [],
})
export class UserModule {}
