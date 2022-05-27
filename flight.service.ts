import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class FlightService {
  productUrl = './assets/products.json';

  constructor(private http : HttpClient) { }
  getProducts() {
    return this.http.get<any>(this.productUrl)
  }
}
