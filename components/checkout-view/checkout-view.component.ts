import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ShippingService } from 'src/app/services/shipping.service';
import {Location} from '@angular/common';
@Component({
  selector: 'app-checkout-view',
  templateUrl: './checkout-view.component.html',
  styleUrls: ['./checkout-view.component.css']
})
export class CheckoutViewComponent implements OnInit {

  constructor(
    private location: Location,
    private title: Title,
    private router: Router,
    private shipping: ShippingService,

  ) { }

  ngOnInit(): void {
    this.title.setTitle('Checkout');
    if (!this.shipping.shippingAddress) {
       this.location.replaceState('/shipTo');
      this.router.navigate(['/shipTo']);
    }
  }

  get shippingAddress() {
    return this.shipping.shippingAddress;
  }
  goBack() {
    this.location.back()
  }

}
