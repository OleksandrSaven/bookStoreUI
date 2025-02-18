import {Component, inject} from '@angular/core';
import {NgForOf} from '@angular/common';
import {CartService} from '../../data/service/cart-service';
import {BookService} from '../../data/service/book.service';
import {CartItemExtend} from '../../data/interfaces/cart-item-extend';
import {switchMap} from 'rxjs';
import {Book} from '../../data/interfaces/book.interface';
import {CartItem} from '../../data/interfaces/cart-item.interface';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-cart-table',
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './cart-table.component.html',
  styleUrl: './cart-table.component.css'
})
export class CartTableComponent {
  cartService = inject(CartService);
  bookService = inject(BookService);
  router = inject(Router);
  cartItems: CartItem[] = [];
  books: Book[] = [];
  cartItemExtend: CartItemExtend[] = [];

  constructor() {
    this.cartService.getShoppingCartItems().pipe(
      switchMap(cartData => {
        this.cartItems = cartData.cartItems;
        const bookIds = cartData.cartItems.map(item => item.bookId);
        return this.bookService.getBooksByBookId(bookIds);
      })
    ).subscribe(bookData => {
      this.books = bookData;
      this.fillCartItemExtend();
    });
  }

  fillCartItemExtend() {
    const bookMap = this.books.reduce((acc, book) => {
      acc[book.id] = book;
      return acc;
    }, {} as { [key: number]: Book })

    this.cartItemExtend = this.cartItems.map(item => {
      const book = bookMap[item.bookId];
      return {
        cartItemId: item.id,
        bookTitle: item.bookTitle,
        quantity: item.quantity,
        bookPrice: book ? book.price : 0,
        bookImage: book ? book.coverImage : null
      };
    })
  }

  deleteCartItem(id: number) {
    this.cartService.deleteCartItem(id).subscribe({
        next: () => {
          this.cartItemExtend = this.cartItemExtend.filter(item => item.cartItemId !== id);
        }
      }
    );
  }
}
