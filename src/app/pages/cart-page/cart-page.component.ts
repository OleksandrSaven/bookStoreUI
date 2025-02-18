import { Component } from '@angular/core';
import {CartTableComponent} from '../../common-ui/cart-table/cart-table.component';

@Component({
  selector: 'app-cart-pages',
  imports: [
    CartTableComponent
  ],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {

}
