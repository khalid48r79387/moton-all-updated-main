import { Component, OnDestroy, inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { Book } from 'src/app/core/interfaces/book';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from 'src/app/core/services/books/books.service';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { map } from 'rxjs/internal/operators/map';
import { ReviewService } from 'src/app/core/services/review/review.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/core/interfaces/user';
import { TranslocoService } from '@ngneat/transloco';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css'],
})
export class ShowComponent implements OnInit {
  isLoggedIn = false;

  book: Book = {
    authorName: '',
    bookName: '',
    bookSize: '',
    category: {
      name: '',
    },
    createdAt: '',
    delivaryPrice: 0,
    description: '',
    editionOfBook: '',
    image: '',
    language: '',
    numberOfCovers: '',
    price: 0,
    publicationDate: '',
    publisherName: '',
    ratingsAverage: 0,
    ratingsQuantity: 0,
    slug: '',
    sold: 0,
    type: '',
    updatedAt: '',
    _id: '',
    pdf: '',
  };
  books: Book[] = [];
  user: User = {
    _id: '',
    name: '',
    email: '',
    password: '',
    role: '',
    active: false,
  };
  reviews: any = [];

  customOptions: OwlOptions = {
    loop: false,
    rtl: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: false,
  };

  private route = inject(ActivatedRoute);
  id$ = this.route.params.pipe(map((params) => params['id']));

  constructor(
    private bookService: BooksService,
    private cartService: CartService,
    private toastr: ToastrService,
    private storageService: StorageService,
    private reviewService: ReviewService,
    private translocoService: TranslocoService
  ) {}

  reviewForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    book: new FormControl(null, [Validators.required]),
    user: new FormControl(null, [Validators.required]),
    ratings: new FormControl(null, [Validators.required]),
  });


  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    this.id$.subscribe((id) => {
      if (!id) return;
      this.bookService.GetBookByID(id).subscribe((res) => {
        this.book = res.data;
        this.reviewForm.controls['book'].setValue(this.book._id);
        console.log(this.book);
        
      });
    });

    this.bookService.getAllBooks().subscribe((res) => {
      this.books = res.data;
    });

    if (this.storageService.isLoggedIn()) {
      this.user = this.storageService.getUser();
    }

    this.reviewForm.controls['user'].setValue(this.user._id);

    this.reviewService.getAllReviews().subscribe((res) => {
      let DamyData = res.data
      console.log(DamyData);

      for (let i = 0; i < DamyData.length; i++) {
        if (DamyData[i].book === this.book._id) {
          this.reviews.push(DamyData[i]);
        }
      }     
    });
  }

  addToCart(bookId: string) {
    this.cartService.addToCart(bookId).subscribe((res) => {
      this.toastr.success(
        this.translocoService.translate(
          'home.book_added_to_cart',
          {},
          'ar'
        )
      );
    });
  }

  handelReviewForm(reviewForm: FormGroup) {
    this.reviewService.createReview(reviewForm.value).subscribe({
      next: (response) => {
        this.toastr.success(response.message);
      },
      error: (err) => this.toastr.error(err.error.errors[0].msg),
    });
  }

  // In your component class


}
