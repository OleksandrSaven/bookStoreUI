import {Component, inject} from '@angular/core';
import {BookProfileComponent} from "../../common-ui/book-profile/book-profile.component";
import {BookServiceService} from '../../data/service/book-service.service';
import {Book} from '../../data/interfaces/book.interface';
import {Router} from '@angular/router';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-search-page',
  imports: [
    BookProfileComponent,
    MatPaginator
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent {
  bookService = inject(BookServiceService);
  authService = inject(AuthService);
  books: Book[] = [];
  currentPage = 0;
  totalElements = 0;
  pageSizeOptions = [5, 10];
  pageSize = this.pageSizeOptions[0];

  constructor() {
    this.loadBooks();
  }

  handlePageEvent(pageEvent: PageEvent) {
    this.pageSize = pageEvent.pageSize;
    this.currentPage = pageEvent.pageIndex;
    this.loadBooks();
  }

  loadBooks(){
    this.bookService.getBooks(this.currentPage, this.pageSize).subscribe({
      next: page => {
        this.books = page.content;
        this.totalElements = page.totalElements;
        this.currentPage = page.number;
      },
      error: error => {
        if (error.status == 401) {
          this.authService.logout();
        }
      }
    })
  }
}
