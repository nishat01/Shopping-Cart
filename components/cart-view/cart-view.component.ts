import { Component, OnInit } from '@angular/core';
import { Title }             from '@angular/platform-browser';
import { ActivatedRoute }    from '@angular/router';
import { CartItem }          from 'src/app/models/cart.model';
import { Product }           from 'src/app/models/product.model';
import { CartService }       from 'src/app/services/cart.service';
import { Location }          from '@angular/common';

@Component({
  selector: 'app-cart-view',
  template: `
  <div id="cart" class="container-lg container-fluid">
  <h1 class="display-6"><a (click)="goBack()" class="back-btn fw-lighter text-dark text-decoration-none"><i class="bi bi-arrow-left-circle"></i></a> Cart</h1>
  <table id="cart-table" class="table">
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Name</th>
        <th scope="col">Cost</th>
        <th scope="col">Quantity</th>
        <th scope="col">Update</th>
      </tr>
    </thead>
    <tbody class="table-hover">
      <tr *ngFor="let item of items"> 
      <!-- 'cart-row' template from Project D goes here -->

          <td scope="row">{{ item.id }}</td>
          <td>{{ item.product!.name }}</td>
          <td>{{ item.product!.cost | currency }}</td>
        
          <td><input type="text" class="qty-input form-control" [(ngModel)]="item.qty" (ngModelChange)="qtyAsNumber(item)" /></td>
          <td><button type="button" tabindex="0" class="update-cart btn btn-primary" (click)="updateCart(item)">Update</button></td>
      </tr>
    </tbody>
  </table>
  </div>

  `,
  styles: [
  ]
})
export class CartViewComponent implements OnInit {

  product! : Product;
  cart! : CartItem;
  items! : CartItem[];
  

  constructor(
    private api   : CartService,
    private route : ActivatedRoute,
    private title : Title,
    private location : Location
  ) { }

  ngOnInit(): void {
    this.api.getCart().subscribe({
      next: (cart) => {
        this.items = cart;
      },
      error: (error) => {

      }
    })
  }

  qtyAsNumber(item: CartItem) {
    item.qty = item.qty ? +item.qty : 0;
  }  

  updateCart(item : CartItem) {
    this.api.updateCart(item).subscribe({
      next: (cart) => {
        //console.log(cart);
        alert('Cart Updated!');
      }
    });
  }

  goBack() {
    this.location.back();
  } 

}
