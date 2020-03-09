import { Component, OnInit } from '@angular/core';
import { YoutubeService } from 'src/app/services/youtube.service';
import { TokenService } from 'src/app/services/token.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-account-login',
  templateUrl: './account-login.component.html',
  styleUrls: ['./account-login.component.css']
})
export class AccountLoginComponent implements OnInit {

  public form = {
    id_verify: null,
    data: null
  };

public error = null;

  constructor(
    private Youtube: YoutubeService,
    private Token: TokenService,
    private SessionStorageService: SessionStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private Auth: AuthService
  ) {
    this.form.data = SessionStorageService.get();
  }

  onSubmit(){
    this.Youtube.factorAuthentication(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  resendSms(event: MouseEvent){
    event.preventDefault();
    this.Youtube.resendSms(this.form).subscribe(
      data => this.handleResponseSms(data),
      error => this.handleError(error)
    );
  }


  handleResponseSms(data) {
    console.log(data);
  }

  handleResponse(data) {
    this.Token.handle(data.access_token);
    this.Auth.changeAuthStatus(true);
    this.SessionStorageService.remove();
    this.router.navigateByUrl('/profile');
  }

  handleError(error) {
    this.error = error.error.errors ? error.error.errors.id_verify : error.error.error;
  }

  ngOnInit(): void {
  }

}
