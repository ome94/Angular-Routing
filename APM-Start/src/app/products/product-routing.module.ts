import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductEditInfoComponent } from "./product-edit/product-edit-info.component";
import { ProductEditTagsComponent } from "./product-edit/product-edit-tags.component";

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
    component: ProductEditComponent,
    data: { pageTitle: 'Edit Product' },
    resolve: { resolvedData: ProductResolver },
    children: [
      {path: 'info', component: ProductEditInfoComponent},
      {path: 'tags', component: ProductEditTagsComponent},
      { path: '', redirectTo: 'info', pathMatch: 'full' }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
