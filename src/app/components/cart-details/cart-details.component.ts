import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;
  
  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.listCarttDetails();
  }

  listCarttDetails() {
    this.cartItems = this.cartService.cartItems;
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
    this.cartService.computeTotals();
  }

  incrementQuantity(item){
    this.cartService.addToCart(item);
  }

  decrementQuantity(item){
    this.cartService.decrementQuantity(item);
  }

  removeItem(item){
    this.cartService.removeItem(item);
  }
}
