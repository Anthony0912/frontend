import { Component, OnInit } from "@angular/core";
import { YoutubeService } from "src/app/services/youtube.service";
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as $ from "jquery";

@Component({
  selector: "app-playlist-update",
  templateUrl: "./playlist-update.component.html",
  styleUrls: ["./playlist-update.component.css"]
})
export class PlaylistUpdateComponent implements OnInit {
  public playlist = null;
  public id = null;
  public form: FormGroup;

  public error = {
    name_playlist: null
  };

  constructor(private Youtube: YoutubeService, private router: Router, private Token: TokenService) {
    this.id = localStorage.getItem("id_playlist");
  }

  ngOnInit(): void {
    this.playlistEdit();
    this.clearValidationErrorServer();
  }
  onSubmit() {
    this.Youtube.playlistUpdate(this.form.value).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }


  playlistEdit() {
    this.Youtube.playlistEdit(this.id).subscribe(res => {
      this.playlist = res;
      this.form = new FormGroup({
        'name_playlist': new FormControl(this.playlist.name_playlist, Validators.required),
        'id': new FormControl(this.id),
      });
    });
  }
  handleResponse(data) {
    localStorage.removeItem("id_playlist");
    this.router.navigateByUrl("/playlist");
  }

  handleError(error) {
    this.error = error.error.error;
    $("#errorNamePlaylist").show();
  }

  clearValidationErrorServer() {
    $("#name_playlist").keydown(function () {
      $("#errorNamePlaylist").hide();
    });
  }
  get name_playlist() { return this.form.get('name_playlist'); }
}
