import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/core/interfaces/book';
import { BooksService } from 'src/app/core/services/books/books.service';

@Component({
  selector: 'app-all-electronic-books',
  templateUrl: './all-electronic-books.component.html',
  styleUrls: ['./all-electronic-books.component.css'],
})
export class AllElectronicBooksComponent implements OnInit {
  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.checkData();
  }

  books: Book[] = [];

  booksize: number = 0;

  checkData() {
    this.booksService.getAllBooks().subscribe({
      next: (res) => {
        console.log(this.books);

        this.books = [];
        let book_info = res.data;

        for (let i = 0; i < book_info.length; i++) {
          if (book_info[i].type === 'electronic') {
            this.books.push(book_info[i]);
          }
        }
        this.booksize = this.books.length;
        console.log(this.booksize);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onDeleteBook(id: string) {
    this.booksService.deleteBook(id).subscribe({
      next: (res) => {
        alert('تم حذف الكتاب بنجاح');
        this.checkData();
      },
      error: (err) => {
        console.log('Error fetching Book data:', err);
      },
    });
  }
}
