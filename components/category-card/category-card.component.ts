import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category, Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styles: []
})
export class CategoryCardComponent implements OnInit {
  @Input() category: Product;
  @Input() isBackButton: boolean = false;

  urlTarget!: string;
  constructor(private router:Router,
    private cartService: CartService) { }

  ngOnInit(): void {
   console.log('cat',this.category)
  }
  addToCart(item:Product) {
     this.cartService.addToCart(item).subscribe((resposne)=>{
       console.log('Add Successfully')
       this.router.navigate(['/cart'])
     },(error)=>console.log(error))
  }
}
