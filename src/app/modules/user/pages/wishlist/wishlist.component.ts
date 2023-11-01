import { Component, OnInit } from '@angular/core';
import { WishlistService } from 'src/app/core/services/whishlist/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  wishlist: any;
  isLoading: boolean = false;
  constructor(private wishlistService: WishlistService) {}
  ngOnInit(): void {
    this.isLoading = true;
    this.wishlist = this.wishlistService
      .getUserWishlist()
      .subscribe((response) => {
        this.wishlist = response.data;
        this.isLoading = false;
      });
  }

  removeBookFromWishlist(bookId: string) {
    this.wishlistService
      .removeBookFromWishlist(bookId)
      .subscribe((response) => {
        this.wishlist = this.wishlistService
          .getUserWishlist()
          .subscribe((response) => {
            this.wishlist = response.data;
            this.isLoading = false;
            console.log(response.data);
          });
      });
  }
}
