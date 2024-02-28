import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient,) { }

  getProducts(): Observable<any> {
    const headers = new HttpHeaders({
      'authorId': '200'
    });

    return this.http.get('https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products', { headers })
      // .subscribe(
      //   data => {
      //     this.products = data;
      //     console.log(this.products);
      //   },
      //   error => {
      //     console.error('There was an error!', error);
      //   }
      // );
  }
}
