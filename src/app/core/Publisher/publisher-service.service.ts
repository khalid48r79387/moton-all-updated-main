import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../interfaces/book';

const BASE_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class PublisherServiceService {

  constructor(private client:HttpClient) { }

  getTotalPrice(): Observable<any> {
    return this.client.get(BASE_URL + `order/totalPrices`);
  }

  getCountOfBooks(PublisherName :string): Observable<any> {
    return this.client.get(BASE_URL + `publisher/books/booksCount/`+PublisherName);
  }

  getTotalSales(PublisherName :string): Observable<any> {
    return this.client.get(BASE_URL + `order/totalPricesForSpecificPublisher/`+PublisherName);
  }

  // add book for publisher

  uploadBookImage(image_data: any): Observable<any> {
    return this.client.post<any>(BASE_URL +`bookimageupload/bookImage`, image_data);
  }

  uploadBookPfd(PDFdata: any): Observable<any> {
    return this.client.post<any>(BASE_URL +`upload/pdf`, PDFdata);
  }

  addBook(book_data: object): Observable<any> {
    return this.client.post(BASE_URL+ 'publisher/books', book_data);
  }

  getAllBooks():Observable<any>{
    return this.client.get(BASE_URL + 'books')
  }

  deleteBook(iid: string): Observable<any> {
    return this.client.delete(BASE_URL + 'books/' + iid );
  }

  

}
