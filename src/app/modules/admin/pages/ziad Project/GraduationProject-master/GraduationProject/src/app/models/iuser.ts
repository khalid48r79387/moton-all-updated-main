export interface IUser {
    firstName:string;
    lastName:string;
    address:string;
    emil:string;
    password:string;
    cpassword:string;
    roleDoctor:boolean;
    clinicAddress?:string;
    phoneNo?:string;
    workHours?:any[];
}
