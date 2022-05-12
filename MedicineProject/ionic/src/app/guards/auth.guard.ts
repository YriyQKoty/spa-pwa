import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DataGetterService } from '../service/data-getter.service';
import { FireDataServiceService } from '../service/fire-data-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const isLoggedIn = this.fireData.getUser() !== ''
      if (!isLoggedIn) {
        this.router.navigateByUrl('/login')
      }
   
      return isLoggedIn;
  }

  constructor(
    private dataGetter: DataGetterService,
    private fireData: FireDataServiceService,
    private router: Router
  ) {

  }
  
}
