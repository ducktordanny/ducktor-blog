import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './pages/auth/login/login.component';
import {SignUpComponent} from './pages/auth/sign-up/sign-up.component';
import {ProfileComponent} from './pages/profile/profile.component';

const routes: Routes = [
  {
    path: 'auth',
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'sign-up', component: SignUpComponent},
    ],
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
