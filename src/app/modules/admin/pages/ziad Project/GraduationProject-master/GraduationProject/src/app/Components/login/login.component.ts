import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
//import { Login } from 'src/app/models/login';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login-doctor',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  errMessage: any;
  IsWait: boolean = false;
  hide: boolean = true;
  backgroundUrl:any='assets/home/Vector.png';
  loginForm: FormGroup = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'password': new FormControl(null, [Validators.required, Validators.pattern('^[A-Z][a-z0-9]{3,8}$')]),
  });
  constructor(public _router: Router,
    public _AuthService: AuthService, private _snackBar: MatSnackBar) { }
  ngOnInit(): void { }


  openSnackBar() {
    this._snackBar.open(this.errMessage.error.message, 'login again', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }


  
  ObserverForLogin = {
    next: (data: any) => {
      this.IsWait = true;
      let userToken: string = data.token;
      let userRole:string=data.role;
      if (data.message == 'Login Done' && data.role == 'Doctor') {
        localStorage.setItem("token", userToken);
        localStorage.setItem("role",userRole);
        //this._AuthService.saveUserData(userToken, data.role);
        this._router.navigate(["/home", 'doctor']);
      }
      else if (data.message == 'Login Done' && data.role == 'User') {
        localStorage.setItem("token", userToken);
        localStorage.setItem("role",userRole);
        //this._AuthService.saveUserData(userToken, data.role);
        this._router.navigate(["/home", 'patient']);
      }

    },
    error: (err: Error) => { this.errMessage = err; this.openSnackBar() }
  }
  getFormData(formData: any) {
    console.log(formData.value);
    this._AuthService.login(formData.value).subscribe(this.ObserverForLogin);
  }

}

