import { Component, OnInit } from '@angular/core';
import { YoutubeService } from 'src/app/services/youtube.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import * as $ from "jquery";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  public id_user = null;
  public profiles = null;
  public status = null;
  public error = null;

  constructor(
    private Youtube: YoutubeService,
    private Token: TokenService,
    private router: Router,
  ) {
    this.id_user = Token.payload(Token.get())["sub"];
  }
  ngOnInit(): void {
    this.profileShow();
  }

  profileShow() {
    this.Youtube.profile(this.id_user).subscribe(res => {
      this.profiles = res;
    });
  }
  profileChangeStatus(event: any) {
    event.preventDefault();
    let id = event.target.id;
    this.Youtube.profileChangeStatus(id).subscribe(res => {
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
  profileEdit(event: any) {
    event.preventDefault();
    let id = event.target.id;
    localStorage.setItem("id_profile", id);
    this.router.navigateByUrl("/profile/profile-update");
  }

  profileDelete(event: any) {
    event.preventDefault();
    let id = event.target.id;
    this.Youtube.profileDelete(id).subscribe(res => {
      this.error = res;
      this.profileShow();
    });
  }
  showOptions(event: any) {
    let id = event.target.id;
    $("#options" + id).css("display", "inline-flex");
  }
  disabledOptions(event: any) {
    let id = event.target.id;
    $("#options" + id).css("display", "none");
  }
}
