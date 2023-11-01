import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Component({
  selector: 'app-forgottenpassword',
  templateUrl: './forgottenpassword.component.html',
  styleUrls: ['./forgottenpassword.component.css'],
})
export class ForgottenpasswordComponent implements OnInit {
  loading: boolean = false;
  message: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      window.location.replace('/home');
    }

    this.restorePasswordForm.valueChanges.subscribe(
      (selectedValue) => {
        this.message = '';
      }
    );
  }

  restorePasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.email,
    ]),
  });

  handelRestorePasswordForm(restorePasswordForm: FormGroup) {
    if (restorePasswordForm.valid) {
      this.loading = true;
      this.authService
        .forgotPassword(restorePasswordForm.value)
        .subscribe({
          next: (response) => {
            if (response.status === 'Success') {
              this.router.navigate(['/verify-reset-password-code']);
            }
          },
          error: (err) => {
            this.loading = false;
            this.message = err.message;
          },
        });
    }
  }
}
