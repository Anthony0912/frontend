import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./components/signup/signup.component";
import { RequestResetComponent } from "./components/password/request-reset/request-reset.component";
import { ResponseResetComponent } from "./components/password/response-reset/response-reset.component";
import { BeforeLoginService } from "./services/before-login.service";
import { AfterLoginService } from "./services/after-login.service";
import { AccountSignupComponent } from "./components/verification/account-signup/account-signup.component";
import { AccountLoginComponent } from "./components/verification/account-login/account-login.component";
import { VerificationLoadingComponent } from "./components/verification/verification-loading/verification-loading.component";
import { VideoCreateComponent } from "./components/video/video-create/video-create.component";
import { VideoComponent } from "./components/video/video/video.component";
import { VideoUpdateComponent } from "./components/video/video-update/video-update.component";
import { PlaylistComponent } from "./components/playlist/playlist/playlist.component";
import { PlaylistCreateComponent } from "./components/playlist/playlist-create/playlist-create.component";
import { PlaylistUpdateComponent } from "./components/playlist/playlist-update/playlist-update.component";
import { PlaylistVideoComponent } from "./components/playlist/playlist-video/playlist-video.component";
import { ProfileComponent } from "./components/profile/profile/profile.component";
import { ProfileCreateComponent } from './components/profile/profile-create/profile-create.component';
import { ProfileUpdateComponent } from './components/profile/profile-update/profile-update.component';
import { ProfilePasswordResetComponent } from './components/profile/profile-password-reset/profile-password-reset.component';
import { SettingAccountComponent } from './components/setting/setting-account/setting-account.component';
import { ProfileLoginComponent } from './components/profile/profile-login/profile-login.component';
import { ProfileHomeComponent } from './components/profile/profile-home/profile-home.component';
import { RoleService } from './services/role.service';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
    canActivate: [BeforeLoginService]
  },
  {
    path: "signup",
    component: SignupComponent,
    canActivate: [BeforeLoginService]
  },
  {
    path: "request-password-reset",
    component: RequestResetComponent,
    canActivate: [BeforeLoginService]
  },
  {
    path: "response-password-reset",
    component: ResponseResetComponent,
    canActivate: [BeforeLoginService]
  },
  {
    path: "verification-account-signup",
    component: AccountSignupComponent,
    canActivate: [BeforeLoginService]
  },
  {
    path: "factor-authentication",
    component: AccountLoginComponent,
    canActivate: [BeforeLoginService]
  },
  {
    path: "verification-loading",
    component: VerificationLoadingComponent,
    canActivate: [BeforeLoginService]
  },
  {
    path: "video",
    component: VideoComponent,
    canActivate: [AfterLoginService],
    data: {
      allowedRoles: ['adult']
    }
  },
  {
    path: "video/video-create",
    component: VideoCreateComponent,
    canActivate: [AfterLoginService],
    data: {
      allowedRoles: ['adult']
    }
  },
  {
    path: "video/video-update",
    component: VideoUpdateComponent,
    canActivate: [AfterLoginService],
    data: {
      allowedRoles: ['adult']
    }
  },
  {
    path: "playlist",
    component: PlaylistComponent,
    canActivate: [AfterLoginService],
    data: {
      allowedRoles: ['adult']
    }
  },
  {
    path: "playlist/playlist-create",
    component: PlaylistCreateComponent,
    canActivate: [AfterLoginService],
    data: {
      allowedRoles: ['adult']
    }
  },
  {
    path: "playlist/playlist-update",
    component: PlaylistUpdateComponent,
    canActivate: [AfterLoginService],
    data: {
      allowedRoles: ['adult']
    }
  },
  {
    path: "playlist/playlist-video",
    component: PlaylistVideoComponent,
    canActivate: [AfterLoginService],
    data: {
      allowedRoles: ['adult']
    }
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AfterLoginService],
    data: {
      allowedRoles: ['adult']
    }
  },
  {
    path: "profile/profile-create",
    component: ProfileCreateComponent,
    canActivate: [AfterLoginService],
    data: {
      allowedRoles: ['adult']
    }
  },
  {
    path: "profile/profile-update",
    component: ProfileUpdateComponent,
    canActivate: [AfterLoginService],
    data: {
      allowedRoles: ['adult']
    }
  },
  {
    path: "profile/profile-password-reset",
    component: ProfilePasswordResetComponent,
    canActivate: [AfterLoginService],
    data: {
      allowedRoles: ['adult']
    }
  },
  {
    path: "setting/setting-account",
    component: SettingAccountComponent,
    canActivate: [AfterLoginService],
    data: {
      allowedRoles: ['adult']
    }
  },
  {
    path: "profile/login",
    component: ProfileLoginComponent,
    canActivate: [BeforeLoginService],
  },
  {
    path: "profile/home",
    component: ProfileHomeComponent,
    canActivate: [AfterLoginService],
    data: {
      allowedRoles: ['children']
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
