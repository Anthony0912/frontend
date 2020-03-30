import { Component, OnInit } from '@angular/core';
import { YoutubeService } from 'src/app/services/youtube.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-profile-password-reset",
  templateUrl: "./profile-password-reset.component.html",
  styleUrls: ["./profile-password-reset.component.css"]
})
export class ProfilePasswordResetComponent implements OnInit {
  public form = {
    username: null,
    password: null,
    password_confirmation: null
  };

  public error = {
    username: null,
    password: null,
    password_confirmation: null
  };

  constructor(private Youtube: YoutubeService, private router: Router) {}

  onSubmit() {
    this.Youtube.profilePasswordReset(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data) {
    this.router.navigateByUrl("/profile");
  }

  handleError(error) {
    this.error = error.error.errors;
  }

  ngOnInit(): void {}
}
