import { Component, OnInit } from '@angular/core';
import { YoutubeService } from 'src/app/services/youtube.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as $ from "jquery";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public countries = null;
  public form: FormGroup;

  public error = {
    email:null,
    birthday:null
  };

  constructor(
    private Youtube: YoutubeService,
    private router: Router
    ) { }

  onSubmit(){
    this.Youtube.signup(this.form.value).subscribe(
      data => this.handleResponse(),
      error => this.handleError(error)
    );
  }

  Validations() {
    this.form = new FormGroup({
      'first_name': new FormControl(null, Validators.required),
      'last_name': new FormControl(null, Validators.required),
      'country': new FormControl(null, Validators.required),
      'code_country': new FormControl(null, Validators.required),
      'cellphone': new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$")]),
      'birthday': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8)]),
      'password_confirmation': new FormControl(null, [Validators.required, Validators.minLength(8)]),
      'role': new FormControl("adult"),
    });
  }
  handleResponse() {
    this.router.navigateByUrl('/verification-loading');
  }

  handleError(error) {
    this.error = error.error.errors;
    $("#errorEmail").show();
    $("#errorBirthday").show();
  }

  getCodeCountries(){
    this.Youtube.getCodeCountries().subscribe(res => {
      this.countries = res;
    });
  }
  ngOnInit(): void {
    this.getCodeCountries();
    this.Validations();
    this.clearValidationErrorServer();
  }

  clearValidationErrorServer() {
    $("#birthday").keydown(function () {
      $("#errorBirthday").hide();
    });
    $("#email").keydown(function () {
      $("#errorEmail").hide();
    });
  }

  get first_name() { return this.form.get('first_name'); }

  get last_name() { return this.form.get('last_name'); }

  get country() { return this.form.get('country'); }

  get code_country() { return this.form.get('code_country'); }

  get cellphone() { return this.form.get('cellphone'); }

  get birthday() { return this.form.get('birthday'); }

  get email() { return this.form.get('email'); }

  get password() { return this.form.get('password'); }

  get password_confirmation() { return this.form.get('password_confirmation'); }

  checkPasswords() {
    return this.password.value === this.password_confirmation.value;
  }
}
