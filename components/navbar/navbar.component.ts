import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-navbar',
  template: `
  <nav class="navbar sticky-top navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <a routerLink="/" class="navbar-brand">Models R US</a>
      <div class="d-flex">
        <a routerLink="/login" class="btn btn-outline-dark pt-0 pb-0 me-1"><i class="bi bi-box-seam fs-4"></i></a>
        <a routerLink="/cart" class="btn btn-outline-dark pt-0 pb-0"><i class="bi bi-cart4 fs-4"></i></a>
      </div>
    </div>
  </nav>
  `,
  styles: [
  ]
})
export class NavbarComponent implements OnInit {

  constructor(){ }

  ngOnInit(): void {

  }

}
