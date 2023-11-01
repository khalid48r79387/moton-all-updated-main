import { Component, Input, OnInit, inject } from '@angular/core';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { BooksService } from 'src/app/core/services/books/books.service';
import { Book } from 'src/app/core/interfaces/book';
import { Category } from 'src/app/core/interfaces/category';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/core/services/whishlist/wishlist.service';
import { Wishlist } from 'src/app/core/interfaces/wishlist';
import { map } from 'rxjs/internal/operators/map';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  private route = inject(ActivatedRoute);
  language$ = this.route.params.pipe(
    map((params) => params['language'])
  );
  isLoggedIn = false;
  books: Book[] = [];
  itemsPerPage: number = 12;
  pagination: number = 1;
  categories: Category[] | undefined;
  keyword = '';
  wishlist: Wishlist = {
    data: [],
    results: 0,
    status: '',
  };
  filters: string[] = [];
  sortValue: string = '';
  isLoading: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private title: Title,
    private bookService: BooksService,
    private cartService: CartService,
    private storageService: StorageService,
    private toastr: ToastrService,
    private wishlistService: WishlistService,
    private translocoService: TranslocoService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.language$.subscribe((language) => {
      if (!language) return;
      this.categoryService.getAllCategories().subscribe((res) => {
        this.categories = res.data;
        this.categories = this.categories?.filter(
          (c) => c.language === language
        );
      });

      this.bookService.getAllBooks().subscribe((res) => {
        this.books = res.data;
        this.books = this.books?.filter(
          (b) => b.language === language
        );
        this.isLoading = false;
      });

      this.title.setTitle(
        'Moton - ' +
          language[0].toUpperCase() +
          language.substr(1).toLowerCase()
      );
    });

    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      this.wishlistService.getUserWishlist().subscribe((res) => {
        this.wishlist.data = res.data.map((el: any) => el._id);
      });
    }
  }

  addBookToWishlist(bookId: string) {
    this.wishlistService
      .addBookToWishlist(bookId)
      .subscribe((res) => {
        this.wishlist = res;
        if (res.status === 'success') {
          this.toastr.success(
            this.translocoService.translate(
              'home.book_added_to_wishlist',
              {},
              'ar'
            )
          );
        }
      });
  }

  isInWishlist(bookId: string) {
    return this.wishlist.data.indexOf(bookId) >= 0;
  }

  removeBookFromWishlist(bookId: string) {
    this.wishlistService
      .removeBookFromWishlist(bookId)
      .subscribe((res) => {
        this.wishlist = res;
        this.toastr.success(
          this.translocoService.translate(
            'home.book_removed_from_wishlist',
            {},
            'ar'
          )
        );
      });
  }

  addToCart(bookId: string, index: any) {
    let loading = document.getElementById(`loading - ${index}`);
    if (loading) {
      loading.style.display = 'block';
    }
    this.cartService.addToCart(bookId).subscribe((res) => {
      if (loading) {
        loading.style.display = 'none';
      }
      if (res.status === 'success') {
        this.toastr.success(
          this.translocoService.translate(
            'home.book_added_to_cart',
            {},
            'ar'
          )
        );
      }
    });
  }

  onOptionsSelected(value: string) {
    this.sortValue = value;
  }

  modifyCategoryFilter(filter: any, checked: any) {
    if (checked) {
      this.filters.push(filter);
    } else {
      this.filters.splice(this.filters.indexOf(filter), 1);
    }
    this.filters = [...this.filters];
  }

  renderPage(event: number) {
    this.pagination = event;
  }
}
