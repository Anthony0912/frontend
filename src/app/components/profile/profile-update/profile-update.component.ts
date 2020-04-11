import { Component, OnInit } from '@angular/core';
import { YoutubeService } from 'src/app/services/youtube.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: "app-profile-update",
  templateUrl: "./profile-update.component.html",
  styleUrls: ["./profile-update.component.css"]
})
export class ProfileUpdateComponent implements OnInit {
  public profile = null;
  public id_profile = null;
  public form = {
    id_profile: null,
    first_name: null,
    last_name: null,
    birthday: null,
    username: null
  };

  public error = {
    first_name: null,
    last_name: null,
    birthday: null,
    username: null
  };

  constructor(private Youtube: YoutubeService, private router: Router, private Token: TokenService) {
    this.id_profile = localStorage.getItem("id_profile");
  }

  ngOnInit(): void {
    this.profileEdit();
  }

  onSubmit() {
    this.Youtube.profileUpdate(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data) {
    localStorage.removeItem('id_profile');
    this.router.navigateByUrl("/profile");
  }

  handleError(error) {
    this.error = error.error.errors;
  }
  profileEdit() {
    this.Youtube.profileEdit(this.id_profile).subscribe(res => {
      this.profile = res;
      this.form = {
        id_profile: this.id_profile,
        first_name: this.profile.first_name,
        last_name: this.profile.last_name,
        birthday: this.profile.birthday,
        username: this.profile.username
      };
    });
  }
}
