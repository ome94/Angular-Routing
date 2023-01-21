import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ProductResolved } from "./product";
import { ProductService } from "./product.service";

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<ProductResolved>{

  constructor(private productService: ProductService) { }

  resolve(route: ActivatedRouteSnapshot):
          Observable<ProductResolved> {
    const id = +route.paramMap.get('id');
    if (isNaN(id)) {
      const message = ''
      console.error(message);
      return of({product: null, error: message})
    }
    
    return this.productService.getProduct(id).pipe(
      map(product => ({product: product})),
      catchError(error => {
        const message = `Product retrieval for product ${id} failed : ${error}`;
        console.error(message);
        return of({product: null, error: message});
      })
    )
  }
}
