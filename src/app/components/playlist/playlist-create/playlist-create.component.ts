import { Component, OnInit } from "@angular/core";
import { YoutubeService } from "src/app/services/youtube.service";
import { TokenService } from "src/app/services/token.service";
import { Routes, Router } from '@angular/router';

@Component({
  selector: "app-playlist-create",
  templateUrl: "./playlist-create.component.html",
  styleUrls: ["./playlist-create.component.css"]
})
export class PlaylistCreateComponent implements OnInit {

  public form = {
    id_user: null,
    name_playlist: null
  };

  public error = {
    id_user: null,
    name_playlist: null
  };

  constructor(private Youtube: YoutubeService, private Token: TokenService, private router: Router) {
    this.form.id_user = Token.payload(Token.get())["sub"];
  }

  onSubmit() {
    this.Youtube.playlistCreate(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data) {
    this.router.navigateByUrl("/playlist");
  }

  handleError(error) {
    this.error = error.error.errors;
  }
  ngOnInit(): void {}
}
