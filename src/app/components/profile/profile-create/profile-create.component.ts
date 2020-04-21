import { Component, OnInit } from '@angular/core';
import { YoutubeService } from 'src/app/services/youtube.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as $ from "jquery";

@Component({
  selector: "app-profile-create",
  templateUrl: "./profile-create.component.html",
  styleUrls: ["./profile-create.component.css"]
})
export class ProfileCreateComponent implements OnInit {
  public id_user = null;
  public form: FormGroup;

  public error = {
    username: null
  };

  constructor(private Youtube: YoutubeService, private router: Router, private Token: TokenService) {
    this.id_user = Token.payload(Token.get())["sub"];
  }

  ngOnInit(): void {
    this.validationsForm();
    this.clearValidationErrorServer();
  }

  onSubmit() {
    this.Youtube.profileCreate(this.form.value).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  validationsForm() {
    this.form = new FormGroup({
      'first_name': new FormControl(null, Validators.required),
      'last_name': new FormControl(null, Validators.required),
      'birthday': new FormControl(null, Validators.required),
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, [Validators.required, Validators.maxLength(6), Validators.pattern("^[0-9]*$")]),
      'password_confirmation': new FormControl(null, [Validators.required, Validators.maxLength(6), Validators.pattern("^[0-9]*$")]),
      'id_user': new FormControl(this.id_user),
      'status': new FormControl(true),
      'role': new FormControl("children"),
    });
  }

  handleResponse(data) {
    this.router.navigateByUrl("/profile");
  }

  handleError(error) {
    this.error = error.error.errors;
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

  get first_name() { return this.form.get('first_name'); }

  get last_name() { return this.form.get('last_name'); }

  get birthday() { return this.form.get('birthday'); }

  get username() { return this.form.get('username'); }

  get password() { return this.form.get('password'); }

  get password_confirmation() { return this.form.get('password_confirmation'); }
}
