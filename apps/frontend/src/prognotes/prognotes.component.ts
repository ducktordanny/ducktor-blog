import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'frontend-root',
  templateUrl: './prognotes.template.html',
  styleUrls: ['./prognotes.styles.scss'],
})
export class ProgNotesComponent {
  title = 'client';

  constructor(private router: Router) {}

  public goToHome(): void {
    this.router.navigate(['']);
  }

  public navigateToAuth(pageName: string): void {
    this.router.navigate(['auth', pageName]);
  }
}
