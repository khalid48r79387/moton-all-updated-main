import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/interfaces/user';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-show-admins',
  templateUrl: './show-admins.component.html',
  styleUrls: ['./show-admins.component.css'],
})
export class ShowAdminsComponent implements OnInit {
  admins: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getAllAdmins();
  }

  getAllAdmins() {
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        this.admins = [];
        let resOfAdmins = res.data;

        for (let i = 0; i < resOfAdmins.length; i++) {
          if (resOfAdmins[i].role === 'admin') {
            this.admins.push(resOfAdmins[i]);
          }
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // delete user if he is publisher or user by sending his id to back-end

  deleteAdmin(id: string) {
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
