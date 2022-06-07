import { Component, OnInit    } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { RouterModule, Router } from '@angular/router';
import { Product, Category    } from 'src/app/models/product.model';
import { ProductService       } from 'src/app/services/product.service';

@Component({
  selector: 'app-catalog-view',
  template: `
  <div id="catalog" class="container">
  <div class="row row-cols-2 row-cols-md-4 g-4">
    <div class="col ratio-1x1 square">
      <div class="card catalog-titlecard bg-dark text-white text-center">
        <div class="card-img-overlay">
          <h2 class="card-title display-6">Catalog</h2>
        </div>
      </div>
    </div>
    <app-category-card
      *ngFor="let category of categories"
      [category]="category">
    </app-category-card>
  </div>
  </div>
  `,
  styles: [
  ]
})
export class CatalogViewComponent implements OnInit {

  categories! : Category[]
  constructor(
    private api : ProductService,
    private router : Router,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.api.getCatalog().subscribe((categories : Category[]) => {
      this.categories = categories;   
      this.title.setTitle('Catalog');
    });
  }
}
