import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotAuthorizedComponent } from './modules/shared/components/not-authorized/not-authorized.component';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('../app/modules/admin/admin.module').then(
        (m) => m.AdminModule
      ),
  },
  {
    path: 'publisher',
    loadChildren: () =>
      import('../app/modules/publisher/publisher.module').then(
        (m) => m.PublisherModule
      ),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('../app/modules/user/user.module').then(
        (m) => m.UserModule
      ),
  },
  { path: '', redirectTo: '/user', pathMatch: 'full' },
  { path: 'not-authorized', component: NotAuthorizedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
