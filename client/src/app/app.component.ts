import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.template.html',
  styleUrls: ['./app.styles.scss'],
})
export class AppComponent {
  title = 'client';

  constructor(private router: Router) {}

  public goToHome(): void {
    this.router.navigate(['']);
  }

  public navigateToAuth(pageName: string): void {
    this.router.navigate(['auth', pageName]);
  }
}
