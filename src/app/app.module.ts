import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { RequestResetComponent } from './components/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/password/response-reset/response-reset.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { YoutubeService } from './services/youtube.service';
import { TokenService } from './services/token.service';
import { AuthService } from './services/auth.service';
import { SessionStorageService } from './services/session-storage.service';
import { AfterLoginService } from './services/after-login.service';
import { BeforeLoginService } from './services/before-login.service';
import { AccountLoginComponent } from './components/verification/account-login/account-login.component';
import { AccountSignupComponent } from './components/verification/account-signup/account-signup.component';
import { VerificationLoadingComponent } from './components/verification/verification-loading/verification-loading.component';
import { VideoComponent } from './components/video/video/video.component';
import { VideoCreateComponent } from './components/video/video-create/video-create.component';
import { VideoUpdateComponent } from './components/video/video-update/video-update.component';
import { PlaylistCreateComponent } from './components/playlist/playlist-create/playlist-create.component';
import { PlaylistUpdateComponent } from './components/playlist/playlist-update/playlist-update.component';
import { PlaylistComponent } from './components/playlist/playlist/playlist.component';
import { PlaylistVideoComponent } from './components/playlist/playlist-video/playlist-video.component';
import { ProfileComponent } from "./components/profile/profile/profile.component";
import { ProfileCreateComponent } from './components/profile/profile-create/profile-create.component';
import { ProfileUpdateComponent } from './components/profile/profile-update/profile-update.component';
import { ProfilePasswordResetComponent } from './components/profile/profile-password-reset/profile-password-reset.component';
import { SettingAccountComponent } from './components/setting/setting-account/setting-account.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    RequestResetComponent,
    ResponseResetComponent,
    AccountLoginComponent,
    AccountSignupComponent,
    VerificationLoadingComponent,
    VideoComponent,
    VideoCreateComponent,
    VideoUpdateComponent,
    PlaylistCreateComponent,
    PlaylistUpdateComponent,
    PlaylistComponent,
    PlaylistVideoComponent,
    ProfileComponent,
    ProfileCreateComponent,
    ProfileUpdateComponent,
    ProfilePasswordResetComponent,
    SettingAccountComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    YoutubeService,
    TokenService,
    AuthService,
    AfterLoginService,
    BeforeLoginService,
    SessionStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
