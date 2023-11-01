import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ForgottenpasswordComponent } from './pages/forgottenpassword/forgottenpassword.component';
import { VerifyResetPasswordCodeComponent } from './pages/verify-reset-password-code/verify-reset-password-code.component';
import { PasswordValidationComponent } from './pages/password-validation/password-validation.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { authGuard } from 'src/app/core/auth/auth.guard';
import { OrderComponent } from './pages/order/order.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { NewsComponent } from './pages/news/news.component';
import { BooksComponent } from './pages/books/books.component';
import { ViewPdfComponent } from './pages/view-pdf/view-pdf.component';
import { ShowComponent } from './pages/show/show.component';
import { EventsComponent } from './pages/events/events.component';
import { EventInfoComponent } from './pages/event-info/event-info.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { PaymentSuccessComponent } from './pages/payment-success/payment-success.component';
import { PaymobPaymentSuccessComponent } from './pages/paymob-payment-success/paymob-payment-success.component';
import { PaymentCompletedComponent } from './pages/payment-completed/payment-completed.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { CategoryBookComponent } from './pages/category-book/category-book.component';
import { CategoryComponent } from './pages/category/category.component';
import { UserLayoutComponent } from './pages/user-layout/user-layout.component';
import { RoleGuard } from 'src/app/core/guards/role.guard';

const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      {
        path: 'forgotten-password',
        component: ForgottenpasswordComponent,
      },
      {
        path: 'verify-reset-password-code',
        component: VerifyResetPasswordCodeComponent,
      },
      {
        path: 'password-validation',
        component: PasswordValidationComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [RoleGuard],
        data: { roles: ['user'] },
      },
      {
        path: 'order',
        component: OrderComponent,
        canActivate: [RoleGuard],
        data: { roles: ['user'] },
      },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'news', component: NewsComponent },
      {
        path: 'books/:type',
        component: BooksComponent,
      },
      {
        path: 'books/:type/category/:category', // child route path
        component: CategoryBookComponent, // child route component that the router renders
      },
      { path: 'view-pdf/:id', component: ViewPdfComponent },
      {
        path: 'show/:id',
        component: ShowComponent,
      },
      {
        path: 'events',
        component: EventsComponent,
      },
      { path: 'event-info/:event', component: EventInfoComponent },
      { path: 'category/:language', component: CategoryComponent },
      {
        path: 'payment/:cartId',
        component: PaymentComponent,
        canActivate: [RoleGuard],
        data: { roles: ['user'] },
      },
      {
        path: 'paypal/payment/success',
        component: PaymentSuccessComponent,
        canActivate: [RoleGuard],
        data: { roles: ['user'] },
      },
      {
        path: 'paymob/payment/success',
        component: PaymobPaymentSuccessComponent,
        canActivate: [RoleGuard],
        data: { roles: ['user'] },
      },
      {
        path: 'success/payment/completed',
        component: PaymentCompletedComponent,
        canActivate: [RoleGuard],
        data: { roles: ['user'] },
      },
      {
        path: 'wishlist',
        component: WishlistComponent,
        canActivate: [RoleGuard],
        data: { roles: ['user'] },
      },
      { path: '**', component: PageNotFoundComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
