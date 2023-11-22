import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpOption;

  //resModel = new BehaviorSubject(null);
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




/*   
   start nav-Bar component section 
  to search for doctors and Display it in patient-profile component
*/
search(input:string):Observable<any>
{
  let send={name:input}
  return this._HttpClient.post('https://mazen.cyclic.app/doctor/search',JSON.stringify(send),this.httpOption)
  //  .pipe(
  //    retry(1), //try send request 1 time
  //    catchError(()=>{
  //     return throwError(()=>'There is no doctors')
  //    })
  //  );
}

/*end nav-Bar component section*/

getPatientProfile():Observable<any>{
  return this._HttpClient.get("https://mazen.cyclic.app/user/userProfile",this.httpOption);
}
getPatientByID(pID:any):Observable<any>{
  return this._HttpClient.get(`https://mazen.cyclic.app/user/getUserById/${pID}`,this.httpOption);
}
/* start doctorAppointment component section  */
getDocByID(dID:any):Observable<any>{
  return this._HttpClient.get(`https://mazen.cyclic.app/doctor/getDoctorById/${dID}`,this.httpOption);
}
/* end doctorAppointment component section  */

bookAppoint(slotId:any,doctorId:any):Observable<any>{
  let send={slotId,doctorId}
  //console.log(send);
  return this._HttpClient.post('https://mazen.cyclic.app/appointment/bookSlot',JSON.stringify(send),this.httpOption)
}


sendRate(rateData:any):Observable<any>{
  return this._HttpClient.post('https://mazen.cyclic.app/review/add',rateData,this.httpOption)
}
/*mazen */
  getResModel(img:any):Observable<any>
  {
    return this._HttpClient.post("https://mazen.cyclic.app/user/uploadAndAnalysis",this.httpOption);
  }
 
}
