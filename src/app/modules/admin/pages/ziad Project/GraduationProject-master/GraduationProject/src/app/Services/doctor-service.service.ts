import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, retry, throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
//import { DoctorData } from '../models/doctorData';
// import {UserData} from'src/app/models/userData';
@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  httpOption;
  constructor(public _HttpClient: HttpClient) { 
    this.httpOption={
      headers:new HttpHeaders({
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept',
        Authorization: `mazen__${localStorage.getItem('token')}`
      })
    };
  }


//doctorData=new BehaviorSubject(null);

  
/* Home or Home-Patient :
  To Display top rating doctor */  
  getTopRating():Observable<any> {
   return  this._HttpClient.get('https://mazen.cyclic.app/doctor/TopRating')
  }

/*    nav-bar component: 
    to Get Doctor Profile and Display it in doctor-profile component  */
  getProfileDoc():Observable<any>
  {
    return this._HttpClient.get("https://mazen.cyclic.app/doctor/profile",this.httpOption)
  }

  // saveDoctorData(docData:any)
  // { 
  //   this.doctorData.next(docData);
  
  // }

  /* Start edit appoint component */
  getAllAppoint():Observable<any>
  {
    return this._HttpClient.get('https://mazen.cyclic.app/doctor/',this.httpOption)
  }
  acceptAppoint(id:any):Observable<any>
  {
    return this._HttpClient.get(`https://mazen.cyclic.app/appointment/${id}/confirm`,this.httpOption)
  }
  cancelAppoint(id:any):Observable<any>
  {
    return this._HttpClient.get(`https://mazen.cyclic.app/appointment/${id}/cancel`,this.httpOption)
  }
  getComingAppoint():Observable<any>
  {
    return this._HttpClient.get("https://mazen.cyclic.app/doctor/upcomingAppointments",this.httpOption);
  }
  /* End edit appoint component */
addMedHistory(formData:any):Observable<any>{
 return this._HttpClient.patch('https://mazen.cyclic.app/medicalHistory/add',formData,this.httpOption)
}
addNotes(formOfNote:any):Observable<any>{
  return this._HttpClient.patch('https://mazen.cyclic.app/medicalHistory/addNote',formOfNote,this.httpOption)
}
sendAvAppoint(data:any):Observable<any>{
  return this._HttpClient.post('https://mazen.cyclic.app/doctor/slots1',data,this.httpOption)
}
editDocProfile(formEdited:any):Observable<any>{
  return this._HttpClient.post('https://mazen.cyclic.app/doctor/updateProfile',formEdited,this.httpOption)
}
}
