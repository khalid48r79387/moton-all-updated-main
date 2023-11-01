import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const BASE_URL = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private client: HttpClient) {}

  public getAllCategories(): Observable<any> {
    return this.client.get<any>(BASE_URL + `categories`);
  }

  public getCategoryById(id: number): Observable<any> {
    return this.client.get<any>(BASE_URL + `categories/${id}`);
  }

  public getCategoryByType(type: string): Observable<any> {
    return this.client.get<any>(
      BASE_URL + `categories/search/${type}`
    );
  }

  public uploadImage(imageData: any): Observable<any> {
    return this.client.post<any>(
      BASE_URL + 'categoryimageupload/categoryImage',
      imageData
    );
  }

  public addCategory(categoryData: any): Observable<any> {
    return this.client.post<any>(
      BASE_URL + 'categories',
      categoryData
    );
  }

  public deleteCategory(iid: string): Observable<any> {
    return this.client.delete(BASE_URL + `categories/${iid}`);
  }
}
