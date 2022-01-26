import {Component, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';

import {BehaviorSubject, Subscription} from 'rxjs';

import {AuthService} from './pages/auth/auth.service';
import {UserService} from './pages/auth/user.service';

@Component({
  selector: 'frontend-root',
  templateUrl: './prognotes.template.html',
  styleUrls: ['./prognotes.styles.scss'],
})
export class ProgNotesComponent implements OnDestroy {
  public isLoggedIn = new BehaviorSubject<boolean | undefined>(undefined);
  private userSubscription: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
  ) {
    this.userSubscription = this.userService.userInfo.subscribe((user) => {
      this.isLoggedIn.next(user !== undefined);
    });
  }

  public ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  public goToHome(): void {
    this.router.navigate(['']);
  }

  public navigateToAuth(pageName: string): void {
    this.router.navigate(['auth', pageName]);
  }

  public navigateToProfile(): void {
    this.router.navigate(['profile']);
  }

  public logout(): void {
    this.authService.logoutUser();
  }
}
