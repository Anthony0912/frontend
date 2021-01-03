import { Component, OnInit } from '@angular/core';
import { YoutubeService } from 'src/app/services/youtube.service';
import { TokenService } from 'src/app/services/token.service';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import * as $ from "jquery";

@Component({
  selector: 'app-profile-home',
  templateUrl: './profile-home.component.html',
  styleUrls: ['./profile-home.component.css']
})
export class ProfileHomeComponent implements OnInit {
  public playlists = null;
  public id_profile = null;
  public videos = null;
  public urlSafe: SafeResourceUrl;
  public text = "";
  public error = {
    videos: null
  }

  constructor(private Youtube: YoutubeService, private Token: TokenService, private sanitizer: DomSanitizer) {
    this.id_profile = this.Token.payload(this.Token.get())["sub"];
  }

  ngOnInit(): void {
    this.showPlaylistInProfile();
  }

  showPlaylistInProfile() {
    this.Youtube.showPlaylistInProfile(this.id_profile).subscribe(res => {
      this.playlists = res;
    });
  }
  onSubmit(event: any) {
    event.preventDefault();
    let id = event.target.id;
    this.Youtube.getVideosInProfile(id).subscribe(res => {
      this.videos = res;
    });
  }
  ngUrlSafe(url) {
    const array = url.split("=");
    const newUrl = `https://www.youtube.com/embed/${array[1]}` 
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(newUrl);
    return this.urlSafe;
  }
  onKeydown() {
    this.text = $("#search").val();
    if (this.text.length > 3) {
      let data = { id: this.id_profile, search: this.text };
      this.videoSearchProfile(data);
    }else if(this.text.length <= 3){
      this.videos = null;
    }
  }
  videoSearchProfile(data) {
    this.Youtube.videoSearchProfile(data).subscribe(res => {
      this.videos = res;
    });
  }

}
