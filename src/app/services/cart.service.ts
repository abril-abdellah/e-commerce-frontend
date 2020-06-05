import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(cartItem: CartItem) {
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;
    if (this.cartItems.length > 0) {
      existingCartItem = this.cartItems.find(item => (item.id === cartItem.id))
      alreadyExistsInCart = (existingCartItem != undefined);
    }
    if (alreadyExistsInCart) {
      existingCartItem.quantity++;
    }
    else {
      this.cartItems.push(cartItem);
    }
    this.computeTotals();
  }

  decrementQuantity(item: CartItem) {
    item.quantity--;
    if (item.quantity == 0) {
      this.removeItem(item);
    }
    else {
      this.computeTotals();
    }
  }

  removeItem(item) {
    const itemIndex = this.cartItems.findIndex(element => element.id === item.id)
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
    }
  }

  computeTotals() {
    let totalPriceValue = 0;
    let totalQuantityValue = 0;
    this.cartItems.forEach(item => {
      totalPriceValue += (item.unitPrice * item.quantity);
      totalQuantityValue += item.quantity;
    });
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }

}
