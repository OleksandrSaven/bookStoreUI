import {Component, EventEmitter, inject, Output} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {BookService} from '../../../data/service/book.service';
import {debounceTime, startWith, switchMap} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-book-filters',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './book-filters.component.html',
  styleUrl: './book-filters.component.css'
})
export class BookFiltersComponent {
  fb = inject(FormBuilder);
  bookService = inject(BookService);

  searchForm = this.fb.group({
    author: [''],
    title: [''],
    category: [''],
  })

  constructor() {
    this.searchForm.valueChanges
      .pipe(
        startWith({}),
        debounceTime(500),
        switchMap(formValue => {
          return this.bookService.filterBooks(formValue)
        }),
        takeUntilDestroyed()
      )
      .subscribe();
  }
}
