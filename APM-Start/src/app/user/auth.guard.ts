import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService:AuthService,
              private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {
    const { url } = state;
    return this.checkLoggedIn(url);
  }
  
  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkLoggedIn(route.path);
  }
  
  checkLoggedIn(url: string) {
    if (this.authService.isLoggedIn) return true;
    
    this.authService.redirectUrl = url;
    this.router.navigate(['/login']);
    return false;
  }
}
