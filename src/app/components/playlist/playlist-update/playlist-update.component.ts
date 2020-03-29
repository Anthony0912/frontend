import { Component, OnInit } from "@angular/core";
import { YoutubeService } from "src/app/services/youtube.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-playlist-update",
  templateUrl: "./playlist-update.component.html",
  styleUrls: ["./playlist-update.component.css"]
})
export class PlaylistUpdateComponent implements OnInit {
  public playlist = null;
  public id = null;
  public form = {
    id: this.id,
    name_playlist: null
  };

  public error = {
    name_playlist: null
  };

  constructor(private Youtube: YoutubeService, private router: Router) {
    this.id = localStorage.getItem("id_playlist");
  }

  onSubmit() {
    console.log(this.form);
    this.Youtube.playlistUpdate(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  ngOnInit(): void {
    this.Youtube.playlistEdit(this.id).subscribe(res => {
      this.playlist = res;
      this.form = {
        id: this.id,
        name_playlist: this.playlist.name_playlist
      };
    });
  }
  handleResponse(data) {
    console.log(data);
    localStorage.removeItem("id_playlist");
    this.router.navigateByUrl("/playlist");
  }

  handleError(error) {
    this.error = error.error.errors;
  }
}
