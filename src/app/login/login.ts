import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  userId = '';
  password = '';
  errorMessage = '';


  private http = inject(HttpClient);
  private router = inject(Router);
  private authService = inject(AuthService)

  onSubmit() {
    this.errorMessage = '';

    const loginData = {
      userId: this.userId,
      password: this.password
    };

    this.http.post<{ token: string }>('http://localhost:8080/api/auth/login', loginData)
    .subscribe({
      next: (response) => {
        this.authService.setToken(response.token);
        this.authService.fetchCurrentUser().subscribe({
          next: () => this.router.navigate(['/home']),
          error: () => {
            this.errorMessage = 'Błąd podczas pobierania danych użytkownika';
          }
        });
      },
      error: () => {
        this.errorMessage = 'Nieprawidłowy login lub hasło';
      }
    });
  }

  goToRegister() {
  this.router.navigate(['/register']);
}

}

