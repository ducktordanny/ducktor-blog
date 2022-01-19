import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {User} from './user.model';

@Injectable({providedIn: 'root'})
export class UserService {
  public userInfo = new BehaviorSubject<User | undefined>(undefined);

  constructor(private http: HttpClient) {}

  public checkUsernameExists(username: string): Observable<boolean | string> {
    return this.http.get<boolean>(`/api/check/username/${username}`).pipe(
      catchError((err) => {
        console.log(err);
        return of('Something went wrong');
      }),
    );
  }

  public checkEmailExists(email: string): Observable<boolean | string> {
    return this.http.get<boolean>(`/api/check/email/${email}`).pipe(
      catchError((err) => {
        console.log(err);
        return of('Something went wrong');
      }),
    );
  }
}
