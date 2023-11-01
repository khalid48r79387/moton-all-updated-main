import { Component } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'publisher-layout',
  templateUrl: './publisher-layout.component.html',
  styleUrls: ['./publisher-layout.component.css'],
})
export class PublisherLayoutComponent implements OnInit{

  isLoggedIn: boolean = false;

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
  }

  logout(): void {
    this.storageService.clean();
    window.location.reload();
  }
}
