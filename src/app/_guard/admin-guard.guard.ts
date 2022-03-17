import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuardGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    var isAdmin = true;
    var isAuthenticated = this.authService.isLoggedIn();

    if (!isAuthenticated) {
      isAdmin = false;
    } else {
      const user = JSON.parse(localStorage.getItem('userMed'));
      if (user) {
        this.authService.getUserData(user).subscribe((res) => {
          if (res.admin) {
            isAdmin = true;
          } else {
            isAdmin = false;
          }
        });
      }
    }
    return isAdmin;
  }
}
