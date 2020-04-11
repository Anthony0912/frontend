import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { YoutubeService } from "src/app/services/youtube.service";
import { TokenService } from "src/app/services/token.service";

@Component({
  selector: "app-video-create",
  templateUrl: "./video-create.component.html",
  styleUrls: ["./video-create.component.css"]
})
export class VideoCreateComponent implements OnInit {
  public role = null;
  public form = {
    name_video: null,
    url: null,
    status: null,
    id_user: null
  };

  public error = {
    name_video: null,
    url: null,
    status: null,
    id_user: null
  };

  constructor(
    private Youtube: YoutubeService,
    private router: Router,
    private Token: TokenService
  ) {
    this.form.id_user = Token.payload(Token.get())["sub"];
  }
  ngOnInit(): void {
  }

  onSubmit() {
    this.Youtube.videoCreate(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data) {
    console.log(data);
    this.router.navigateByUrl("/video");
  }

  handleError(error) {
    this.error = error.error.errors;
  }
}
