import { Component, OnInit } from "@angular/core";
import { YoutubeService } from "src/app/services/youtube.service";
import { Router } from "@angular/router";
import { TokenService } from 'src/app/services/token.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as $ from "jquery";

@Component({
  selector: "app-video-update",
  templateUrl: "./video-update.component.html",
  styleUrls: ["./video-update.component.css"]
})
export class VideoUpdateComponent implements OnInit {
  public error = {
    url: null
  };
  public form: FormGroup;
  public video = null;
  public id = null;

  constructor(private Youtube: YoutubeService, private router: Router, private Token: TokenService) {
    this.id = localStorage.getItem("id_video");
  }

  ngOnInit(): void {
    this.videoEdit();
    this.clearValidationErrorServer();
  }

  onSubmit() {
    this.Youtube.videoUpdate(this.form.value).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data) {
    localStorage.removeItem('id_video');
    this.router.navigateByUrl("/video");
  }

  handleError(error) {
    this.error = error.error.error;
    $("#errorUrl").show();
  }

  videoEdit(){
    this.Youtube.videoEdit(this.id).subscribe(res => {
      this.video = res
      this.form = new FormGroup({
        'name_video': new FormControl(this.video.name_video, Validators.required),
        'url': new FormControl(this.video.url, Validators.required),
        'id': new FormControl(this.id),
      });
    });
  }
  clearValidationErrorServer() {
    $("#url").keydown(function () {
      $("#errorUrl").hide();
    });
  }

  get name_video() { return this.form.get('name_video'); }

  get url() { return this.form.get('url'); }
}
