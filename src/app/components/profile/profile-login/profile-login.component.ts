import { Component, OnInit } from '@angular/core';
import { YoutubeService } from 'src/app/services/youtube.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile-login',
  templateUrl: './profile-login.component.html',
  styleUrls: ['./profile-login.component.css']
})
export class ProfileLoginComponent implements OnInit {
  public form = {
    username:null,
    password: null
  }

  public error = null;

  constructor(
    private Youtube: YoutubeService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.Youtube.profileLogin(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }
  handleResponse(data) {
    this.Token.handle(data.access_token);
    this.Auth.changeAuthStatus(true);
    this.router.navigateByUrl('profile/home');
  }
  handleError(error){
    error = this.error.error.errors;
  }
}
