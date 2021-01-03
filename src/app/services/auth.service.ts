import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { TokenService } from "./token.service";

@Injectable()

export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(this.Token.loggedIn());
  authStatus = this.loggedIn.asObservable();

  changeAuthStatus(value: boolean) {
    this.loggedIn.next(value);
  }

  isValidOptionNavbarRole(){
   if (this.Token.loggedIn()) {
      return this.Token.payload(this.Token.get())['role'] == 'adult' ? true : false;
    }
  }

  constructor(private Token: TokenService) { }
}
