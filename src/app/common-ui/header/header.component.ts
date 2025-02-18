import {Component, inject} from '@angular/core';
import {CartIconComponent} from '../cart-icon/cart-icon.component';
import {MatIcon} from '@angular/material/icon';
import {AuthService} from '../../auth/auth.service';
import {take} from 'rxjs';
import {NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    CartIconComponent,
    NgOptimizedImage,
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  authService = inject(AuthService);
  username: string = '';

  logout() {
    this.authService.logout();
  }

  userInfo() {
    this.authService.userInfo().pipe(take(1)).subscribe({
      next: (data) => {
        if (data && data.firstName && data.lastName) {
          this.username = `${data.firstName} ${data.lastName}`;
        }
      },
      error: (err) => {
        this.username = 'Unknown User';
      }
    });
  }

  ngOnInit() {
    this.userInfo()
  }
}
