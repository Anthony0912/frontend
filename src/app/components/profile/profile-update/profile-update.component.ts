import { Component, OnInit } from '@angular/core';
import { YoutubeService } from 'src/app/services/youtube.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as $ from "jquery";

@Component({
  selector: "app-profile-update",
  templateUrl: "./profile-update.component.html",
  styleUrls: ["./profile-update.component.css"]
})
export class ProfileUpdateComponent implements OnInit {
  public profile = null;
  public id_profile = null;
  public form: FormGroup;
  public error = {
    username: null
  };

  constructor(private Youtube: YoutubeService, private router: Router, private Token: TokenService) {
    this.id_profile = localStorage.getItem("id_profile");
  }

  ngOnInit(): void {
    this.profileEditAndValidations();
    this.clearValidationErrorServer();
  }

  onSubmit() {
    this.Youtube.profileUpdate(this.form.value).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data) {
    localStorage.removeItem('id_profile');
    this.router.navigateByUrl("/profile");
  }

  handleError(error) {
    this.error = error.error.errors;
    $("#errorUsername").show();
  }

  profileEditAndValidations() {
    this.Youtube.profileEdit(this.id_profile).subscribe(res => {
      this.profile = res;
      this.form = new FormGroup({
        'first_name': new FormControl(this.profile.first_name, Validators.required),
        'last_name': new FormControl(this.profile.last_name, Validators.required),
        'birthday': new FormControl(this.profile.birthday, Validators.required),
        'username': new FormControl(this.profile.username, Validators.required),
        'id_profile': new FormControl(this.id_profile),
      });
    });
  }

  clearValidationErrorServer() {
    $("#username").keydown(function () {
      $("#errorUsername").hide();
    });
  }

  get first_name() { return this.form.get('first_name'); }

  get last_name() { return this.form.get('last_name'); }

  get birthday() { return this.form.get('birthday'); }

  get username() { return this.form.get('username'); }
}
