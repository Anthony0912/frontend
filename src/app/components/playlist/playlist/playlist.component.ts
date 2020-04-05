import { Component, OnInit } from '@angular/core';
import { YoutubeService } from 'src/app/services/youtube.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-playlist",
  templateUrl: "./playlist.component.html",
  styleUrls: ["./playlist.component.css"]
})
export class PlaylistComponent implements OnInit {
  public id_user = null;
  public playlists = null;
  public error = null;

  constructor(private Youtube: YoutubeService, private Token: TokenService, private router: Router) {
    this.id_user = Token.payload(Token.get())["sub"];
  }

  ngOnInit(): void {
    this.playlistShow();
  }

  playlistShow() {
    this.Youtube.playlist(this.id_user).subscribe(res => {
      this.playlists = res;
    });
  }
  playlistEdit(event: any) {
    event.preventDefault();
    let id = event.target.id;
    localStorage.setItem("id_playlist", id);
    this.router.navigateByUrl("playlist/playlist-update");
  }
  playlistDelete(event: any) {
    event.preventDefault();
    let id = event.target.id;
    this.Youtube.playlistDelete(id).subscribe(res => {
      this.error = res;
      this.playlistShow();
    });
  }
  playlistAddVideos(event){
    event.preventDefault();
    let id = event.target.id;
    localStorage.setItem("id_playlist", id);
    this.router.navigateByUrl("playlist/playlist-video");
  }
}
