import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { SharedModule } from '../shared/shared.module';
import { PublisherRoutingModule } from './publisher-routing.module';
import { PublisherLayoutComponent } from './pages/publisher-layout/publisher-layout.component';
import { LandingComponent } from './pages/landing/landing.component';
import { PublisherServiceService } from 'src/app/core/Publisher/publisher-service.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'src/app/auth.interceptor';
import { PublisherBookComponent } from './pages/publisher-book/publisher-book.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PublisherLayoutComponent, LandingComponent, PublisherBookComponent],
  imports: [
    CommonModule,
    PublisherRoutingModule,
    TranslocoModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    PublisherServiceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class PublisherModule {}
