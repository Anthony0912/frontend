import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class YoutubeService {
  private baseUrl = "https://youtubekids-api.herokuapp.com/api";

  constructor(private http: HttpClient) { }
  login(data) {
    return this.http.post(`${this.baseUrl}/login`, data);
  }
  signup(data) {
    return this.http.post(`${this.baseUrl}/signup`, data);
  }
  settingAccountEdit(data) {
    return this.http.get(`${this.baseUrl}/settingAccount/${data}`);
  }
  settingAccountUpdate(data) {
    return this.http.patch(`${this.baseUrl}/settingAccount`, data);
  }
  getCodeCountries() {
    return this.http.get(`${this.baseUrl}/countries`);
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
    return this.http.get(`${this.baseUrl}/video/${data}`);
  }
  videoEdit(data) {
    return this.http.get(`${this.baseUrl}/videoEdit/${data}`);
  }
  videoSearch(data) {
    return this.http.get(`${this.baseUrl}/videoSearch/${data.id}/${data.search}`);
  }
  videoUpdate(data) {
    return this.http.patch(`${this.baseUrl}/videoUpdate`, data);
  }
  videoChangeStatus(data) {
    return this.http.get(`${this.baseUrl}/videoChangeStatus/${data}`);
  }
  videoDelete(data) {
    return this.http.delete(`${this.baseUrl}/video/${data}`);
  }
  playlistCreate(data) {
    return this.http.post(`${this.baseUrl}/playlistCreate`, data);
  }
  playlist(data) {
    return this.http.get(`${this.baseUrl}/playlist/${data}`);
  }
  playlistEdit(data) {
    return this.http.get(`${this.baseUrl}/playlistEdit/${data}`);
  }
  playlistUpdate(data) {
    return this.http.patch(`${this.baseUrl}/playlistUpdate`, data);
  }
  playlistDelete(data) {
    return this.http.delete(`${this.baseUrl}/playlist/${data}`);
  }
  videoPlaylistCreate(data) {
    return this.http.post(`${this.baseUrl}/videoPlaylistCreate`, data);
  }
  videoPlaylist(id_user, id_playlist) {
    return this.http.get(`${this.baseUrl}/videoPlaylist/${id_user}/${id_playlist}`);
  }
  profile(data) {
    return this.http.get(`${this.baseUrl}/profile/${data}`);
  }
  profileCreate(data) {
    return this.http.post(`${this.baseUrl}/profileCreate`, data);
  }
  profileChangeStatus(data) {
    return this.http.get(`${this.baseUrl}/profileChangeStatus/${data}`);
  }
  profileEdit(data) {
    return this.http.get(`${this.baseUrl}/profileEdit/${data}`);
  }
  showPlaylistInProfile(data) {
    return this.http.get(`${this.baseUrl}/profile/playlists/${data}`);
  }
  videoSearchProfile(data) {
    return this.http.get(`${this.baseUrl}/profile/search/${data.id}/${data.search}`);
  }
  getVideosInProfile(data) {
    return this.http.get(`${this.baseUrl}/profile/playlists/videos/${data}`);
  }
  profileUpdate(data) {
    return this.http.patch(`${this.baseUrl}/profileUpdate`, data);
  }
  profileDelete(data) {
    return this.http.delete(`${this.baseUrl}/profile/${data}`);
  }
  profilePasswordReset(data) {
    return this.http.patch(`${this.baseUrl}/profilePasswordReset`, data);
  }
  profileLogin(data){
    return this.http.post(`${this.baseUrl}/profileLogin`, data);
  }

}
