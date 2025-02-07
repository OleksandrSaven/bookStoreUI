import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Book} from '../interfaces/book.interface';
import {Page} from '../interfaces/page.interfase';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {
  http = inject(HttpClient);
  baseUrl = 'http://localhost:8081/api';

  constructor() {
  }

  getBooks(page: number, size: number) {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
    return this.http.get<Page<Book>>(`${this.baseUrl}/books`, { params });
  }
}
