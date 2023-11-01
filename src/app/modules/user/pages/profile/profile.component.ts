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
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
    ]),
    email: new FormControl(null, [
      Validators.required,
      Validators.email,
    ]),
    phone: new FormControl(null, [Validators.required]),
  });

  updatePasswordForm: FormGroup = new FormGroup({
    password: new FormControl(null, [Validators.required]),
  });

  imageForm = new FormGroup({
    profileImage: new FormControl(null, [Validators.required]),
  });
  photoUrl: string = '';

  constructor(
    private profileService: ProfileService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.profileService.getProfile().subscribe((res) => {
      this.userProfile = res.data;
      this.updateUserForm.patchValue({
        name: res.data.name,
        email: res.data.email,
        phone: res.data.phone,
      });
      console.log(this.userProfile);
    });
  }

  handelUpdateUser(updateUserForm: FormGroup) {
    if (updateUserForm.valid) {
      this.profileService
        .updateUserProfile(updateUserForm.value)
        .subscribe({
          next: (response) => {
            this.successMessage = true;
          },
          error: (err) => console.log(err),
        });
    }
  }

  handelImageForm(imageForm: FormGroup) {
    if (imageForm.valid) {
      this.profileService
        .updateUserProfile({ profileImage: this.photoUrl })
        .subscribe({
          next: (response) => {
            this.successMessage = true;
          },
          error: (err) => console.log(err),
        });
    }
  }

  handelUpdatePasswordForm(updatePasswordForm: FormGroup) {
    if (updatePasswordForm.valid) {
      this.profileService
        .changeUserPassword(updatePasswordForm.value)
        .subscribe({
          next: (response: any) => {
            this.storageService.clean();
            this.storageService.saveUser(
              response.data,
              response.token
            );
            this.successMessage = true;
          },
          error: (err) => {},
        });
    }
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.photoUrl = event.target.files[0].name;
      console.log(this.photoUrl);
    }
  }
}
