import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {AuthService} from '../auth.service';

@Component({
  selector: 'auth-login',
  templateUrl: './login.template.html',
  styleUrls: ['./login.styles.scss'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router, private authService: AuthService) {}

  public onSubmit(): void {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;
      this.authService.loginUser(username, password);
    }
    this.loginForm.reset();
  }

  public navigateToSignUp(): void {
    this.router.navigate(['/auth/sign-up']);
  }
}
