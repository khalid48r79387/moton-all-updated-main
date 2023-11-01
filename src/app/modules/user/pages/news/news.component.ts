import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnInit {
  constructor() {}
  newBooks: any = [];

  ngOnInit(): void {}

  toggleStar(book: any) {
    // Implement logic to toggle the star icon for the given book
    book.isStarred = !book.isStarred;
  }

  toggleHeart(book: any) {
    // Implement logic to toggle the heart icon for the given book
    book.isHearted = !book.isHearted;
  }

  // ...
}
