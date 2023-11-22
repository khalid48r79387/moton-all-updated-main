import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user/user.service';
import { User } from 'src/app/core/interfaces/user';

@Component({
  selector: 'app-new-publisher',
  templateUrl: './new-publisher.component.html',
  styleUrls: ['./new-publisher.component.css'],
})
export class NewPublisherComponent implements OnInit {

  saveImg: string = '';
  
  ngOnInit(): void {
    this.checkData();
  }


  AddPublisher: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(64),
    ]),
    email: new FormControl(null, [Validators.required]),

    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),

    confirmPassword: new FormControl(null, [Validators.required]),

    role: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required , Validators.minLength(11) , Validators.maxLength(11)]),

    profileImage: new FormControl(null, [Validators.required]),
  });

  constructor(private userService: UserService) {}

  // get image added
  image: any;
  getImage(event: any) {
    this.image = event.target.files[0];
  }

  

  submitImageData() {
    let formData = new FormData();
    formData.set('image', this.image);

    this.userService.uploadUserImage(formData).subscribe({
      next: (res) => {
        
        this.saveImg = res.filename;
        
        this.AddPublisher.patchValue({
          profileImage: this.saveImg,
        });
      },
      error: (err) => {
        console.log('Error fetching Book data:', err);
      },
    });
  }



  handelAddPublisher(addPublisherForm: FormGroup) {
    if (addPublisherForm.valid) {
      this.userService
        .addUser(addPublisherForm.value)
        .subscribe({
          next: (res) => {
            alert('تم اضافة المستخدم');
            addPublisherForm.reset(); // Reset the form
          this.image = null;
          this.checkData(); // Refresh the list of categories
          },
          error: (err) => {
            // Handle the error
            console.log('Detailed error response:', err.error);
            alert('الرجاء التاكد من ادخال البيانات كامله صحيحه');
            this.AddPublisher.reset();
          },
        });
    }
  }


 
  // delete one category
  onDeletePublisher(id: string) {
    this.userService.deleteUser(id).subscribe({
      next: (res) => {
        alert('تم حذف المستخدم');
        this.ngOnInit();
      },
      error: (err) => {
        console.log('Error fetching category data:', err);
      },
    });
  }

  // get all Publisher after doing any change

  Publisher: User[] = [];

  checkData() {
    const userToken = localStorage.getItem('userToken');
      this.userService.getAllUsers().subscribe({
        next: (res) => {
          // this.Publisher=[]
          // let resOfUsers = res.data
          this.Publisher = res.data;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
