import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { HomePanelComponent } from './pages/home-panel/home-panel.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'src/app/auth.interceptor';
import { AllPaperBooksComponent } from './pages/all-paper-books/all-paper-books.component';
import { AllElectronicBooksComponent } from './pages/all-electronic-books/all-electronic-books.component';
import { OrderComponent } from './pages/order/order.component';
import { MassageComponent } from './pages/massage/massage.component';
import { ShowAdminsComponent } from './pages/show-admins/show-admins.component';
import { ShowPublishersComponent } from './pages/show-publishers/show-publishers.component';
import { ShowUsersComponent } from './pages/show-users/show-users.component';
import { NewPublisherComponent } from './pages/new-publisher/new-publisher.component';
import { AddCategoryComponent } from './pages/add-category/add-category.component';
import { AddEventComponent } from './pages/add-event/add-event.component';
import { EBookComponent } from './pages/ebook/e-book.component';
import { AdminLayoutComponent } from './pages/admin-layout/admin-layout.component';
import { SharedModule } from '../shared/shared.module';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderService } from 'src/app/core/services/order/order.service';
import { BooksService } from 'src/app/core/services/books/books.service';
import { EventService } from 'src/app/core/services/event/event.service';
import { ContactService } from 'src/app/core/services/contact/contact.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { DataTablesModule } from 'angular-datatables';
import { HomeUserInterFaceComponent } from './pages/home-user-inter-face/home-user-inter-face.component';
import { EventInfoComponent } from './pages/event-info/event-info.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    HomePanelComponent,
    AllPaperBooksComponent,
    AllElectronicBooksComponent,
    OrderComponent,
    MassageComponent,
    ShowAdminsComponent,
    ShowPublishersComponent,
    ShowUsersComponent,
    NewPublisherComponent,
    AddCategoryComponent,
    AddEventComponent,
    EBookComponent,
    HomeUserInterFaceComponent,
    EventInfoComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    TranslocoModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
  ],
  providers: [
    CategoryService,
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
    BooksService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    EventService,
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
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    BooksService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class AdminModule {}
