import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart-model';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart-table',
  templateUrl: './cart-table.component.html',
  styleUrls: ['./cart-table.component.css']
})
export class CartTableComponent implements OnInit {
  items: CartItem[] = [];
  total: number = 0;
  cart: any[]
  AllCartData: Product[] = [];
  constructor(private cartService: CartService,
    private location: Location,
    private productService: ProductService) { }
  @Input() updatable: boolean = false;
  ngOnInit(): void {
    this.getCart()
  }
  getCart() {
    this.cartService.getCartItem().subscribe((response) => {
      this.cart = response
      this.cart.forEach((x) => {
        this.getProductDetails(x.productId, x.qty)
      })
    }, (error) => console.log(error))
  }
  goBack() {
    this.location.back()
  }
  getProductDetails(id: string, qty: number) {
    this.productService.getProductById(id).subscribe((response) => {
      response.map(x => {
        x.qty = qty
      })
      this.AllCartData.push(response[0])
      this.totalPrice()

    }, (error) => console.log(error))
  }
  qtyAsNumber(item: CartItem) {
    item.qty = +item.qty;
    this.totalPrice()
  }


  totalPrice() {
    this.total = 0
    this.AllCartData.map((x)=>{
      this.total = this.total + (x.cost * x.qty)
    })
  }

}
