import {Component, inject} from '@angular/core';
import {BookProfileComponent} from "../../common-ui/book-profile/book-profile.component";
import {BookServiceService} from '../../data/service/book-service.service';
import {Book} from '../../data/interfaces/book.interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search-page',
    imports: [
        BookProfileComponent
    ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent {
  bookService = inject(BookServiceService)
  router = inject(Router);
  books: Book[] = [];

  constructor() {
    this.loadBooks();
  }

  loadBooks(){
    this.bookService.getBooks(0, 11).subscribe({
      next: page => {
        this.books = page.content;
        console.log(page);
      },
      error: error => {
        if (error.status == 401) {
          this.router.navigate(['/login']);
        }
      }
    })
  }
}
