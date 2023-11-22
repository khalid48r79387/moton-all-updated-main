import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environment';
import { Book } from '../../interfaces/book';

const BASE_URL = environment.apiURL;

const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private client: HttpClient) {}

  getAllBooks(): Observable<any> {
    return this.client.get(BASE_URL + `books`);
  }

  GetBookByID(bookId: string): Observable<any> {
    return this.client.get(BASE_URL + `books/${bookId}`);
  }

  search(keywords: string): Observable<any> {
    return this.client.get(BASE_URL + `books/search/${keywords}`);
  }

  getPaymobTokens(): Observable<any> {
    return this.client.get(BASE_URL + `order/paymobTokens`);
  }

  uploadBookImage(imageData: any): Observable<any> {
    return this.client.post<any>(
      BASE_URL + 'bookimageupload/bookImage',
      imageData
    );
  }

  uploadBookPfd(pdfData: any): Observable<any> {
    return this.client.post<any>(
      BASE_URL + 'upload/pdf',
      pdfData
    );
  }

  addBook(bookData: object): Observable<any> {
    return this.client.post(BASE_URL + 'books', bookData);
  }

  deleteBook(iid: string): Observable<any> {
    return this.client.delete(BASE_URL + 'books/' + iid );
  }

  updateBook(book: Book): Observable<any> {
    return this.client.put(BASE_URL + 'books/' + book._id, book);
  }


  // add home page image and title
  Update_HomePage(){
    
  }

  HomePageImage(){
    return this.client.get(BASE_URL + 'pageimage');
  }
}
