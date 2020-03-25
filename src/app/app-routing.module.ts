import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RequestResetComponent } from './components/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/password/response-reset/response-reset.component';
import { BeforeLoginService } from './services/before-login.service';
import { AfterLoginService } from './services/after-login.service';
import { AccountSignupComponent } from './components/verification/account-signup/account-signup.component';
import { AccountLoginComponent } from './components/verification/account-login/account-login.component';
import { VerificationLoadingComponent } from './components/verification/verification-loading/verification-loading.component';
import { VideoCreateComponent } from './components/video/video-create/video-create.component';
import { VideoComponent } from './components/video/video/video.component';
import { VideoUpdateComponent } from './components/video/video-update/video-update.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [BeforeLoginService]
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [BeforeLoginService]
  },
  {
    path: 'request-password-reset',
    component: RequestResetComponent,
    canActivate: [BeforeLoginService]
  },
  {
    path: 'response-password-reset',
    component: ResponseResetComponent,
    canActivate: [BeforeLoginService]
  },
  {
    path: 'verification-account-signup',
    component: AccountSignupComponent,
    canActivate: [BeforeLoginService]
  },
  {
    path: 'factor-authentication',
    component: AccountLoginComponent,
    canActivate: [BeforeLoginService]
  },
  {
    path: 'verification-loading',
    component: VerificationLoadingComponent,
    canActivate: [BeforeLoginService]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: 'video',
    component: VideoComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: 'video/video-create',
    component: VideoCreateComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: 'video/video-update',
    component: VideoUpdateComponent,
    canActivate: [AfterLoginService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
