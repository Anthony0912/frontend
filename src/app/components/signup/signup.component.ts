import { Component, OnInit } from '@angular/core';
import { YoutubeService } from 'src/app/services/youtube.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public countries = null;
  public form = {
    first_name:null,
    last_name:null,
    country:null,
    code_country:null,
    cellphone:null,
    birthday:null,
    email:null,
    password:null,
    password_confirmation: null
  }

  public error = {
    first_name:null,
    last_name:null,
    country:null,
    code_country:null,
    cellphone:null,
    birthday:null,
    email:null,
    password:null,
    password_confirmation:null
  };

  constructor(
    private Youtube: YoutubeService,
    private router: Router
    ) { }

  onSubmit(){
    this.Youtube.signup(this.form).subscribe(
      data => this.handleResponse(),
      error => this.handleError(error)
    );
  }

  handleResponse() {
    this.router.navigateByUrl('/verification-loading');
  }

  handleError(error) {
    this.error = error.error.errors;
  }

  getCodeCountries(){
    this.Youtube.getCodeCountries().subscribe(res => {
      this.countries = res;
    });
  }
  ngOnInit(): void {
    this.getCodeCountries();
  }

}
