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
  resendSms(data){
    return this.http.patch(`${this.baseUrl}/resendSms`, data);
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
