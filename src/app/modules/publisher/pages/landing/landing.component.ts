import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { PublisherServiceService } from 'src/app/core/Publisher/publisher-service.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {
 
  
  constructor(private PublisherService :PublisherServiceService) {}
  publisher_Name: string=''; // Define a variable to store the retrieved data

  ngOnInit(): void {
    const userDataJson = sessionStorage.getItem('authUser');
      if (userDataJson) {
      this.publisher_Name = JSON.parse(userDataJson).name;
      console.log(this.publisher_Name);
    } else {
      console.log('User data not found in sessionStorage');
    }

    this.checkData_BooksCount();
    this.checkData_Sales();    
  }

    // get Number Of Books For Each Publisher

    NumberOfBooks:string ='';

  checkData_BooksCount(){
      this.PublisherService.getCountOfBooks( this.publisher_Name ).subscribe({
        next:(res)=>{
          this.NumberOfBooks= res.data.bookCount;
        },
        error:(err)=>{
          console.log(err);
          
        }
      })    
  }

  // get total number of Sales and orders 

  totalSales:string ='';
  orderCount:string='' ;

  checkData_Sales(){
      this.PublisherService.getTotalSales( this.publisher_Name ).subscribe({
        next:(res)=>{
          this.totalSales= res.data.totalSales;
          this.orderCount= res.data.orderCount;
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
    
  }


}
