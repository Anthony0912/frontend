import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { YoutubeService } from 'src/app/services/youtube.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as $ from "jquery";

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent implements OnInit {
  public error = null;
  public verify = null;
  public form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private Youtube: YoutubeService,
    private router: Router
    ) {
    this.route.queryParams.subscribe(params => {
      this.verify = params['verify'];
    })
  }

  ngOnInit(): void {
    this.Validations();
    this.clearValidationErrorServer();
  }

  Validations() {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8)]),
      'password_confirmation': new FormControl(null, [Validators.required, Validators.minLength(8)]),
      'verify': new FormControl(this.verify)
    });
  }

  onSubmit(){
    this.Youtube.changePassword(this.form.value).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    )
  }
  handleError(error) {
    this.error = error.error.error;
    $("#errorEmail").show();
  }
  handleResponse(data) {
    this.router.navigateByUrl('/login');
  }

  clearValidationErrorServer() {
    $("#email").keydown(function () {
      $("#errorEmail").hide();
    });
  }

  get email() { return this.form.get('email'); }

  get password() { return this.form.get('password'); }

  get password_confirmation() { return this.form.get('password_confirmation'); }

  checkPasswords() {
    return this.password.value === this.password_confirmation.value;
  }

}
