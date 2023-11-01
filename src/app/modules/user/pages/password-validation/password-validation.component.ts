import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Component({
  selector: 'app-password-validation',
  templateUrl: './password-validation.component.html',
  styleUrls: ['./password-validation.component.css'],
})
export class PasswordValidationComponent implements OnInit {
  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      window.location.replace('/home');
    }

    this.newPasswordForm.valueChanges.subscribe((selectedValue) => {
      this.errorMessage = '';
    });
  }

  newPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.email,
    ]),
    newPassword: new FormControl(null, [Validators.required]),
  });

  handelNewPasswordForm(newPasswordForm: FormGroup) {
    if (newPasswordForm.valid) {
      this.loading = true;
      this.authService
        .resetPassword(newPasswordForm.value)
        .subscribe({
          next: (response) => {
            this.storageService.saveUser(
              response.data,
              response.token
            );
            window.location.replace('/home');
          },
          error: (err) => {
            this.loading = false;
            this.errorMessage = err.error.message;
          },
        });
    }
  }
}
