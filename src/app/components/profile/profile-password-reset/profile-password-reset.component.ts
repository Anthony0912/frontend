import { Component, OnInit } from '@angular/core';
import { YoutubeService } from 'src/app/services/youtube.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as $ from "jquery";

@Component({
  selector: "app-profile-password-reset",
  templateUrl: "./profile-password-reset.component.html",
  styleUrls: ["./profile-password-reset.component.css"]
})
export class ProfilePasswordResetComponent implements OnInit {
  public form: FormGroup;

  public error = {
    errorUsername: null
  };

  constructor(private Youtube: YoutubeService, private router: Router, private Token: TokenService) {
  }

  ngOnInit(): void {
    this.validationsForm();
    this.clearValidationErrorServer()
  }

  onSubmit() {
    this.Youtube.profilePasswordReset(this.form.value).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  validationsForm() {
    this.form = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, [Validators.required, Validators.maxLength(6), Validators.pattern("^[0-9]*$")]),
      'password_confirmation': new FormControl(null, [Validators.required, Validators.maxLength(6), Validators.pattern("^[0-9]*$")])
    });
  }

  handleResponse(data) {
    this.router.navigateByUrl("/profile");
  }

  handleError(error) {
    this.error = error.error.error;
    $("#errorUsername").show();
  }

  clearValidationErrorServer() {
    $("#username").keydown(function () {
      $("#errorUsername").hide();
    });
  }

  checkPasswords() {
    return this.password.value === this.password_confirmation.value;
  }

  get username() { return this.form.get('username'); }

  get password() { return this.form.get('password'); }

  get password_confirmation() { return this.form.get('password_confirmation'); }
}
