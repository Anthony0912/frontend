import { Component, OnInit } from '@angular/core';
import { YoutubeService } from 'src/app/services/youtube.service';
import * as $ from "jquery";

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent implements OnInit {

  public form = {
    email: null
  }
  public error = null;
  constructor(private Youtube: YoutubeService) { }

  ngOnInit(): void {
    $("#email").keydown(function () {
      $("#errorEmail").hide();
    });
  }
  onSubmit() {
    this.Youtube.sendPasswordResetLink(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    )
  }

  handleResponse(res) {
    this.error = res.error;
    $("#errorEmail").show();
  }
  handleError(error) {
    this.error = error.error.error;
    $("#errorEmail").show();
  }

}
