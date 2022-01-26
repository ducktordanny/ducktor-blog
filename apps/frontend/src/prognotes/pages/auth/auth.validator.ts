import {Injectable} from '@angular/core';
import {AbstractControl, ValidationErrors} from '@angular/forms';

@Injectable()
export class AuthValidatorService {
  public matchingPasswords(control: AbstractControl): ValidationErrors | null {
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
