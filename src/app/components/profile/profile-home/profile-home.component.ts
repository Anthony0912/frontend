import { Component, OnInit } from '@angular/core';
import { YoutubeService } from 'src/app/services/youtube.service';
import { TokenService } from 'src/app/services/token.service';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

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
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    return this.urlSafe;
  }
}
