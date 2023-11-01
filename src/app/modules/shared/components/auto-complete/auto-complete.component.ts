import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from 'src/app/core/interfaces/book';
import { BooksService } from 'src/app/core/services/books/books.service';
@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css'],
})
export class AutoCompleteComponent implements OnInit {
  books!: Book[];
  searchForm: FormGroup = new FormGroup({
    search: new FormControl(null, [Validators.required]),
  });
  constructor(
    private booksService: BooksService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.booksService.getAllBooks().subscribe((res) => {
      this.books = res.data;
    });
  }

  bookNameValue(bookName: string) {
    this.searchForm.controls['search'].setValue(bookName);
  }

  handelSearchForm(searchForm: FormGroup) {
    if (searchForm.valid) {
      let book: Book = this.books.filter(
        (book: Book) =>
          book.bookName === searchForm.controls['search'].value
      )[0];
      this.router.navigate(['/show', book._id]);
    }
  }
}
