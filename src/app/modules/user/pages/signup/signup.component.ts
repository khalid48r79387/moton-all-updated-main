import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  isLoading: boolean = false;
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl(null, [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl(null, [Validators.required , Validators.minLength(6)]),
    confirmPassword: new FormControl(null, [Validators.required , Validators.minLength(6)]),
  });

  constructor(
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    if (this.storageService.isLoggedIn()) {
      window.location.replace('/home');
    }
  }

  handelRegister(registerForm: FormGroup) {
    this.isLoading = true;
    if (registerForm.valid) {
      this.authService.signUp(registerForm.value).subscribe({
        next: (response) => {

          this.storageService.clean();
            // window.location.reload();
            window.location.replace('/login');
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
        },
      });
    }
  }
}
