import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {BehaviorSubject} from 'rxjs';

import {User} from './user.model';

@Injectable({providedIn: 'root'})
export class UserService {
  public userInfo = new BehaviorSubject<User | undefined>(undefined);

  constructor(private http: HttpClient) {
    const res = localStorage.getItem('user_info');
    if (res) {
      this.userInfo.next(JSON.parse(res));
    }
  }
}
