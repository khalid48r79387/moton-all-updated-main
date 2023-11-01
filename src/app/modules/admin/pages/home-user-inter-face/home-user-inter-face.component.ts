import { Component , OnInit } from '@angular/core';
import{FormGroup , FormControl , Validators} from '@angular/forms'
import { UserService } from 'src/app/core/services/user/user.service';
@Component({
  selector: 'app-home-user-inter-face',
  templateUrl: './home-user-inter-face.component.html',
  styleUrls: ['./home-user-inter-face.component.css']
})
export class HomeUserInterFaceComponent implements OnInit {
  
  saveImg:string='';
  
  UserHomeInterFace: FormGroup = new FormGroup({
   
    title: new FormControl(null ,[Validators.required , Validators.minLength(2)  , Validators.maxLength(64)]),
    image: new FormControl(null ,[Validators.required ]),
  })

  constructor(private _UserService :UserService ){}

  ngOnInit(): void {
   
   
  }


  
        // get image added
      image:any ;
      getImage(event:any){
          this.image = event.target.files[0];
      }


      submitImageData(){

        let formData = new FormData();
        formData.set("image" , this.image)

            this._UserService.HomePagePhoto(  formData ).subscribe({
              next:(res)=>{
                this.saveImg = res.filename;
                this.UserHomeInterFace.patchValue({
                  image : this.saveImg
                })
      
              },
              error: (err) => {
                console.log('Error fetching Book data:', err);
              }
              
            })
      }





  handelUserHome(UserHomeInterFace:FormGroup){   
    if (this.UserHomeInterFace.valid) {
        const formData = this.UserHomeInterFace.value;
          this._UserService.Add_ToHomePage(formData).subscribe({
            next: (res) => {
              console.log(res);
              
              alert("تم اضافة الصوره والاسم");
              this.UserHomeInterFace.reset(); // Reset the form
              this.image= null;
            },
            error: (err) => {
              console.log('Error adding category:', err);
            }
          });
    }
      
    }




}
