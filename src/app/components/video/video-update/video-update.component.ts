import { Component, OnInit } from "@angular/core";
import { YoutubeService } from "src/app/services/youtube.service";
import { Router } from "@angular/router";
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: "app-video-update",
  templateUrl: "./video-update.component.html",
  styleUrls: ["./video-update.component.css"]
})
export class VideoUpdateComponent implements OnInit {
  public video = null;
  public id = null;

  public form = {
    id: this.id,
    name_video: null,
    url: null
  };

  public error = {
    name_video: null,
    url: null
  };
  constructor(private Youtube: YoutubeService, private router: Router, private Token: TokenService) {
    this.id = localStorage.getItem("id_video");
  }

  ngOnInit(): void {
    this.videoEdit();
  }

  onSubmit() {
    this.Youtube.videoUpdate(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data) {
    localStorage.removeItem('id_video');
    this.router.navigateByUrl("/video");
  }

  handleError(error) {
    this.error = error.error.errors;
  }

  videoEdit(){
    this.Youtube.videoEdit(this.id).subscribe(res => {
      this.video = res
      this.form = {
        id: this.id,
        name_video: this.video.name_video,
        url: this.video.url
      };
    });
  }
}
