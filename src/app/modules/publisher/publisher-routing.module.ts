import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublisherLayoutComponent } from './pages/publisher-layout/publisher-layout.component';
import { LandingComponent } from './pages/landing/landing.component';
import { RoleGuard } from 'src/app/core/guards/role.guard';
import { PublisherBookComponent } from './pages/publisher-book/publisher-book.component';

const routes: Routes = [
  {
    path: '',
    component: PublisherLayoutComponent,
    children: [
      {
        path: '',
        component: LandingComponent,
        canActivate: [RoleGuard],
        data: { roles: ['publisher'] },
      },
      {
        path: 'AddBook',
        component: PublisherBookComponent,
        canActivate: [RoleGuard],
        data: { roles: ['publisher'] },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublisherRoutingModule {}
