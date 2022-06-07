import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product, Category } from '../models/product.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginAPIService {

  constructor(
    private http: HttpClient 
  ) {
  }

  getClient() {
    return this.http.get<any>(`/api/login`); 
  }

}
