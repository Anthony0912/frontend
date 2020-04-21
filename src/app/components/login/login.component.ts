import { Component, OnInit } from '@angular/core';
import { YoutubeService } from 'src/app/services/youtube.service';
import { Router } from '@angular/router';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as $ from "jquery";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public error = {
    emailPass: null,
    confirm: null
  };

  constructor(
    private Youtube: YoutubeService,
    private SessionStorageService: SessionStorageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.Validations();
    this.clearValidationErrorServer();
  }

  onSubmit() {
    this.Youtube.login(this.form.value).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  Validations() {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
  }

  handleResponse(data) {
    this.SessionStorageService.handle(data);
    this.router.navigateByUrl('/factor-authentication');
  }

  handleError(error) {
    this.error = error.error.error;
    $("#errorEmailPass").show();
    $("#errorConfirm").show();
  }
  clearValidationErrorServer() {
    $("#email").keydown(function () {
      $("#errorEmailPass").hide();
      $("#errorConfirm").hide();
    });
    $("#password").keydown(function () {
      $("#errorEmailPass").hide();
    });
  }

  get email() { return this.form.get('email'); }

  get password() { return this.form.get('password'); }

}
