import {Component, Input} from '@angular/core';
import {Book} from '../../data/interfaces/book.interface';

@Component({
  selector: 'app-book-profile',
  imports: [],
  templateUrl: './book-profile.component.html',
  styleUrl: './book-profile.component.css'
})
export class BookProfileComponent {
  @Input() book!: Book;
}
