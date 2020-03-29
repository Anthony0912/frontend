import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class YoutubeService {
  private baseUrl = "http://localhost:8000/api";

  constructor(private http: HttpClient) {}
  login(data) {
    return this.http.post(`${this.baseUrl}/login`, data);
  }
  signup(data) {
    return this.http.post(`${this.baseUrl}/signup`, data);
  }
  factorAuthentication(data) {
    return this.http.post(`${this.baseUrl}/factorAuthentication`, data);
  }
  resendSms(data) {
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
  videoCreate(data) {
    return this.http.post(`${this.baseUrl}/videoCreate`, data);
  }
  video(data) {
    return this.http.get(`${this.baseUrl}/video/` + data);
  }
  videoEdit(data) {
    return this.http.get(`${this.baseUrl}/videoEdit/` + data);
  }
  videoUpdate(data) {
    return this.http.patch(`${this.baseUrl}/videoUpdate`, data);
  }
  videoChangeStatus(data) {
    return this.http.get(`${this.baseUrl}/videoChangeStatus/` + data);
  }
  videoDelete(data) {
    return this.http.delete(`${this.baseUrl}/video/` + data);
  }
  playlistCreate(data) {
    return this.http.post(`${this.baseUrl}/playlistCreate`, data);
  }
  playlist(data) {
    return this.http.get(`${this.baseUrl}/playlist/` + data);
  }
  playlistEdit(data) {
    return this.http.get(`${this.baseUrl}/playlistEdit/` + data);
  }
  playlistUpdate(data) {
    return this.http.patch(`${this.baseUrl}/playlistUpdate`, data);
  }
  playlistDelete(data) {
    return this.http.delete(`${this.baseUrl}/playlist/` + data);
  }
}
