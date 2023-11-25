import { AuthService } from '../../../../core/services/auth/auth.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  errorMessage: boolean = false;
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl(null, [Validators.required]),
  });

  ngOnInit() {
    if (this.storageService.isLoggedIn()) {
      window.location.replace('/home');
    }

    this.loginForm.valueChanges.subscribe((value) => {
      this.errorMessage = false;
      this.isLoading = false;
    });
  }

  handelLogin(loginForm: FormGroup) {
    this.isLoading = true;
    if (loginForm.valid) {
      this.authService.login(loginForm.value).subscribe({
        next: (response) => {
          // console.log(response.token);
          this.isLoading = false;
          this.storageService.saveUser(response.data, response.token);          
          window.location.replace(`/${response.data.role}`);
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = true;
        },
      });
    }
  }
}
