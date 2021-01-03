import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { YoutubeService } from 'src/app/services/youtube.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Component({
  selector: 'app-playlist-video',
  templateUrl: './playlist-video.component.html',
  styleUrls: ['./playlist-video.component.css']
})
export class PlaylistVideoComponent implements OnInit {
  public videos = null;
  public id_user = null;
  public id_playlist = null;
  public videoInPlaylists = null;
  public status = null;
  public urlSafe: SafeResourceUrl;

  public form = {
    id_user: null,
    id_playlist: null,
    id_video: null
  }
  constructor(private Youtube: YoutubeService, private router: Router, private Token: TokenService, private sanitizer: DomSanitizer) {
    this.id_playlist = localStorage.getItem("id_playlist");
    this.id_user = Token.payload(Token.get())["sub"];
  }
  ngOnInit(): void {
    this.videoPlaylist();
  }

  videoPlaylist() {
    this.Youtube.videoPlaylist(this.id_user, this.id_playlist).subscribe(res => {
      this.videos = res;
      console.log(this.videos)
    });
  }
  ngUrlSafe(url) {
    const array = url.split("=");
    const newUrl = `https://www.youtube.com/embed/${array[1]}` 
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(newUrl);
    return this.urlSafe;
  }

  addVideoToPlayList(event: any) {
    event.preventDefault();
    let id = event.target.id;
    this.form = {
      id_user: this.id_user,
      id_playlist: this.id_playlist,
      id_video: id
    };
    this.Youtube.videoPlaylistCreate(this.form).subscribe(res => {
      this.status = res;
      this.changeStyleButton(id, this.status.add_playlist);
    });
  }

  changeStyleButton(id, status) {
    if (!status) {
      $(`button#${id}`).removeClass("btn-danger");
      $(`button#${id}`).addClass("btn-success");
      $(`button#${id}`).remove("Delete playlist");
      $(`button#${id}`).text("Add playlist");
    } else {
      $(`button#${id}`).removeClass("btn-success");
      $(`button#${id}`).addClass("btn-danger");
      $(`button#${id}`).remove("Add playlist");
      $(`button#${id}`).text("Delete playlist");
    }
  }
}
