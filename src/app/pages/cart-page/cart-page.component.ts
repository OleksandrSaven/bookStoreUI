import {Component, inject} from '@angular/core';
import {CartTableComponent} from '../../common-ui/cart-table/cart-table.component';
import {CartService} from '../../data/service/cart-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cart-pages',
  imports: [
    CartTableComponent
  ],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {
  cartService = inject(CartService);
  router = inject(Router);

  cartItemCount() {
    return this.cartService.countItem();
  }

  cartClick(){
    this.router.navigate(['']);
  }
}
