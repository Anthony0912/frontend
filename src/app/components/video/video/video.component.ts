import { Component, OnInit, ViewChild } from "@angular/core";
import { YoutubeService } from "src/app/services/youtube.service";
import { Router } from "@angular/router";
import { TokenService } from "src/app/services/token.service";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import * as $ from "jquery";

@Component({
  selector: "app-video",
  templateUrl: "./video.component.html",
  styleUrls: ["./video.component.css"]
})
export class VideoComponent implements OnInit {
  public urlSafe: SafeResourceUrl;
  public error = {
    videos: null
  };
  public delete = null;
  public video = null;
  public videos = null;
  public status = null;
  public id_user = null;
  public video_search = null;
  public text = "";

  constructor(
    private Youtube: YoutubeService,
    private router: Router,
    private Token: TokenService,
    private sanitizer: DomSanitizer
  ) {
    this.id_user = Token.payload(Token.get())["sub"];
  }

  ngOnInit(): void {
    this.videoShow();
  }

  ngUrlSafe(url) {
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    return this.urlSafe;
  }

  /**
   * Show videos for user
   */
  videoShow() {
    this.Youtube.video(this.id_user).subscribe(res => {
      this.videos = res;
    });
  }

  /**
   * Change status of the video
   * @param event get by doing click id of link
   */
  videoChangeStatus(event: any) {
    event.preventDefault();
    let id = event.target.id;
    this.Youtube.videoChangeStatus(id).subscribe(res => {
      this.status = res;
      if (this.status != null) {
        this.changeStyleButton(id, this.status.status);
      }
    });
  }

  changeStyleButton(id, status) {
    if (status) {
      $(`button#` + id).removeClass("btn-danger");
      $(`button#` + id).addClass("btn-success");
      $(`button#` + id).remove("Disabled");
      $(`button#` + id).text("Activated");
    } else {
      $(`button#` + id).removeClass("btn-success");
      $(`button#` + id).addClass("btn-danger");
      $(`button#` + id).remove("Activated");
      $(`button#` + id).text("Disabled");
    }
  }

  /**
   * get data video of the database
   * @param event get by doing click id of link
   */
  videoEdit(event: any) {
    event.preventDefault();
    let id = event.target.id;
    localStorage.setItem("id_video", id);
    this.router.navigateByUrl("/video/video-update");
  }

  videoDelete(event: any) {
    event.preventDefault();
    let id = event.target.id;
    this.Youtube.videoDelete(id).subscribe(res => {
      this.delete = res;
      this.videoShow();
    });
  }

  onKeydown() {
    this.text = $("#search").val();
    if (this.text.length > 3) {
      let data = { id: this.id_user, search: this.text };
      this.videoSearch(data);
    }else if(this.text.length === 0){
      this.videoShow();
    }
  }

  videoSearch(data) {
    this.Youtube.videoSearch(data).subscribe(res => {
      this.videos = res;
    });
  }

  handleResponse(data) {
    console.log(data);
  }
  handleError(error) {
    this.error = error.error.errors;
  }
}
