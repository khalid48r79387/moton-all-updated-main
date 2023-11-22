import {
  Component,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { ProfileService } from 'src/app/core/services/profile/profile.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { UserProfile } from 'src/app/core/interfaces/userProfile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  successMessage: boolean = false;
  userProfile: UserProfile = {
    email: '',
    name: '',
    phone: '',
    profileImage: '',
  };
  updateUserForm: FormGroup = new FormGroup({
    
    name: new FormControl(),
    email: new FormControl(),
    phone: new FormControl(),

  });


  updatePasswordForm: FormGroup = new FormGroup({
    password: new FormControl(null, [Validators.required , Validators.minLength(6)]),
  });

  imageForm = new FormGroup({
    profileImage: new FormControl(null, [Validators.required]),
  });
  photoUrl: any = '';

  constructor(
    private profileService: ProfileService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {    
    this.getUserProfile();
    // this.handelUpdateUser();
    this.getalluserInfo();
  }



  // get all user Details

  Username :string=''
  UserEmail:string=''
  UserPhone:string=''

  getalluserInfo(){
    this.profileService.getProfile().subscribe({
      next:(res)=>{
        this.UserEmail=res.data.email
        this.UserPhone = res.data.phone
        this.Username = res.data.name      
      },
      error:(err)=>{}

    })
  }

  handelUpdateUser() {
    if (this.updateUserForm.valid) {  
      const enteredValues: { [key: string]: any } = {};
      
      Object.keys(this.updateUserForm.controls).forEach(key => {
        const control = this.updateUserForm.get(key)!; // Use non-null assertion operator
        if (control.value !== null && control.value !== undefined) {
          enteredValues[key] = control.value;
        }
      });
  
      console.log(enteredValues);
  
      this.profileService.updateUserProfile(enteredValues).subscribe({        
        next: () => {
          this.successMessage = true;
          this.updateUserForm.reset();
          window.location.reload();
        },
        error: (err) => {
          alert('القيمه التي تم ادخالها موجوده مسبقا');
          console.error('Error updating user:', err);
          // Log the detailed error response for further analysis
          console.log('Detailed error response:', err.error);
          this.updateUserForm.reset();
        },

      });
    }
  }
  
  


  
  



  handelUpdatePasswordForm(updatePasswordForm: FormGroup) {
    if (updatePasswordForm.valid) {
      this.profileService
        .changeUserPassword(updatePasswordForm.value)
        .subscribe({
          next: () => {  
            alert("الرجاء تسجيل الدخول مره اخرى")       
            this.storageService.clean();
            window.location.reload();
            this.successMessage = true;
          },
          error: (err) => {
          },
        });
    }
  }



  // get last Picture added

  getCurrentPic:any;

  getUserProfile(){
    this.profileService.getProfile().subscribe({
      next:(res)=>{
        this.getCurrentPic = res.data.profileImage; 
        
      },
      error:(error)=>{
        console.log(error);
        
      }
    })
  }



  // get image added
    saveImg: any ;
    image: any;
    getImage(event: any) {
      if (event.target.files.length > 0) {
      this.image = event.target.files[0];
      // console.log(this.image);
      }
    }



    submitImageData() {
      let formData = new FormData();
      formData.set('image', this.image);
  
      this.profileService.NewImage(formData).subscribe({
        next: (res) => {
          this.saveImg = res;
          this.photoUrl = this.saveImg.filename ;
          this.imageForm.patchValue({
            profileImage: this.photoUrl,
          });
        },
        error: (err) => {
          console.log('Error fetching Book data:', err);
        },
      });
    }

      handelImageForm(imageForm: FormGroup) {
    if (imageForm.valid) {
      this.profileService
        .updateUserProfile({ profileImage: this.photoUrl })
        .subscribe({
          next: (response) => {
            console.log(response);
            window.location.reload();
            this.successMessage = true;
          },
          error: (err) => console.log(err),
        });
    }
  }

  

}



