import { Component } from '@angular/core';
import { Header } from './header/header';
import { Transfer } from "./transfer/transfer";
import { Account } from "./account/account";

@Component({
  selector: 'app-dashboard',
  imports: [Header, Transfer, Account],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

}
