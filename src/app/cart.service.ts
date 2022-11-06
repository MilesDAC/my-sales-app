import { Injectable } from '@angular/core';
import { CartItem } from './cart.dto';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  readonly CART: string = 'cart';
  readonly CART_QUANTITY: string = 'cart_quantity';

  constructor() { }

  public getItems(): Array<CartItem> {
    const cartItems = localStorage.getItem(this.CART);
    if (cartItems){
      return JSON.parse(cartItems);
    }
    return [];
  }

  public addItem(item: CartItem): void {
    let found = false;
    const items = this.getItems();
    items.forEach(element => {
      if(element.idProduct === item.idProduct) {
        element.quantity ++;
        found = true;
      }
    });
    if (!found) {
      items.push(item);
    }
    localStorage.setItem(this.CART, JSON.stringify(items));
    localStorage.setItem(this.CART_QUANTITY, items.length.toString());
  }
  
  public removeItem(item: CartItem): void {
    let found = false;
    const items = this.getItems();
    items.forEach(element => {
      if(element.idProduct === item.idProduct) {
        element.quantity--;
        found = true
      }
    });
    const newItems = items.filter(element => element.quantity > 0);
    localStorage.setItem(this.CART, JSON.stringify(newItems));
    localStorage.setItem(this.CART_QUANTITY, newItems.length.toString());
  }

  get itemsInCart(): number{
    return this.getItems().length;
  }
  
  get total(): number{
    let total = 0;
    const items = this.getItems();
    items.forEach(element => {
      total+= (element.unitPrice * element.quantity);
    });
    return total;
  }

}
