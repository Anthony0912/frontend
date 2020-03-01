import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { YoutubeService } from 'src/app/services/youtube.service';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent implements OnInit {

  public error = {
    email: null,
    password: null
  };
  public form = {
    email: null,
    password: null,
    password_confirmation: null,
    resetToken: null
  }
  constructor(
    private route: ActivatedRoute,
    private Youtube: YoutubeService,
    private router: Router
    ) {
    route.queryParams.subscribe(params => {
      this.form.resetToken = params['token']
    })
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.Youtube.changePassword(this.form).subscribe(
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
