import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {catchError} from 'rxjs';

import {User} from './user.model';
import {UserService} from './user.service';

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
  ) {}

  public loginUser(username: string, password: string): void {
    this.http
      .post<User>('/api/login', {
        username,
        password,
      })
      .pipe(catchError((err) => err.error.message as string))
      .subscribe((res: User | string) => {
        if (typeof res !== 'string') {
          this.router.navigate(['profile']);
          this.userService.userInfo.next(res);
          localStorage.setItem('user_info', JSON.stringify(res));
        }
      });
  }

  public signUpAUser(
    username: string,
    email: string,
    password: string,
    bio: string = '',
    loginAfter?: boolean,
  ): void {
    this.http
      .post(
        '/api/signup',
        {username, email, password, bio},
        {
          params: loginAfter
            ? new HttpParams().set('login-after', loginAfter)
            : {},
        },
      )
      .subscribe((res) => {
        console.log(res);
        this.router.navigate(['profile']);
      });
  }

  public logoutUser(): void {
    this.userService.userInfo.next(undefined);
    localStorage.removeItem('user_info');
  }
}
