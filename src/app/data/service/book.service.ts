import {inject, Injectable, signal} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Book} from '../interfaces/book.interface';
import {Page} from '../interfaces/page.interfase';
import {tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  http = inject(HttpClient);
  baseUrl = 'http://localhost:8081/api';

  filteredBooks = signal<Page<Book> | null>(null)

  constructor() {
  }

  filterBooks(params: Record<string, any>) {
    return this.http.get<Page<Book>>(`${this.baseUrl}/books/search`, { params })
      .pipe(
      tap(res => {this.filteredBooks.set(res)})
    )
  }
}
