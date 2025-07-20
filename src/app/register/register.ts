import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private router = inject(Router);

  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    secondName: [''],
    lastName: ['', Validators.required],
    birthday: ['', Validators.required],
    password: ['', Validators.required],
  });


  onSubmit() {
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;

      this.http.post('http://localhost:8080/api/users', userData).subscribe({
        next: () => {
          alert('Rejestracja zakończona sukcesem. Możesz się teraz zalogować.');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          alert('Coś poszło nie tak podczas rejestracji.');
          console.error(err);
        }
      });
    }
  }
}
