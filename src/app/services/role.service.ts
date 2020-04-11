import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private Token: TokenService) { }

  isAuthorized(allowedRoles: string[]): boolean {

    if (allowedRoles == null || allowedRoles.length === 0) {
      return true;
    }

   const role = this.Token.payload(this.Token.get())['role'];

    return allowedRoles.includes(role);
  }
}
