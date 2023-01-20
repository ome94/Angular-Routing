import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';

import { ProductDetailComponent } from './product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductListComponent } from './product-list.component';

import { ProductResolver } from "./product-resolver.service";

const ROUTES: Route[] = [
  {path: 'products', component: ProductListComponent},
  {
    path: 'products/:id',
    data: { pageTitle: 'Product Detail' },
    component: ProductDetailComponent,
    resolve: { resolvedData: ProductResolver }
  },
  {
    path: 'products/:id/edit',
    data: { pageTitle: 'Edit Product' },
    component: ProductEditComponent,
    resolve: { resolvedData: ProductResolver }
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
