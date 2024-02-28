import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products';
  private headers = new HttpHeaders({
    'authorId': '200'
  });

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl, { headers: this.headers });
  }

  availableId(searchId: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/verification?id=${searchId}`, { headers: this.headers });
  }

  postProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product, { headers: this.headers });
  }

  deleteProduct(prodId: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}?id=${prodId}`, { headers: this.headers });
  }
}
