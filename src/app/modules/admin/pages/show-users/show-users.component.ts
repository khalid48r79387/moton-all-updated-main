import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';
import { User } from 'src/app/core/interfaces/user';

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.css'],
})
export class ShowUsersComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser() {
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        this.users = [];

        let resOfUsers = res.data;

        for (let i = 0; i < resOfUsers.length; i++) {
          if (resOfUsers[i].role === 'user') {
            this.users.push(resOfUsers[i]);
          }
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteUser(id: string) {
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
