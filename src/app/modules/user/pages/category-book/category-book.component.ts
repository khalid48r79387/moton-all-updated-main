import {
  Component,
  OnDestroy,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/internal/operators/map';
import { Book } from 'src/app/core/interfaces/book';
import { Category } from 'src/app/core/interfaces/category';
import { Wishlist } from 'src/app/core/interfaces/wishlist';
import { BooksService } from 'src/app/core/services/books/books.service';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { WishlistService } from 'src/app/core/services/whishlist/wishlist.service';

@Component({
  selector: 'app-category-book',
  templateUrl: './category-book.component.html',
  styleUrls: ['./category-book.component.css'],
})
export class CategoryBookComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  books: Book[] = [];
  category!: Category;
  wishlist: Wishlist = {
    data: [],
    results: 0,
    status: '',
  };
  filters: string[] = [];
  sortValue: string = '';
  itemsPerPage: number = 6;
  pagination: number = 1;
  isLoggedIn: Boolean = false;
  isLoading: boolean = false;
  keyword = '';
  categories!: Category[];
  language!: string;
  type!: string;

  constructor(
    private categoryService: CategoryService,
    private booksService: BooksService,
    private cartService: CartService,
    private storageService: StorageService,
    private toastr: ToastrService,
    private wishlistService: WishlistService,
    private translocoService: TranslocoService
  ) {}

  ngOnInit(): void {
    let category$ = this.route.params.pipe(
      map((params) => params['category'])
    );
    let type$ = this.route.params.pipe(
      map((params) => params['type'])
    );

    this.isLoggedIn = this.storageService.isLoggedIn();

    category$.subscribe((category) => {
      this.isLoading = true;
      type$.subscribe((type) => {
        this.type = type;
      });
      this.route.queryParams.subscribe((params) => {
        this.language = params['language'];
      });
      this.categoryService
        .getCategoryById(category)
        .subscribe((response) => {
          this.category = response.data;
          this.categoryService
            .getAllCategories()
            .subscribe((category) => {
              this.categories = category.data;
              this.categories = this.categories.filter(
                (c) =>
                  c.type === this.category.type &&
                  c.language === this.category.language
              );
              this.booksService
                .getAllBooks()
                .subscribe((response) => {
                  this.books = response.data.filter(
                    (book: any) =>
                      book.category.name === this.category.name
                  );
                });

              this.isLoading = false;

              // type$.subscribe((type) => {
              //   console.log(type);
              //   this.categoryService
              //     .getCategoryByType(type)
              //     .subscribe((category) => {
              //       this.categories = category;
              //       this.categories = this.categories.filter(
              //         (c) => c.language === language
              //       );
              //       console.log(this.categories);
              //     });
              // });
            });
        });
    });
  }

  ngOnDestroy(): void {}

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
