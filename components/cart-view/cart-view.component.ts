import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Title }             from '@angular/platform-browser';
import { ActivatedRoute, Router }    from '@angular/router';
import { CartItem }          from 'src/app/models/cart.model';
import { Product }           from 'src/app/models/product.model';
import { CartService }       from 'src/app/services/cart.service';
import { Location }          from '@angular/common';
import { ShippingService }   from 'src/app/services/shipping.service';
import { ProductService }    from 'src/app/services/product.service';

@Component({
  selector: 'app-cart-view',
  template: `
  <div id="cart" class="container-lg container-fluid">
    <h1 class="display-6"><a (click)="goBack()" class="back-btn fw-lighter text-dark text-decoration-none"><i class="bi bi-arrow-left-circle"></i></a> Cart</h1>
      <app-cart-table [updatable]="true" (onCartUpdate)="cartUpdate($event)"></app-cart-table>
    <div class="row align-items-start">
      <div *ngIf="cart.length>0" class="col text-center">
        <button routerLink="/checkout" class="btn btn-success btn-lg">Checkout</button>
      <!-- goto: /checkout -->
      </div>
    </div>
  </div>

  `,
  styles: [
  ]
})
export class CartViewComponent implements OnInit {
  
  product! : Product;
  //recProducts  : Product[] = [];
  cart  : CartItem[] = [];
  items : CartItem[] = [];
  
  constructor(
    private api   : CartService,
    private productService   : ProductService,
    private route : ActivatedRoute,
    private title : Title,
    private router: Router,
    private location : Location,
    private shipping : ShippingService
  ) { }

  ngOnInit(): void {
    this.api.getCart().subscribe({
      next: (cart) => {
        this.items = cart;
        // if (cart != null) {
        //   this.productService.getRecommendations().subscribe({
        //     next: (products) => {
        //       this.recProducts = products;
        //       console.log(products);
        //     }
        //   });
        // }
      },
      error: (error) => {
     }
    })
    
  }

  qtyAsNumber(item: CartItem) {
    item.qty = item.qty ? +item.qty : 0;
  }  

  cartUpdate(cart: CartItem[]) {
    this.cart = cart;
    // this.productService.getRecommendations().subscribe((prods) => {
    //   this.recProducts = [];
    //   for(let p of prods){
    //     if (!cart.find(item => (item.id === p.id))){
    //       this.recProducts.push(p);
    //     }
    //   }
    // });
    
  }
  
  goBack() {
    this.location.back();
  } 

  // onClick() {
  //   if (!this.shipping.shippingAddress) {
  //       this.location.replaceState('/shipTo');
  //       this.router.navigate(['/shipTo']);
  //   } else {
  //       this.router.navigate(["/checkout"]);
  //      }
  // }

}

