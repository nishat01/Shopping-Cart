import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-table',
  template: `
    <table id="cart-table" class="table">
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Name</th>
        <th scope="col">Cost</th>
        <th scope="col">Quantity</th>
        <th scope="col">Subtotal</th>
        <th scope="col" *ngIf="updatable">Update</th>
      </tr>
    </thead>
    <tbody class="table-hover">
      <tr *ngFor="let item of items">
        <td scope="row">{{ item.id }}</td>
        <td>{{ item.product!.name }}</td>
        <td>{{ item.product!.cost | currency }}</td>
        <td>
          <ng-template [ngIf]="updatable" [ngIfElse]="notUpdatable">
          <input type="text" class="qty-input form-control" [(ngModel)]="item.qty" (ngModelChange)="qtyAsNumber(item)">
          </ng-template>
          <ng-template #notUpdatable>
           {{ item.qty }}
          </ng-template>
        </td>
        <td>{{ item.product!.cost * item.qty | currency }}</td>
        <td *ngIf="updatable">
          <button type="button" tabindex="0"
              class="update-cart btn btn-primary"
              (click)="updateCart(item)">Update</button>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <th scope="col"></th>
        <th scope="col"></th>
        <th scope="col"></th>
        <th scope="col"></th>
        <!-- <div *ngFor="let item of items">{{getTotal(items)}}</div> -->
        <th scope="col">{{getTotal(items) | currency}}</th>
        <th scope="col" *ngIf="updatable"></th>
      </tr>
    </tfoot>
  </table>
  `,
  styles: [
  ]
})
export class CartTableComponent implements OnInit {

  @Input() updatable: boolean = false;
  @Output() onCartUpdate = new EventEmitter<CartItem[]>();

  total = 0;
  items: CartItem[] = [];

  constructor(private cart: CartService) { }

  ngOnInit(): void {
    this.cart.getCart().subscribe((items) => {
      this.items = items;
      this.onCartUpdate.emit(this.items);
  });
    
}

qtyAsNumber(item: CartItem) {
  item.qty = +item.qty;
}

updateCart(item: CartItem) {
  this.cart.updateCart(item).subscribe((items) => {
    alert('Cart Updated');
    
    this.items = items.map((updated) => {
      const it = this.items.find(it => updated.id === it.id);
      updated.product = it!.product;
      return updated;
    });
    this.onCartUpdate.emit(this.items); 
  });
}

getTotal(items: CartItem[]){
  let subTotal = 0;
  let total = 0;
  if (this.items){
    for( let item of items) {
      subTotal = item.product!.cost * item.qty;
      total = total + subTotal;
      this.total = total;      
    };
  };
  return total;
}

}
