import { Component, OnInit } from '@angular/core';
import { YoutubeService } from 'src/app/services/youtube.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: "app-profile-create",
  templateUrl: "./profile-create.component.html",
  styleUrls: ["./profile-create.component.css"]
})
export class ProfileCreateComponent implements OnInit {

  public form = {
    id_user: null,
    first_name: null,
    last_name: null,
    birthday: null,
    status: true,
    username: null,
    password: null,
    password_confirmation: null,
    role: "children"
  };

  public error = {
    first_name: null,
    last_name: null,
    birthday: null,
    username: null,
    password: null,
    password_confirmation: null
  };

  constructor(private Youtube: YoutubeService, private router: Router, private Token: TokenService) {
    this.form.id_user = Token.payload(Token.get())["sub"];
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.Youtube.profileCreate(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data) {
    console.log(data);
    this.router.navigateByUrl("/profile");
  }

  handleError(error) {
    this.error = error.error.errors;
  }
}
