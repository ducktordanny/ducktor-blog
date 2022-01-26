import {Component, ElementRef, ViewChild} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {Router} from '@angular/router';

import {ErrorStateMatcherService} from 'apps/frontend/src/prognotes/shared/error-state-matcher.service';

import {AuthService} from '../auth.service';
import {AuthValidatorService} from '../auth.validator';

@Component({
  selector: 'auth-sign-up',
  templateUrl: './sign-up.template.html',
  styleUrls: ['./sign-up.styles.scss'],
})
export class SignUpComponent {
  @ViewChild('loginAfter') loginAfter!: ElementRef<boolean>;
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
      loginAfter: new FormControl(true),
    },
    {validators: [this.validatorService.matchingPasswords]},
  );
  matcher = new ErrorStateMatcherService();

  constructor(
    private router: Router,
    private authService: AuthService,
    private validatorService: AuthValidatorService,
  ) {}

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
    if (this.signUpForm.valid) {
      const username: string = this.signUpForm.get('username')?.value;
      const email: string = this.signUpForm.get('email')?.value;
      const password: string = this.signUpForm.get('password')?.value;
      const bio: string = this.signUpForm.get('bio')?.value || '';
      const loginAfter: boolean = this.signUpForm.get('loginAfter')?.value;

      this.authService.signUpAUser(username, email, password, bio, loginAfter);
    }
    this.signUpForm.reset();
    this.signUpForm.markAllAsTouched();
  }

  public navigateToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}
