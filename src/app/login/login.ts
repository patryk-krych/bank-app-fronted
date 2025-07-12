import { Component, Output, EventEmitter, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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

  onSubmit() {
    this.errorMessage = '';

    const loginData = {
      userId: this.userId,
      password: this.password
    };

    this.http.post<{ token: string }>('http://localhost:8080/api/auth/login', loginData)
      .subscribe({
        next: (response) => {
          localStorage.setItem('jwtToken', response.token);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.errorMessage = 'Nieprawidłowy login lub hasło';
          console.log(this.errorMessage);
        }
      });
  }

}

