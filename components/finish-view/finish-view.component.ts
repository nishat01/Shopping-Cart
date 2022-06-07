import { Component, OnInit } from '@angular/core';
import { Router            } from '@angular/router';

@Component({
  selector: 'app-finish-view',
  template: `
    <div id="finish" class="container-lg container-fluid">
      <div class="row align-items-start mt-4">
        <div class="col col-lg-6 offset-lg-3 text-center">
          <i class="bi bi-bag-check text-success" style="font-size: 200pt"></i><br>
          <h1 class="display-6 mt-1">Thanks for Shopping!</h1>
        </div>
      </div>
      <div class="row align-items-start mt-4">
        <div class="col col-lg-6 offset-lg-3 text-center">

          <hr><button class="btn btn-primary btn-lg" (click)="goToHome()" >Home</button>

        </div>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class FinishViewComponent implements OnInit {

  constructor(
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  goToHome() {
    this.router.navigate(['/']);
  }
}
