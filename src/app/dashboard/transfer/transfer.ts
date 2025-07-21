import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transfer',
  imports: [FormsModule],
  templateUrl: './transfer.html',
  styleUrl: './transfer.css'
})
export class Transfer {
   transaction = {
    fromAccount: '',
    toAccount: '',
    amount: 0,
    currency: 'PLN',
    date: new Date().toISOString(),
    title: ''
  };

  http = inject(HttpClient);

  submitTransfer() {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
      alert('Brak tokenu. Zaloguj się ponownie.');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.post('http://localhost:8080/api/user/transfer', this.transaction, { headers })
      .subscribe({
        next: () => alert('Przelew wysłany pomyślnie!'),
        error: err => {
          console.error(err);
          alert('Błąd podczas wysyłania przelewu.');
        }
      });
  }

}
