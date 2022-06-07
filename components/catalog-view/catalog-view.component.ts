import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-catalog-view',
  templateUrl: './catalog-view.component.html',
  styleUrls: ['./catalog-view.component.css']
})
export class CatalogViewComponent implements OnInit {


  catalog:Category[]
  constructor(private productService: ProductService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllcatalog()
  }
  getAllcatalog() {
    this.productService.getCatalog().subscribe((resposne:Category[])=>{
      console.log('resposne',resposne)
      this.catalog = resposne
    },(error)=>{
      console.log(error)
    })
  }
  OpenCatalog(id:number) {
    this.router.navigate(['/category',id])
  }
}
