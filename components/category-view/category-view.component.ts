import { Component, OnInit      } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Category, Product      } from 'src/app/models/product.model';
import { ProductService         } from 'src/app/services/product.service';
import { Title                  } from '@angular/platform-browser';

@Component({
  selector: 'app-category-view',
  template: `
  <div id="category" class="container-lg container-fluid">
  <div class="row row-cols-1 row-cols-lg-4 g-4">
    
    <div *ngIf="category">
      <app-category-card [category]="category" [isBackButton]="true"></app-category-card>
    </div>
    <div class="col col-lg-9">
      <div id="product-columns">
        <div id="product-list-column">
          <div id="product-list-scroller">
            <div id="product-list" class="list-group list-group-flush">            
              <a class="list-group-item list-group-item-action product-card"
                *ngFor="let product of products"
                [ngClass]="{'active': selected && product.id === selected.id }"
                [routerLink]="'/products/' + product.id">
                {{ product.name }}
              </a>              
            </div>
          </div>
        </div>
        <div id="product-info">                
            <app-product-details [product]="selected"></app-product-details>         
        </div>
        
      </div>
    </div>
  </div>
  </div>

  `,
  styles: [
  ]
})
export class CategoryViewComponent implements OnInit {

  category! : Category;
  products  : Product[] = [];
  selected! : Product;

  constructor(
    private api   : ProductService,
    private router: Router,
    private route : ActivatedRoute,
    private title : Title) {
  }

  ngOnInit(): void {
    
    this.route.paramMap.subscribe((params) => {
      if (params.has('catId')) {
        this.showCategory(+params.get('catId')!);       
      } else if (params.has('prodId')) {
        this.showProduct(params.get('prodId')!); // assign product to this.selected
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  showCategory(catID : number){
    this.api.getCategoryById(catID).subscribe({
      next: (category) => {
        this.category = category;
        //console.log(category);
        this.title.setTitle(this.selected ? this.selected.name : category.name);
        this.api.getProductsByCategory(catID).subscribe((products) => {
            this.products = products;
          })
      },
      error: (error) => {
        this.router.navigate(['/']);
      }      
    });
  }

  showProduct(prodId : string){
    this.api.getProductById(prodId).subscribe({
      next: (product) => {
        this.selected = product;
        //console.log(product);
        this.title.setTitle(this.selected ? this.selected.name : product.name);
        this.showCategory(product.catId);
      },
      error: (error) => {
        this.router.navigate(['/']);
      }     
    });
  }

}
