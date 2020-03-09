import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { YoutubeService } from 'src/app/services/youtube.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-account-signup',
  templateUrl: './account-signup.component.html',
  styleUrls: ['./account-signup.component.css']
})
export class AccountSignupComponent implements OnInit {

  public error = null;

  public form = {
    verify: null
  }

  constructor(
    private route: ActivatedRoute,
    private Youtube: YoutubeService,
    private router: Router,
  ) {
    this.route.queryParams.subscribe(params => {
      this.form.verify = params['verify'];
    })
  }

  ngOnInit(): void {
     this.Youtube.vericationAccount(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    )
  }
  handleError(error) {
    this.error = error;
  }
  handleResponse(data) {
    this.router.navigateByUrl('/login');
  }

}
