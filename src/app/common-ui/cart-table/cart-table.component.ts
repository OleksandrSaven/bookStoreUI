import {Component, inject, Output} from '@angular/core';
import {DecimalPipe, NgForOf} from '@angular/common';
import {CartService} from '../../data/service/cart-service';
import {BookService} from '../../data/service/book.service';
import {CartItemExtend} from '../../data/interfaces/cart-item-extend';
import {catchError, EMPTY, switchMap, tap} from 'rxjs';
import {Book} from '../../data/interfaces/book.interface';
import {CartItem} from '../../data/interfaces/cart-item.interface';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-cart-table',
  imports: [
    NgForOf,
    FormsModule,
    DecimalPipe
  ],
  templateUrl: './cart-table.component.html',
  styleUrl: './cart-table.component.css'
})
export class CartTableComponent {
  cartService = inject(CartService);
  bookService = inject(BookService);
  router = inject(Router);
  shipping: number = 0;
  cartItems: CartItem[] = [];
  books: Book[] = [];
  cartItemExtend: CartItemExtend[] = [];
  subtotal: number = 0;

  constructor() {
    this.cartService.getShoppingCartItems().pipe(
      switchMap(cartData => {
        this.cartItems = cartData.cartItems;
        const bookIds = cartData.cartItems.map(item => item.bookId);
        return this.bookService.getBooksByBookId(bookIds);
      })
    ).subscribe({
        next: data => {
          this.books = data;
          this.fillCartItemExtend();
          this.subtotal = this.calcSubtotal(this.cartItemExtend);
          this.updateShipping();
        },
        error: err => {
          if (err.status === 401) {
            this.router.navigate(['/login']);
          }
        }
      }
    )
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

  calcSubtotal(items: CartItemExtend[]): number {
    return items.length !== 0 ? items.map(book => book.quantity * book.bookPrice)
      .reduce((a, b) => a + b): 0;
  }

  updateShipping() {
    return this.subtotal === 0? this.shipping = 0 : this.shipping = 5;
  }

  updateCartItemQuantity(cartItemId: number, quantity: number) {
    this.cartService.updateCartItemQuantity(cartItemId, {quantity} ).subscribe(
      data => {
        this.subtotal = this.calcSubtotal(this.cartItemExtend);
    })
  }

  deleteCartItem(id: number) {
    this.cartService.deleteCartItem(id).pipe(
      tap(() => {
        this.cartItemExtend = this.cartItemExtend.filter(
          item => item.cartItemId !== id
        );
        this.subtotal = this.calcSubtotal(this.cartItemExtend);
        this.updateShipping();
      }),
      switchMap(() => this.cartService.lengthCartItems()),
      catchError(error => {
        return EMPTY;
      })
    ).subscribe();
  }
}
