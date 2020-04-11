import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';
import { RoleService } from './role.service';

@Injectable({
  providedIn: 'root'
})
export class AfterLoginService implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean |
  Observable<boolean> | Promise<boolean> {
    const allowedRoles = route.data.allowedRoles;
     const isAuthorized = this.roleservice.isAuthorized(allowedRoles);
   if(this.Token.loggedIn()){
    if (!isAuthorized) {
      this.router.navigate(['/']);
    }
  }
  return isAuthorized;
  }

  constructor(private Token: TokenService, private roleservice: RoleService, private router: Router) { }
}
