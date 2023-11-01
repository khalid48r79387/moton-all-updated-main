import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css'],
})
export class StarRatingComponent implements OnInit {
  @Input({ required: true }) rating!: number;

  iconClass: any = {
    0: 'far fa-star fa-lg',
    0.5: 'fas fa-star-half-alt fa-lg',
    1: 'fas fa-star fa-lg',
  };

  stars: any[] = [0, 0, 0, 0, 0];
  constructor() {}

  ngOnChanges() {
    this.fillStars();
  }

  ngOnInit(): void {}

  fillStars() {
    var starsToFill = Math.round(this.rating * 2) / 2;
    var i = 0;
    while (starsToFill > 0.5) {
      this.stars[i] = 1;
      i++;
      starsToFill--;
    }

    if (starsToFill === 0.5) {
      this.stars[i] = 0.5;
    }
  }
}
