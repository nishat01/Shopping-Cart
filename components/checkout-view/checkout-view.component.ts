import { Location           } from '@angular/common';
import { Component, OnInit  } from '@angular/core';
import { Title              } from '@angular/platform-browser';
import { Router             } from '@angular/router';
import { ShippingService    } from 'src/app/services/shipping.service';
import { CartService } from 'src/app/services/cart.service';
import { Shipping } from 'src/app/models/shipping.model';

@Component({
  selector: 'app-checkout-view',
  template: `
  <div id="checkout" class="container-lg container-fluid">
  <div class="row align-items-start">
    <div class="col">
      <h1 class="display-6">
        <a (click)="goBack()" class="back-btn fw-lighter text-dark text-decoration-none"><i class="bi bi-arrow-left-circle"></i></a>
        <span class="ms-4">Checkout</span>
      </h1>
      <hr class="mt-4">
    </div>
  </div>
  <div class="row align-items-start">
    <div class="col col-lg-9">

      <app-cart-table></app-cart-table>

    </div>
    <div class="col col-lg-3" *ngIf="shippingAddress">
      <div class="card">
        <div class="card-header text-white bg-primary">Shipping Address</div>
        <div class="card-body">
          <p class="card-text">
            <!-- replace these with the appropriate fields -->

            <b>{{ shippingAddress.recipient }}</b><br>
            {{  shippingAddress.streetAddress }}<br>
            <span *ngIf="shippingAddress.streetAddress2"> {{ shippingAddress.streetAddress2 }}<br></span>
            {{ shippingAddress.city }}, {{ shippingAddress.province.code }}<br>
            {{ shippingAddress.postalCode }}
          </p>
        </div>
        <div class="card-footer">
          {{ shippingAddress.delivery }}
        </div>
      </div>
    </div>
  </div>
  <div class="row align-items-start">
    <div class="col col-lg-9 text-center">

      <button routerLink="/catalog" class="btn btn-primary btn-lg">Continue Shopping</button><!-- goto: /catalog -->
      <button routerLink="/finish" (click)="onCheckout()" class="btn btn-success btn-lg ms-4">Checkout</button><!-- goto: /finish -->

    </div>
  </div>
  </div>      
  `,
  styles: [
  ]
})
export class CheckoutViewComponent implements OnInit {

  constructor(
    private location  : Location,
    private title     : Title,
    private router    : Router,
    private shipping  : ShippingService,
    private api: CartService
  ) { }

  get shippingAddress() {
    return this.shipping.shippingAddress;
  }

  ngOnInit(): void {
    this.title.setTitle('Checkout');
    if (!this.shipping.shippingAddress) {
      this.router.navigate(['/shipTo']), { replaceUrl: true };
    }
  }

  goBack() {
    this.location.back();
  } 

  onCheckout(){
    //console.log(this.cart)
    //this.api
    this.api.checkoutCart(this.shipping);
    console.log("oncheckout");
  }
}
