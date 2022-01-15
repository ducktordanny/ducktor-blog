import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {Router} from '@angular/router';

import {ErrorStateMatcherService} from '@shared/error-state-matcher.service';

import {AuthService} from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.template.html',
  styleUrls: ['./sign-up.styles.scss'],
})
export class SignUpComponent implements OnInit {
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
    {validators: [this.matchingPasswords]},
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
    if (this.signUpForm.valid) {
      const username: string = this.signUpForm.get('username')?.value;
      const email: string = this.signUpForm.get('email')?.value;
      const password: string = this.signUpForm.get('password')?.value;
      const bio: string = this.signUpForm.get('bio')?.value || '';
      const loginAfter: boolean = this.signUpForm.get('loginAfter')?.value;

      this.authService.signUpAUser(username, email, password, bio, loginAfter);
    }
    this.signUpForm.reset();
  }

  public navigateToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  // todo: could be separated
  private matchingPasswords(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const passwordAgain = control.get('passwordAgain')?.value;
    if (password === passwordAgain || password === '' || passwordAgain === '') {
      return null;
    }
    return {
      missmatch: true,
    };
  }
}
