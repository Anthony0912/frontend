import { Component, OnInit } from '@angular/core';
import { YoutubeService } from 'src/app/services/youtube.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public form = {
    first_name:null,
    last_name:null,
    country:null,
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
    cellphone:null,
    birthday:null,
    email:null,
    password:null,
    password_confirmation:null
  };

  constructor(
    private Youtube: YoutubeService,
    private Token: TokenService,
    private router: Router
    ) { }

  onSubmit(){
    this.Youtube.signup(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data) {
    this.Token.handle(data.access_token);
    this.router.navigateByUrl('/profile');
  }

  handleError(error) {
    this.error = error.error.errors;
  }
  ngOnInit(): void {
  }

}
