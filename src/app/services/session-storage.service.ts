import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  handle(token) {
    this.set(JSON.stringify(token));
  }

  set(token) {
    sessionStorage.setItem('token', token);
  }

  get() {
    return JSON.parse(sessionStorage.getItem('token'));
  }

  remove() {
    sessionStorage.removeItem('token');
  }
}
