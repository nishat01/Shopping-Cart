import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import {Location} from '@angular/common';
import { Category, Product } from 'src/app/models/product.model';
@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.css']
})
export class CategoryViewComponent implements OnInit {
  catalog: Category[];
  selectedId: number;
  selectedName: string;
  products: Product[]
  specificProduct: Product[]=[];

  constructor(private activeRoute: ActivatedRoute,
    private router: Router,
    private api: ProductService,
    private _location: Location) { }

  ngOnInit(): void {
    this.selectedId = Number(this.activeRoute.snapshot.paramMap.get('catId'))
    this.getAllcatalog()
    this.showCategory(this.selectedId)
  }
  showCategory(catId: number) {
    this.api.getProductsByCategory(catId).subscribe({
      next: (category) => {
         console.log('category',category)
         this.products  = category
      },
      error: (error) => {
        this.router.navigate(['/']);
      }
    });
  }

  backCatlog() {
    this._location.back();
  }
  getAllcatalog() {
    this.api.getCatalog().subscribe((resposne:Category[])=>{
      console.log('resposne',resposne)

      this.catalog = resposne
      this.catalog = this.catalog.filter(x=>x.id == this.selectedId)
      this.selectedName = this.catalog[0].name
    },(error)=>{
      console.log(error)
    })
  }
  specificproductDetails(id) {
    this.api.getProductById(id).subscribe((resposne:Product[])=>{
      console.log('specificProduct',resposne)
      this.specificProduct = resposne
    },(error)=>{
      console.log(error)
    })
  }
}
