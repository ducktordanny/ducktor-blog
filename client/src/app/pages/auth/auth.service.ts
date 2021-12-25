import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

// import { User } from './user.model';

@Injectable({providedIn: 'root'})
export class AuthService {
  public token = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {}

  public loginUser(username: string, password: string): void {
    this.http
      .post<{access_token: string}>('/api/login', {
        username,
        password,
      })
      .subscribe((res) => console.log(res));
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
      });
  }
}
