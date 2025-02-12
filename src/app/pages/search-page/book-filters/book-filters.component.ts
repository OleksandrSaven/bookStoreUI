import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {catchError, debounceTime, of, startWith, switchMap} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {BookService} from '../../../data/service/book.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../auth/auth.service';


@Component({
  selector: 'app-book-filters',
  imports: [
    ReactiveFormsModule,
    MatPaginator
  ],
  templateUrl: './book-filters.component.html',
  styleUrl: './book-filters.component.css'
})
export class BookFiltersComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  bookService = inject(BookService);
  currentPage = 0;
  totalElements = 100;
  pageSizeOptions = [1, 5, 10];
  pageSize = this.pageSizeOptions[2];

  searchForm = this.fb.group({
    author: [''],
    title: [''],
    category: [''],
  })

  handlePageEvent(pageEvent: PageEvent) {
    this.pageSize = pageEvent.pageSize;
    this.currentPage = pageEvent.pageIndex;
    this.bookService.filterBooks(this.searchForm.value, this.currentPage, this.pageSize)
      .pipe(
        catchError(err => {
          if (err.status === 401) {
            this.authService.logout();
          }
          return of({content: [], totalElements: 0});
        })
      )
      .subscribe(result => {
        this.totalElements = result.totalElements;
      })
  }

  constructor() {
    this.searchForm.valueChanges
      .pipe(
        startWith({}),
        debounceTime(500),
        switchMap(formValue => {
          return this.bookService.filterBooks(formValue, this.currentPage, this.pageSize).pipe(
            catchError(err => {
              if (err.status === 401) {
                this.authService.logout();
              }
              return of({content: [], totalElements: 0});
            }),
          )
        }),
        takeUntilDestroyed()
      )
      .subscribe(result => {
        this.totalElements = result.totalElements;
      });
  }
}
