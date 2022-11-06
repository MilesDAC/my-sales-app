import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, lastValueFrom } from 'rxjs';
import { Product } from '../product.dto';
import { ProductService } from '../product.service';
import { CartService } from 'src/app/cart.service';
import { CartItem } from 'src/app/cart.dto';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit {

  products!: Product[];
  productObservable!: Observable<Product[]>;
  searchForm!: FormGroup;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private cartService: CartService
  ) { }

  async ngOnInit(){
    this.searchForm = this.fb.group({
      searchTerm: [''],
    });
    this.getAllProducts();
  }
  async getAllProducts(searchTerm: string = '') {
    this.productObservable = this.productService.getAll(searchTerm);
    this.products = await lastValueFrom(this.productObservable);
  }

  onSubmit(){
    this.getAllProducts(this.searchForm.value.searchTerm);
  }

  onAddToCart(item: Product){
    const cartItem: CartItem = {
      idProduct: item.id,
      name: item.name,
      quantity: 1,
      unitPrice: item.unitPrice
    }
    this.cartService.addItem(cartItem);
  }
}
