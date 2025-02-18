import {CartItem} from './cart-item.interface';

export interface ShoppingCart {
  id: number;
  userId: number;
  cartItems: CartItem[];
}
