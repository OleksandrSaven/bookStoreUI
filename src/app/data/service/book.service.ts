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

  filterBooks(params: Record<string, any>, page: number, size: number) {
    let pageParams = new HttpParams()
      .set('page', page)
      .set('size', size);

    for (const key in params) {
      if (params[key] !== undefined && params[key] !== '') {
        pageParams = pageParams.set(key, params[key]);
      }
    }
    return this.http.get<Page<Book>>(`${this.baseUrl}/books/search`, {params: pageParams})
      .pipe(
        tap(res => {
          this.filteredBooks.set(res)
        })
      )
  }
}
