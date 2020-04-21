import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { YoutubeService } from "src/app/services/youtube.service";
import { TokenService } from "src/app/services/token.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as $ from "jquery";

@Component({
  selector: "app-video-create",
  templateUrl: "./video-create.component.html",
  styleUrls: ["./video-create.component.css"]
})
export class VideoCreateComponent implements OnInit {
  public id_user = null;
  public form: FormGroup;

  public error = {
    url: null
  };

  constructor(
    private Youtube: YoutubeService,
    private router: Router,
    private Token: TokenService
  ) {
    this.id_user = Token.payload(Token.get())["sub"];
  }
  ngOnInit(): void {
    this.Validations();
    this.clearValidationErrorServer();
  }

  onSubmit() {
    this.Youtube.videoCreate(this.form.value).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data) {
    this.router.navigateByUrl("/video");
  }

  handleError(error) {
    this.error = error.error.error;
    $("#errorUrl").show();
  }

  Validations() {
      this.form = new FormGroup({
        'name_video': new FormControl(null, Validators.required),
        'url': new FormControl(null, Validators.required),
        'status': new FormControl(null,Validators.required),
        'id_user': new FormControl(this.id_user),
      });
  }
  clearValidationErrorServer() {
    $("#url").keydown(function () {
      $("#errorUrl").hide();
    });
  }

  get name_video() { return this.form.get('name_video'); }

  get url() { return this.form.get('url'); }

  get status() { return this.form.get('status'); }
}
