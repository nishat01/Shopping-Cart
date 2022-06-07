import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute   } from '@angular/router';
import { CartItem                 } from 'src/app/models/cart.model';
import { Product                  } from 'src/app/models/product.model';
import { CartService              } from 'src/app/services/cart.service';
import { ProductService           } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  template: `
    <ng-template [ngIf]="product" [ngIfElse]="noProduct">
      <!-- The 'product-page' template from Project D goes here -->
      <div class="card">
        <div class="card-body">
          <p class="card-text"><small class="text-muted">{{ product.id }}</small></p>
          <h5 class="class-title display-7">{{ product.name }}</h5>
          <p class="card-text">{{ product.description }}</p>
          <p class="card-text">
            <button type="button" data-id="{{ product.id }}" class="add-to-cart btn btn-primary" (click)="addToCart(product)" tabindex="0">
              Add To Cart
            </button>
          </p>
        </div>
        <div class="card-footer text-muted">
          <div class="row row-cols-2">
            <div class="col">{{ product.cost | currency }}</div>
          </div>
        </div>
      </div>
    </ng-template>
    <ng-template #noProduct>
      <div class="card">
        <div class="card-body">
          <p class="card-text text-center">Select a product</p>
        </div>
      </div>
    </ng-template>
  `,
  styles: [
  ]
})
export class ProductDetailsComponent implements OnInit {

  @Input() product! : Product;
  cartItem! : CartItem[];

  constructor(
    private api : CartService,
    private router : Router
  ) { }

  ngOnInit() {
  }

  addToCart(product: Product){
    this.api.addToCart(product, 1).subscribe({
      next:(cart) => {
        this.cartItem  = cart;
        //console.table(cart);
        this.router.navigate(['/']).then(() => { // force cart-view to reload
          this.router.navigate(['/cart']);
        });
      },
      error: (error) => {
        this.router.navigate(['/']);
      }
    });
    
  }
}
