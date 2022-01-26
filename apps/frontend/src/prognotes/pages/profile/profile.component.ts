import {Component, OnDestroy} from '@angular/core';

import {BehaviorSubject, Subscription} from 'rxjs';

import {UserService} from '../auth/user.service';

@Component({
  selector: 'profile-page',
  templateUrl: './profile.template.html',
  styleUrls: ['./profile.styles.scss'],
})
export class ProfileComponent implements OnDestroy {
  public profileInforamtaion = new BehaviorSubject<any>(undefined);
  private userSubscription: Subscription;

  constructor(private userService: UserService) {
    this.userSubscription = this.userService.userInfo.subscribe((user) => {
      if (user) {
        const {username, email, createdAt} = user;
        this.profileInforamtaion.next({username, email, createdAt});
      } else {
        this.profileInforamtaion.next(undefined);
      }
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
