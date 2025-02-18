import {Component, inject, Input} from '@angular/core';
import {Book} from '../../data/interfaces/book.interface';
import {CartService} from '../../data/service/cart-service';

@Component({
  selector: 'app-book-profile',
  imports: [],
  templateUrl: './book-profile.component.html',
  styleUrl: './book-profile.component.css'
})
export class BookProfileComponent {
  @Input() book!: Book;
  cartService = inject(CartService);

  addBookToCart(){
    this.cartService.addToCart({bookId: this.book.id, quantity: 1}).subscribe({
      next: result => {
        this.cartService.lengthCartItems().subscribe();
      },
      error: err => {
        console.error('Error adding cart item', err);
      }
      }
    )
  }
}
