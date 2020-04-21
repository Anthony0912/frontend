import { Component, OnInit } from '@angular/core';
import { YoutubeService } from 'src/app/services/youtube.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as $ from "jquery";

@Component({
  selector: 'app-setting-account',
  templateUrl: './setting-account.component.html',
  styleUrls: ['./setting-account.component.css']
})
export class SettingAccountComponent implements OnInit {

  public countries = null;
  public user = null;
  public id_user = null;
  public form: FormGroup;

  public error = {
    email: null
  };

  constructor(private Youtube: YoutubeService, private Token: TokenService, private router: Router) {
    this.id_user = Token.payload(Token.get())["sub"];
  }

  ngOnInit(): void {
    this.getCodeCountries();
    this.settingAccountEdit();
    this.clearValidationErrorServer();
  }

  getCodeCountries() {
    this.Youtube.getCodeCountries().subscribe(res => {
      this.countries = res;
    });
  }

  onSubmit() {
    this.Youtube.settingAccountUpdate(this.form.value).subscribe(
      data => this.handleResponse(),
      error => this.handleError(error)
    );
    this.settingAccountEdit();
  }

  handleResponse() {
  }

  handleError(error) {
    this.error = error.error.errors;
    $("#errorEmail").show();
  }

  clearValidationErrorServer() {
    $("#email").keydown(function () {
      $("#errorEmail").hide();
    });
  }

  settingAccountEdit() {
    this.Youtube.settingAccountEdit(this.id_user).subscribe(res => {
      this.user = res;
      this.form = new FormGroup({
        'first_name': new FormControl(this.user.first_name, Validators.required),
        'last_name': new FormControl(this.user.last_name, Validators.required),
        'country': new FormControl(this.user.country, Validators.required),
        'code_country': new FormControl(this.user.code_country, Validators.required),
        'cellphone': new FormControl(this.user.cellphone,  [Validators.required, Validators.pattern("^[0-9]*$")]),
        'birthday': new FormControl(this.user.birthday, Validators.required),
        'email': new FormControl(this.user.email, Validators.required),
        'id': new FormControl(this.id_user),
      });
    })
  }

  get first_name() { return this.form.get("first_name"); }

  get last_name() { return this.form.get('last_name'); }

  get country() { return this.form.get('country'); }

  get code_country() { return this.form.get('code_country'); }

  get cellphone() { return this.form.get('cellphone'); }

  get birthday() { return this.form.get('birthday'); }

  get email() { return this.form.get('email'); }
}
