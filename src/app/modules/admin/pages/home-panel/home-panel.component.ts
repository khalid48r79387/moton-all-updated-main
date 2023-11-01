import { Component, Input, OnInit } from '@angular/core';
import { OrderService } from 'src/app/core/services/order/order.service';
import { BooksService } from 'src/app/core/services/books/books.service';
import { EventService } from 'src/app/core/services/event/event.service';
import { ContactService } from 'src/app/core/services/contact/contact.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-home-panel',
  templateUrl: './home-panel.component.html',
  styleUrls: ['./home-panel.component.css'],
})
export class HomePanelComponent implements OnInit {
  TotalOrders: string = '';
  totalSalesAchieved: number = 0;
  TotalNumberOfUsers: number = 0;
  TotalNumberOfPublishers: number = 0;
  TotalNumberOfAdmins: number = 0;
  TotalNumberOfElectronic: number = 0;
  TotalNumberOfPaper: number = 0;
  TotalNumberOfMessage: string = '';
  TotalNumberOfEvents: string = '';

  constructor(
    private userService: UserService,
    private ordersService: OrderService,
    private booksService: BooksService,
    private contactService: ContactService,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.getTotalPrice();
    this.getTotalOrders();
    this.getTotalNumberOfElectronicAndPaperBooks();
    this.getTotalNumbersOfUsersAndPublishersAndAdmins();
    this.getTotalNumbersOfMessages();
    this.getTotalNumbersOfEvents();
  }

  getTotalPrice() {
    this.ordersService.GetTotalPrice().subscribe({
      next: (res: any) => {
        this.totalSalesAchieved = res.data.totalSalesAchieved;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  getTotalOrders() {
    const userToken = localStorage.getItem('userToken');
      this.ordersService.getAllOrders().subscribe({
        next: (res: any) => {
          this.TotalOrders = res.data.length;
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }

  getTotalNumberOfElectronicAndPaperBooks() {
    this.booksService.getAllBooks().subscribe({
      next: (res: any) => {
        let books = res.data;
        for (let i = 0; i < books.length; i++) {
          if (books[i].type === 'electronic') {
            this.TotalNumberOfElectronic++;
          } else if (books[i].type === 'paper') {
            this.TotalNumberOfPaper++;
          }
        }
      },

      error: (err: any) => {
        console.log(err);
      },
    });
  }

  getTotalNumbersOfUsersAndPublishersAndAdmins() {
    this.userService.getAllUsers().subscribe({
      next: (res: any) => {
        let resOfData = res.data;
        for (let i = 0; i < resOfData.length; i++) {
          if (resOfData[i].role === 'publisher') {
            this.TotalNumberOfPublishers++;
          } else if (resOfData[i].role === 'user') {
            this.TotalNumberOfUsers++;
          }
          if (resOfData[i].role === 'admin') {
            this.TotalNumberOfAdmins++;
          }
        }
      },
    });
  }

  getTotalNumbersOfMessages() {
    this.contactService.getContactMessages().subscribe({
      next: (res: any) => {
        this.TotalNumberOfMessage = res.data.length;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  getTotalNumbersOfEvents() {
    this.eventService.getAllEvents().subscribe({
      next: (res: any) => {
        this.TotalNumberOfEvents = res.data.length;
      },
      error: (err: any) => {
        console.log('Error');
      },
    });
  }
}
