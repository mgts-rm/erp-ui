import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-account',
  imports: [MatCardModule, MatTabsModule, MatButtonModule, CommonModule],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.scss'
})
export class MyAccountComponent {

  constructor(private authenticationService: AuthenticationService) { }

  get logginUserInfo() {
    return this.authenticationService.loggedInUserData;
  }

}
