import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { IUser } from 'src/app/models/iuser';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  errMessage: any;
  hide: boolean = true;
  backgroundUrl:string='assets/home/Vector.png';
  signupForm: FormGroup = new FormGroup({
    'firstName': new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
    'lastName': new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
    'address': new FormControl(null, [Validators.required]),
    // 'clinicAddress': new FormControl(''),
    // 'phone': new FormControl('', [Validators.pattern('^[0-9]{11}$')]),
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'password': new FormControl(null, [Validators.required, Validators.pattern('^[A-Z][a-z0-9]{3,8}$')]),
    'cPass': new FormControl(null, [Validators.required, Validators.pattern('^[A-Z][a-z0-9]{3,8}$')]),
    'roleDoctor': new FormControl(false)
  });


  constructor(public _AuthService: AuthService,
    public _Router: Router, private _snackBar: MatSnackBar) { }



  openSnackBar() {
    this._snackBar.open(this.errMessage.error.message, 'Signin Again', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }




  ObserverForSignup = {
    next: (data: any) => {
      if (data.message == 'registration success , please confirm your email') {
        this._Router.navigate(['/login']);
      }
    },
    error: (err: Error) => { this.errMessage = err; this.openSnackBar() }
  }

  submit() {
    let usermodel: IUser = <IUser>this.signupForm.value;
    console.log(usermodel)
    this._AuthService.signup(usermodel).subscribe(this.ObserverForSignup);

  }
}
