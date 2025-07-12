import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, UserDTO } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header implements OnInit, OnDestroy {
  private router = inject(Router);
  private authService = inject(AuthService);

  user: UserDTO | null = null;
  private userSub?: Subscription;
  private fetchUserSub?: Subscription;

  ngOnInit() {
    this.userSub = this.authService.user$.subscribe(user => {
      this.user = user;
    });

    if (this.authService.getToken()) {

      this.fetchUserSub = this.authService.fetchCurrentUser().subscribe({
        error: () => this.authService.clearToken() 
      });
    }
  }

  ngOnDestroy() {
    this.userSub?.unsubscribe();
    this.fetchUserSub?.unsubscribe();
  }

  logout() {
    this.authService.clearToken();
    this.router.navigate(['/login']);
  }
}
