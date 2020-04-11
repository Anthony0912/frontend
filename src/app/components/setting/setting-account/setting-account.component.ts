import { Component, OnInit } from '@angular/core';
import { YoutubeService } from 'src/app/services/youtube.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting-account',
  templateUrl: './setting-account.component.html',
  styleUrls: ['./setting-account.component.css']
})
export class SettingAccountComponent implements OnInit {

  public countries = null;
  public user = null;
  public id_user = null;
  public role = null;
  public form = {
    id:null,
    first_name: null,
    last_name: null,
    country: null,
    code_country: null,
    cellphone: null,
    birthday: null,
    email: null
  }

  public error = {
    first_name: null,
    last_name: null,
    country: null,
    code_country: null,
    cellphone: null,
    birthday: null,
    email: null
  };

  constructor(private Youtube: YoutubeService, private Token: TokenService, private router: Router) {
    this.id_user = Token.payload(Token.get())["sub"];
  }

  ngOnInit(): void {
    this.getCodeCountries();
    this.settingAccountEdit();
  }

  getCodeCountries() {
    this.Youtube.getCodeCountries().subscribe(res => {
      this.countries = res;
    });
  }

  onSubmit() {
    this.Youtube.settingAccountUpdate(this.form).subscribe(
      data => this.handleResponse(),
      error => this.handleError(error)
    );
  }

  handleResponse() {
  }

  handleError(error) {
    this.error = error.error.errors;
  }
  settingAccountEdit() {
    this.Youtube.settingAccountEdit(this.id_user).subscribe(res => {
      this.user = res;
      this.form = {
        id: this.id_user,
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        country: this.user.country,
        code_country: this.user.code_country,
        cellphone: this.user.cellphone,
        birthday: this.user.birthday,
        email: this.user.email
      }
    })
  }
}
