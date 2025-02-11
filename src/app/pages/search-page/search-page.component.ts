import {Component, effect, inject, signal} from '@angular/core';
import {BookProfileComponent} from "../../common-ui/book-profile/book-profile.component";
import {BookService} from '../../data/service/book.service';
import {Book} from '../../data/interfaces/book.interface';
import {Router} from '@angular/router';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {AuthService} from '../../auth/auth.service';
import {BookFiltersComponent} from './book-filters/book-filters.component';

@Component({
  selector: 'app-search-page',
  imports: [
    BookProfileComponent,
    MatPaginator,
    BookFiltersComponent,
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent {
  bookService = inject(BookService);
  authService = inject(AuthService);
  currentPage = 0;
  totalElements = 0;
  pageSizeOptions = [1, 5, 10];
  pageSize = this.pageSizeOptions[1];

  constructor() {
  }

  handlePageEvent(pageEvent: PageEvent) {
    this.pageSize = pageEvent.pageSize;
    this.currentPage = pageEvent.pageIndex;
  }

  get books() {
    return this.bookService.filteredBooks()?.content ?? [];
  }
}
