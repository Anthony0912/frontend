import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }
  login(data) {
    return this.http.post(`${this.baseUrl}/login`, data);
  }
  signup(data) {
    return this.http.post(`${this.baseUrl}/signup`, data);
  }
  factorAuthentication(data){
    return this.http.post(`${this.baseUrl}/factorAuthentication`, data);
  }
  factorAuthenticationResendToken(){
    return this.http.get(`${this.baseUrl}/factorAuthenticationResendToken`);
  }
  vericationAccount(data) {
    return this.http.post(`${this.baseUrl}/verificationAccount`, data);
  }
  sendPasswordResetLink(data) {
    return this.http.post(`${this.baseUrl}/sendPasswordResetLink`, data);
  }
  changePassword(data) {
    return this.http.post(`${this.baseUrl}/resetPassword`, data);
  }

}
