import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { TokenService } from "src/app/services/token.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  public loggedIn: boolean;
  public navbarOpen = false;
  public navbarCollapsed = false;
  public role: boolean;
  constructor(
    private Auth: AuthService,
    private router: Router,
    private Token: TokenService
  ) {
  }

  ngOnInit(): void {
    this.role = this.Auth.isValidOptionNavbarRole();
    this.Auth.authStatus.subscribe(value => (this.loggedIn = value));
  }

  logout(event: MouseEvent) {
    event.preventDefault();
    this.Token.remove();
    this.Auth.changeAuthStatus(false);
    window.location.href = "/login";
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  toggleProfile() {
    this.navbarCollapsed = !this.navbarCollapsed;
  }

}
