import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/interfaces/user';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-show-publishers',
  templateUrl: './show-publishers.component.html',
  styleUrls: ['./show-publishers.component.css'],
})
export class ShowPublishersComponent implements OnInit {
  publishers: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getAllPublishers();
  }

  // if he is a publisher

  getAllPublishers() {
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        this.publishers = [];
        let resOfPublisher = res.data;

        for (let i = 0; i < resOfPublisher.length; i++) {
          if (resOfPublisher[i].role === 'publisher') {
            this.publishers.push(resOfPublisher[i]);
          }
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // delete user if he is publisher or user by sending his id to back-end

  deletePublisher(id: string) {
    this.userService.deleteUser(id).subscribe({
      next: (res) => {
        alert('تم حذف الناشر');
        this.ngOnInit();
      },
      error: (err) => {
        console.log('Error fetching Message data:', err);
      },
    });
  }
}
