import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { TranslocoModule } from '@ngneat/transloco';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';

@NgModule({
  declarations: [
    AdminNavbarComponent,
    NavbarComponent,
    FooterComponent,
    LanguageSelectorComponent,
    NotAuthorizedComponent,
  ],
  imports: [CommonModule, RouterModule, TranslocoModule],
  exports: [
    NavbarComponent,
    FooterComponent,
    AdminNavbarComponent,
    NotAuthorizedComponent,
  ],
})
export class SharedModule {}
