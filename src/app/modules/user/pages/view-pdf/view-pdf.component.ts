import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import { Book } from 'src/app/core/interfaces/book';
import { BooksService } from 'src/app/core/services/books/books.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-view-pdf',
  templateUrl: './view-pdf.component.html',
  styleUrls: ['./view-pdf.component.css'],
})
export class ViewPdfComponent implements OnInit {
  private route = inject(ActivatedRoute);
  id$ = this.route.params.pipe(map((params) => params['id']));

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
  pdf: any;

  constructor(
    private bookService: BooksService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.id$.subscribe((id) => {
      if (!id) return;
      this.bookService.GetBookByID(id).subscribe((res) => {
        this.book = res.data;
        this.pdf = this.sanitizer.bypassSecurityTrustResourceUrl(
          this.book.pdf
        );
        console.log(res.data);
      });
    });
  }
}
