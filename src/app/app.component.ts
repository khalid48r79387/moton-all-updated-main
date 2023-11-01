import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { StorageService } from '../app/core/services/storage/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isLoggedIn = false;
  title = 'Moton';

  constructor(
    private translocoService: TranslocoService,
    private storageService: StorageService
  ) {
    translocoService.getActiveLang() === 'ar'
      ? (document.body.style.direction = 'rtl')
      : (document.body.style.direction = 'ltr');
    this.isLoggedIn = this.storageService.isLoggedIn();
  }

  ngOnInit(): void {}
}
