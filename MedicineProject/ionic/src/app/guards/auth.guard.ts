import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DataGetterService } from '../service/data-getter.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const isLoggedIn = this.dataGetter.getUser() !== ''
      if (!isLoggedIn) {
        this.router.navigateByUrl('/login')
      }
   
      return isLoggedIn;
  }

  constructor(
    private dataGetter: DataGetterService,
    private router: Router
  ) {

  }
  
}
