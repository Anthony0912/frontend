import { Component, OnInit } from '@angular/core';
import { YoutubeService } from 'src/app/services/youtube.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as $ from "jquery";

@Component({
  selector: 'app-profile-login',
  templateUrl: './profile-login.component.html',
  styleUrls: ['./profile-login.component.css']
})
export class ProfileLoginComponent implements OnInit {
  public form: FormGroup;

  public error = {
    user_pass: null
  };

  constructor(
    private Youtube: YoutubeService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService
  ) {
  }

  ngOnInit(): void {
    this.validationsForm();
    this.clearValidationErrorServer();
  }

  onSubmit() {
    this.Youtube.profileLogin(this.form.value).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  validationsForm() {
    this.form = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, [Validators.required, Validators.maxLength(6), Validators.pattern("^[0-9]*$")]),
    });
  }

  handleResponse(data) {
    this.Token.handle(data.access_token);
    this.Auth.changeAuthStatus(true);
    window.location.href = '/profile/home';
  }

  handleError(error) {
    this.error = error.error.error;
    $("#user_pass").show();
  }

  clearValidationErrorServer() {
    $("#username").keydown(function () {
      $("#user_pass").hide();
    });
    $("#password").keydown(function () {
      $("#user_pass").hide();
    });
  }

  get username() { return this.form.get('username'); }

  get password() { return this.form.get('password'); }

}
