import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/core/services/contact/contact.service';
import { Message } from 'src/app/core/interfaces/message';

@Component({
  selector: 'app-massage',
  templateUrl: './massage.component.html',
  styleUrls: ['./massage.component.css'],
})
export class MassageComponent implements OnInit {
  messages: Message[] = [];
  dtOptions: DataTables.Settings = {};

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 5,
    //   processing: true,
    //   lengthMenu: [5, 10, 25],
    //   dom: 'Blfrtip',
    // };
    this.getAllMessages();
  }

  onDeleteMessage(id: string) {
    this.contactService.deleteContactMessage(id).subscribe({
      next: (res) => {
        alert('تم حذف الرسالة بنجاح');
        this.ngOnInit();
      },
      error: (err) => {
        console.log('Error fetching Message data:', err);
      },
    });
  }

  getAllMessages() {
    this.contactService.getContactMessages().subscribe({
      next: (res) => {
        this.messages = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
