import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';

const ROUTES: Route[] = [
  {path: 'welcome', component: WelcomeComponent},
  {
    path: 'products',
    loadChildren:  () => import('./products/product.module')
        .then(module => module.ProductModule)
  },
  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(ROUTES),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
