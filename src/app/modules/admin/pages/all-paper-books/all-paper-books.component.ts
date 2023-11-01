import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/core/interfaces/book';
import { BooksService } from 'src/app/core/services/books/books.service';

@Component({
  selector: 'app-all-paper-books',
  templateUrl: './all-paper-books.component.html',
  styleUrls: ['./all-paper-books.component.css'],
})
export class AllPaperBooksComponent implements OnInit {
  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.checkData();
  }

  books: Book[] = [];

  checkData() {
    this.booksService.getAllBooks().subscribe({
      next: (res) => {
        this.books = [];
        let book_info = res.data;
        // this.Book = res.data;
        console.log(res.data[5]);
        // type:"paper"

        for (let i = 0; i < book_info.length; i++) {
          if (book_info[i].type === 'paper') {
            this.books.push(book_info[i]);
          }
        }
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
