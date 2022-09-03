import { AuthService } from './../services/auth.service';
import { UserService } from './../services/user.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {
    const userLoggedIn = this.authService.getAccessToken();
    if (userLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
    return false;
  }
}
