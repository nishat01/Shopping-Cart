import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart-model';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit {
  cart: any[]
  AllCartData: Product[] = [];
  total: number = 0
  constructor(private location: Location,
    private cartService: CartService,
    private productService: ProductService) { }

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
  totalPrice() {
    this.total = 0
    this.AllCartData.map((x)=>{
      this.total = this.total + (x.cost * x.qty)
    })
  }
  qtyAsNumber(item: CartItem) {
    item.qty = +item.qty;
    this.totalPrice()
  }


  updateCart(item: Product) {
    this.cartService.updateCart(item, item.qty).subscribe((response) => {
      alert('Updated Data Successfully')
      this.cart = []
      this.AllCartData = []
      this.getCart()
      // this.cart = response.map((updated) => {
      //   const it = this.cart.find(it => updated.id === it.id);
      //   updated.product = it!.product;
      //   return updated;
      // });
      console.log('cart', this.cart)
    })
  }
}
