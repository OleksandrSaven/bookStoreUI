import {Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ShoppingCart} from '../interfaces/shopping-cart.interface';
import {CartItem} from '../interfaces/cart-item.interface';
import {tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl = 'http://localhost:8081/api';

  countItem =  signal<number>(0)

  constructor(private http: HttpClient) { }

  lengthCartItems() {
    return this.http.get<ShoppingCart>(`${this.baseUrl}/cart`).pipe(
      tap(res => {
        this.countItem.set(res.cartItems ? res.cartItems.length : 0);
      })
    )
  }

  addToCart(payload: { bookId: number; quantity: number }) {
    return this.http.post<CartItem>(`${this.baseUrl}/cart`, payload)
  }

  getShoppingCartItems() {
    return this.http.get<ShoppingCart>(`${this.baseUrl}/cart`)
  }

  deleteCartItem(id: number) {
    return this.http.delete(`${this.baseUrl}/cart/cart-items/${id}`)
  }
}
