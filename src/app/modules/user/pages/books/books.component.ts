import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import { map } from 'rxjs/internal/operators/map';
import { Book } from 'src/app/core/interfaces/book';
import { Category } from 'src/app/core/interfaces/category';
import { BooksService } from 'src/app/core/services/books/books.service';
import { CategoryService } from 'src/app/core/services/category/category.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  private route = inject(ActivatedRoute);
  type$ = this.route.params.pipe(map((params) => params['type']));
  isLoading: boolean = false;
  books: Book[] = [];
  categories: Category[] = [];
  arabicCategories: Category[] = [];
  englishCategories: Category[] = [];
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
  activeSlides?: SlidesOutputData;
  constructor(
    private bookService: BooksService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.type$.subscribe((type) => {
      if (!type) {
        this.isLoading = false;
        return;
      }
      this.categoryService
        .getAllCategories()
        .subscribe((response) => {
          this.isLoading = false;

          this.categories = response.data.filter(
            (category: any) => category.type === type
          );
          this.arabicCategories = this.categories?.filter(
            (category) => category.language === 'arabic'
          );
          this.englishCategories = this.categories?.filter(
            (category) => category.language === 'english'
          );
        });
    });

    // this.type$.subscribe((type) => {
    //   if (!type) {
    //     this.isLoading = false;
    //     return;
    //   }

    //   this.bookService.getAllBooks().subscribe((res) => {
    //     this.isLoading = false;

    //     this.books = res.data;
    //     this.books = this.books?.filter((b) => b.type === type);
    //   });
    // });
  }
}
