import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { YoutubeService } from 'src/app/services/youtube.service';
import { TokenService } from 'src/app/services/token.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account-signup',
  templateUrl: './account-signup.component.html',
  styleUrls: ['./account-signup.component.css']
})
export class AccountSignupComponent implements OnInit {

  public error = null;

  public form = {
    token: null
  }

  constructor(
    private route: ActivatedRoute,
    private Youtube: YoutubeService,
    private router: Router,
    private token: TokenService
  ) {
    this.route.queryParams.subscribe(params => {
      this.form.token = params['token'];
    })
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.Youtube.verificationAccountSignup(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    )
  }
  handleError(error) {
    this.error = error.error.errors;
  }
  handleResponse(data) {
    this.router.navigateByUrl('/login');
  }

}
