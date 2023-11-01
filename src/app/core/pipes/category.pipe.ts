import { Pipe, PipeTransform, inject } from '@angular/core';
import { Book } from '../interfaces/book';
import { BooksService } from '../services/books/books.service';

@Pipe({
  name: 'category',
})
export class CategoryPipe implements PipeTransform {
  private bookService = inject(BooksService);

  transform(books: Book[], filters: string[]): Book[] {
    let results: any = [];

    if (!books) {
      return [];
    }
    if (filters.length < 1) {
      return books;
    }

    return books.reduce((acc: any, book) => {
      if (filters.some((filter) => filter == book.category.name)) {
        acc.push(book);
      }
      return acc;
    }, []);
  }
}
