import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Book} from '../interfaces/book.interface';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {
  http = inject(HttpClient);
  baseUrl = 'http://localhost:8081/api';

  constructor() { }

  getBooks() {
    return this.http.get<Book[]>(`${this.baseUrl}/books`);
  }
}
