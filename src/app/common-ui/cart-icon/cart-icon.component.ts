import {Component, inject} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatBadge} from '@angular/material/badge';
import {CartService} from '../../data/service/cart-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cart-icons',
  imports: [
    MatIcon,
    MatBadge
  ],
  templateUrl: './cart-icon.component.html',
  styleUrl: './cart-icon.component.css'
})
export class CartIconComponent {
  cartService = inject(CartService)
  router = inject(Router);

  cartItemCount() {
    return this.cartService.countItem();
  }

  ngOnInit(): void {
    this.cartService.lengthCartItems().subscribe();
  }
}
