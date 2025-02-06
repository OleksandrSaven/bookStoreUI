import {Component, inject} from '@angular/core';
import {BookProfileComponent} from "../../common-ui/book-profile/book-profile.component";
import {BookServiceService} from '../../data/service/book-service.service';
import {Book} from '../../data/interfaces/book.interface';

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
  books: Book[] = [];

  constructor() {
    this.loadBooks();
  }

  loadBooks(){
    this.bookService.getBooks().subscribe({
      next: data => {
        this.books = data;
        console.log(this.books);
      }
    })
  }
}
