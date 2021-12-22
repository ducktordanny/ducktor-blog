import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { ErrorStateMatcherService } from '@shared/error-state-matcher.service';
import { take, tap } from 'rxjs/operators';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  // todo: add error showing provided by @angular/material (hint: https://v12.material.angular.io/components/input/overview#input-error-state-matcher)
  signUpForm = new FormGroup(
    {
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(16),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30),
      ]),
      passwordAgain: new FormControl('', [Validators.required]),
      bio: new FormControl('', [Validators.maxLength(100)]),
    },
    { validators: [this.matchingPasswords()] }
  );
  matcher = new ErrorStateMatcherService();

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  public get username(): AbstractControl | null {
    return this.signUpForm.get('username');
  }

  public get email(): AbstractControl | null {
    return this.signUpForm.get('email');
  }

  public get password(): AbstractControl | null {
    return this.signUpForm.get('password');
  }

  public get passwordAgain(): AbstractControl | null {
    return this.signUpForm.get('passwordAgain');
  }

  public get bio(): AbstractControl | null {
    return this.signUpForm.get('bio');
  }

  public onSubmit(): void {
    if (this.signUpForm.value) {
      const username: string = this.signUpForm.get('username')?.value;
      const email: string = this.signUpForm.get('email')?.value;
      const password: string = this.signUpForm.get('password')?.value;
      const bio: string = this.signUpForm.get('bio')?.value;

      this.authService.signUpAUser(username, email, password, bio);
    }
    this.signUpForm.reset();
  }

  public navigateToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  private matchingPasswords(): ValidatorFn {
    return (control: AbstractControl) => {
      const password = control.get('password')?.value;
      const passwordAgain = control.get('passwordAgain')?.value;
      if (
        password === passwordAgain ||
        password === '' ||
        passwordAgain === ''
      ) {
        return null;
      }
      return {
        missmatch: true,
      };
    };
  }
}
