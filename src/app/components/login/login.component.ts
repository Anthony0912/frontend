import { Component, OnInit } from '@angular/core';
import { YoutubeService } from 'src/app/services/youtube.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form = {
    email: null,
    password: null
  };

  public error = null;

  constructor(
    private Youtube: YoutubeService,
    private SessionStorageService: SessionStorageService,
    private router: Router,
    ) { }

  onSubmit(){
    this.Youtube.login(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }
  handleResponse(data) {
    this.SessionStorageService.handle(data);
    this.router.navigateByUrl('/factor-authentication');
  }

  handleError(error) {
    this.error = error.error.error;
  }

  ngOnInit(): void {
  }
}
