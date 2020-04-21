import { Component, OnInit } from "@angular/core";
import { YoutubeService } from "src/app/services/youtube.service";
import { TokenService } from "src/app/services/token.service";
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as $ from "jquery";

@Component({
  selector: "app-playlist-create",
  templateUrl: "./playlist-create.component.html",
  styleUrls: ["./playlist-create.component.css"]
})
export class PlaylistCreateComponent implements OnInit {

  public form: FormGroup;
  public id_user = null;
  public error = {
    name_playlist: null
  };

  constructor(private Youtube: YoutubeService, private Token: TokenService, private router: Router) {
    this.id_user = Token.payload(Token.get())["sub"];
  }

  ngOnInit(): void {
    this.validations();
    this.clearValidationErrorServer();
  }
  onSubmit() {
    this.Youtube.playlistCreate(this.form.value).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  validations() {
    this.form = new FormGroup({
      'name_playlist': new FormControl(null, Validators.required),
      'id_user': new FormControl(this.id_user),
    });
  }

  handleResponse(data) {
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
