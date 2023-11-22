import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FileUploader } from 'ng2-file-upload';
import { DoctorService } from '../../Services/doctor-service.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
//let resutlOfModel;
const URL = "https://mazen.cyclic.app/user/uploadAndAnalysis";
@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.scss']
})
export class UploadPhotoComponent implements OnInit {
  imgView: any;
  resModel:any;
  imgDone:boolean=false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  backgroundUrl: string = 'assets/home/Vector.png';
  topDoctor: any = [];
  IsWait: boolean = true;
  isUploaded: boolean = false;
  constructor(private _ToastrService: ToastrService, private _DoctorService: DoctorService,
              private _Router: Router,private _snackBar: MatSnackBar ) { }
  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'image',
    method: 'POST',
    authToken: `mazen__${localStorage.getItem('token')}`
  });
  ngOnInit(): void {
    this.uploader.onAfterAddingFile = (file) => {
      //console.log(file);
      this.imgView = file.file.name;
      this.IsWait = false;
      this.isUploaded = true;
      file.withCredentials = false;
    };
  
    this.uploader.onCompleteItem = (item: any, status: any) => {
      //console.log('Uploaded File Details:', item);
      //this.imgView = item.file.name;
      //console.log(this.imgView);
      let data = JSON.parse(status);
      //console.log(status);
      console.log(data);
      if (data.message == "Photos uploaded and analyzed" ) {
        this.imgDone=true;
        this.imgView=data.ImageLink;
        this.resModel=data.prediction;
        console.log(this.imgView);
        console.log(this.resModel);
        this.openSnackBar();
        //console.log(typeof (status.message));
        //resutlOfModel = data.prediction
        //this._Router.navigate(["/result"]);
      }
      this._ToastrService.success('File successfully uploaded!');
      this.ngOnInit();
    };
    this._DoctorService.getTopRating().subscribe((data) => {
      this.IsWait = false;
      this.topDoctor = data.doctors;
    });
  }
  openSnackBar() {
    this._snackBar.open(this.resModel, 'close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
