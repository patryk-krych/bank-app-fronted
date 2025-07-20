import { Component, inject, OnInit } from '@angular/core';
import { AccountDTO, AccountService } from '../../services/account.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account',
  imports: [CommonModule],
  templateUrl: './account.html',
  styleUrl: './account.css'
})
export class Account implements OnInit{
  account: AccountDTO | null = null;
  loading = true;
  error: string | null = null;

  accountService = inject(AccountService);

  ngOnInit() {
    this.accountService.fetchAccounts().subscribe({
      next: (accounts) => {
        this.account = accounts.length > 0 ? accounts[0] : null;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Błąd pobierania konta';
        console.error(err);
        this.loading = false;
      }
    });
  }

}
